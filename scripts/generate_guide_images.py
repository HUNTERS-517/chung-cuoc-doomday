"""Generate `<name>_noted.png` guide images from src/assets/base/<name>.png (`<name>_noted_<A|B>.png` when an
image holds fields from both sections) from src/assets/guide-regions.json.

Each region gets a red outline plus a red code label ("A4"); no localized text so it works for every language.
Also records each image size in guide-regions.json (`imageSizes`) for UI cropping.
Usage: python scripts/generate_guide_images.py   (requires Pillow)
"""

import json
from collections import defaultdict
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "src" / "assets"
# Untouched screenshots; annotated copies are written next to ASSETS.
BASE = ASSETS / "base"
RED = (230, 30, 40, 255)
WHITE = (255, 255, 255, 255)
BORDER = 4
FONT_CANDIDATES = [
    "C:/Windows/Fonts/arialbd.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
]


def load_font(size: int) -> ImageFont.FreeTypeFont:
    for path in FONT_CANDIDATES:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    raise SystemExit("No TrueType font with Vietnamese glyphs found")


def label_origin(box, size, pos, anchor, img_size):
    x, y, w, h = box
    lw, lh = size
    iw, ih = img_size
    gap = BORDER + 3
    if pos == "inside":
        lx, ly = x + w - lw - 4, y + 4
    elif pos == "left":
        lx, ly = x - lw - gap - 2, y + (h - lh) // 2
    elif pos == "right":
        lx, ly = x + w + gap + 2, y
    elif pos == "below":
        lx, ly = x, y + h + gap
    else:  # above
        lx, ly = x, y - lh - gap
    if anchor == "end" and pos in ("above", "below"):
        lx = x + w - lw
    return max(0, min(lx, iw - lw)), max(0, min(ly, ih - lh))


def annotate(src: Path, fields, font) -> Image.Image:
    """Return a copy of `src` with an outline + code label for each field."""
    img = Image.open(src).convert("RGBA")
    draw = ImageDraw.Draw(img)
    for f in fields:
        x, y, w, h = f["box"]
        # PIL strokes inward, so grow the rect by the stroke width to keep
        # the circled numbers fully visible.
        o = BORDER + 1
        draw.rounded_rectangle(
            (x - o, y - o, x + w + o, y + h + o),
            radius=6, outline=RED, width=BORDER,
        )
    # Labels drawn after all outlines so they stay on top.
    for f in fields:
        text = f"{f['code']} {f['codeNote']}" if "codeNote" in f else f["code"]
        l, t, r, b = draw.textbbox((0, 0), text, font=font)
        pad_x, pad_y = 8, 4
        size = (r - l + pad_x * 2, b - t + pad_y * 2)
        lx, ly = label_origin(
            f["box"], size, f.get("labelPos", "above"),
            f.get("labelAnchor", "start"), img.size,
        )
        draw.rounded_rectangle(
            (lx, ly, lx + size[0], ly + size[1]), radius=6, fill=RED
        )
        draw.text((lx + pad_x - l, ly + pad_y - t), text, font=font, fill=WHITE)
    return img


def save(img: Image.Image, out: Path) -> None:
    img.convert("RGB").save(out, optimize=True)
    print(f"wrote {out.relative_to(ROOT)}")


def main() -> None:
    config = json.loads((ASSETS / "guide-regions.json").read_text("utf-8"))
    # One annotated copy per (image, section) so section A's guide never shows
    # section B's boxes. Section = first letter of the code (A1 -> A).
    by_image = defaultdict(list)
    sections = defaultdict(set)
    for field in config["fields"].values():
        section = field["code"][0]
        by_image[(field["image"], section)].append(field)
        sections[field["image"]].add(section)

    for stale in ASSETS.glob("*_noted*.png"):
        stale.unlink()

    font = load_font(22)
    sizes = {}
    for (image_name, section), fields in by_image.items():
        src = BASE / image_name
        sizes[image_name] = list(Image.open(src).size)

        # Section image: used by the section's guide dialog.
        suffix = f"_{section}" if len(sections[image_name]) > 1 else ""
        out = ASSETS / f"{src.stem}_noted{suffix}.png"
        save(annotate(src, fields, font), out)
        for f in fields:
            f["notedImage"] = out.name
            f["focusImage"] = out.name

        # Focus images: when several fields share an image, each field's focus
        # hint gets a copy showing only its own box.
        if len(fields) > 1:
            for f in fields:
                focus_out = ASSETS / f"{src.stem}_noted_{f['code']}.png"
                save(annotate(src, [f], font), focus_out)
                f["focusImage"] = focus_out.name

    # The UI needs natural sizes to crop regions without waiting for image load.
    config["imageSizes"] = sizes
    (ASSETS / "guide-regions.json").write_text(
        json.dumps(config, ensure_ascii=False, indent=2) + "\n", "utf-8"
    )


if __name__ == "__main__":
    main()
