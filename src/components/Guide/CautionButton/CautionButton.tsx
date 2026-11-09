import { useCalculator } from '../../../context/CalculatorContext';
import {
  useFormat,
  useI18n,
  useTranslation,
} from '../../../context/LocaleContext';
import { HP_PER_BOTTLE } from '../../../domain/calculations/bottleResources';
import { cx } from '../../../shared/cx';
import buffsImg from '../../../assets/caution-buffs.png';
import hpImg from '../../../assets/caution-hp.png';
import recoveryImg from '../../../assets/caution-recovery.png';
import { GuideDialog } from '../shared/GuideDialog';
import common from '../shared/guideCommon.module.css';
import styles from './CautionButton.module.css';

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
  const recoveryRate = config.recoveryRate;
  const buffHp = recoveryRate * RECOVERY_BUFF_RATE * BUFF_MINUTES;
  const buffBottles = Math.floor(buffHp / HP_PER_BOTTLE);
  // `format` drops decimals, so render the 0.2 rate with the locale's separator.
  const rateText = RECOVERY_BUFF_RATE.toLocaleString(locale);

  return (
    <GuideDialog
      label={<>⚠ {t('caution')}</>}
      title={t('cautionTitle')}
      heading={
        <>
          ⚠ {t('caution')} · {t('cautionTitle')}
        </>
      }
      headingClassName={styles.title}
      intro={t('cautionIntro')}
      size="caution"
      tone="caution"
    >
      <div className={styles.steps}>
        <figure className={cx(common.card, styles.ok)}>
          <figcaption className={common.cardCaption}>
            <span className={cx(common.badge, styles.badgeOk)}>✓</span>
            {t('cautionInactive')}
          </figcaption>
          <span
            className={styles.shot}
            style={{ width: BUFF_IMAGE.w * BUFF_SCALE }}
          >
            <img src={buffsImg} alt="" />
            {BUFF_ICONS.map(([x, y, w, h]) => (
              <span
                key={x}
                className={styles.mark}
                style={{
                  left: `${(x / BUFF_IMAGE.w) * 100}%`,
                  top: `${(y / BUFF_IMAGE.h) * 100}%`,
                  width: `${(w / BUFF_IMAGE.w) * 100}%`,
                  height: `${(h / BUFF_IMAGE.h) * 100}%`,
                }}
              />
            ))}
          </span>
          <p className={styles.note}>{t('cautionInactiveNote')}</p>
        </figure>

        <figure className={cx(common.card, styles.bad)}>
          <figcaption className={common.cardCaption}>
            <span className={cx(common.badge, styles.badgeBad)}>!</span>
            {t('cautionActive')}
          </figcaption>
          <div className={styles.pair}>
            <img
              src={hpImg}
              alt=""
              className={styles.shot}
              style={{ width: HP_IMAGE_WIDTH * SHOT_SCALE }}
            />
            <div className={styles.shotWithFormula}>
              <img
                src={recoveryImg}
                alt=""
                className={styles.shot}
                style={{ width: RECOVERY_IMAGE_WIDTH * SHOT_SCALE }}
              />
              <p className={styles.formula}>
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
          <p className={styles.note}>{t('cautionActiveNote')}</p>
        </figure>
      </div>

      <p className={styles.tip}>{t('cautionTip')}</p>
    </GuideDialog>
  );
}
