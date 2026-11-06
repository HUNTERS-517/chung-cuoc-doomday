// App icon (favicon + header brand mark), split by environment so a dev tab
// is easy to tell apart from the deployed build. Both files live in public/.
// - icon-dev.png:   green HP bottle
// - icon-build.png: red bottle cropped from the A5 guide screenshot
export function appIcon(isDev: boolean): string {
  return isDev ? 'icon-dev.png' : 'icon-build.png';
}
