import { useRef } from 'react';
import { useCalculator } from '../../context/CalculatorContext';
import {
  useFormat,
  useI18n,
  useTranslation,
} from '../../context/LocaleContext';
import { HP_PER_BOTTLE } from '../../domain/calculations/bottleResources';
import { cx } from '../../shared/cx';
import buffsImg from '../../assets/caution-buffs.png';
import hpImg from '../../assets/caution-hp.png';
import recoveryImg from '../../assets/caution-recovery.png';
import styles from './Guide.module.css';

/** Buff icon positions in caution-buffs.png (175×76), as % of the image. */
const BUFF_IMAGE = { w: 175, h: 76 };
/**
 * Display scale for the caution screenshots. The source files are small
 * (175-269px wide), so keep the upscale mild to avoid visible blur.
 */
const BUFF_SCALE = 1.8;
const SHOT_SCALE = 1.25;
const HP_IMAGE_WIDTH = 269;
const RECOVERY_IMAGE_WIDTH = 219;
/** Official-round recovery buff: +20% HP recovery for 2 hours. */
const RECOVERY_BUFF_RATE = 0.2;
const BUFF_MINUTES = 120;
const BUFF_ICONS: Array<[x: number, y: number, w: number, h: number]> = [
  [85, 47, 25, 28], // max HP buff
  [117, 47, 27, 28], // recovery buff
];

/**
 * Red "Caution" button next to the guide button: explains that the official
 * round HP / recovery buffs (2 h only) skew the calculation while active.
 */
export function CautionButton() {
  const t = useTranslation();
  const format = useFormat();
  const { locale } = useI18n();
  const { config } = useCalculator();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const recoveryRate = config.recoveryRate;
  const buffHp = recoveryRate * RECOVERY_BUFF_RATE * BUFF_MINUTES;
  const buffBottles = Math.floor(buffHp / HP_PER_BOTTLE);
  // `format` drops decimals, so render the 0.2 rate with the locale's separator.
  const rateText = RECOVERY_BUFF_RATE.toLocaleString(locale);
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        className={cx(styles.guideButton, styles.cautionButton)}
        onClick={() => dialogRef.current?.showModal()}
      >
        ⚠ {t('caution')}
      </button>
      <dialog
        ref={dialogRef}
        className={cx(styles.dialog, styles.dialogCaution)}
        aria-label={t('cautionTitle')}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className={styles.dialogHeader}>
          <h3 className={styles.cautionTitle}>
            ⚠ {t('caution')} · {t('cautionTitle')}
          </h3>
          <button
            type="button"
            className={styles.closeButton}
            onClick={close}
            aria-label={t('close')}
          >
            ×
          </button>
        </div>
        <p className={styles.dialogIntro}>{t('cautionIntro')}</p>

        <div className={styles.cautionSteps}>
          <figure className={cx(styles.card, styles.cautionOk)}>
            <figcaption className={styles.cardCaption}>
              <span className={cx(styles.badge, styles.badgeOk)}>✓</span>
              {t('cautionInactive')}
            </figcaption>
            <span
              className={styles.cautionShot}
              style={{ width: BUFF_IMAGE.w * BUFF_SCALE }}
            >
              <img src={buffsImg} alt="" />
              {BUFF_ICONS.map(([x, y, w, h]) => (
                <span
                  key={x}
                  className={styles.cautionMark}
                  style={{
                    left: `${(x / BUFF_IMAGE.w) * 100}%`,
                    top: `${(y / BUFF_IMAGE.h) * 100}%`,
                    width: `${(w / BUFF_IMAGE.w) * 100}%`,
                    height: `${(h / BUFF_IMAGE.h) * 100}%`,
                  }}
                />
              ))}
            </span>
            <p className={styles.cautionNote}>{t('cautionInactiveNote')}</p>
          </figure>

          <figure className={cx(styles.card, styles.cautionBad)}>
            <figcaption className={styles.cardCaption}>
              <span className={cx(styles.badge, styles.badgeBad)}>!</span>
              {t('cautionActive')}
            </figcaption>
            <div className={styles.cautionPair}>
              <img
                src={hpImg}
                alt=""
                className={styles.cautionShot}
                style={{ width: HP_IMAGE_WIDTH * SHOT_SCALE }}
              />
              <div className={styles.cautionShotWithFormula}>
                <img
                  src={recoveryImg}
                  alt=""
                  className={styles.cautionShot}
                  style={{ width: RECOVERY_IMAGE_WIDTH * SHOT_SCALE }}
                />
                <p className={styles.cautionFormula}>
                  {t('cautionRecoveryFormula')}
                  {'\n'}
                  {format(recoveryRate)} × {rateText} × {BUFF_MINUTES} ={' '}
                  <strong>{format(buffHp)} HP</strong> ~{' '}
                  <strong>
                    {format(buffBottles)} {t('cautionBottles')}
                  </strong>
                </p>
              </div>
            </div>
            <p className={styles.cautionNote}>{t('cautionActiveNote')}</p>
          </figure>
        </div>

        <p className={styles.cautionTip}>{t('cautionTip')}</p>
      </dialog>
    </>
  );
}
