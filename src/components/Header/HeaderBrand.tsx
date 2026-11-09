import { useI18n } from '../../context/LocaleContext';
import { appIcon } from '../../shared/appIcon';
import styles from './HeaderBrand.module.css';

const brandIcon = `${import.meta.env.BASE_URL}${appIcon(import.meta.env.DEV)}`;

export function HeaderBrand() {
  const { t } = useI18n();
  return (
    <div className={styles.brand}>
      <img className={styles.brandMark} src={brandIcon} alt="" />

      <div>
        <h1 className={styles.title}>{t('appTitle')}</h1>
        {/* Easter egg: Dev's in-game ID, shown as a tiny watermark via CSS attr() */}
        <p data-dev-ingame-id="51921435" className={styles.devSignature}>
          From <strong>HUNTERS [S517]</strong> with ❤️
        </p>
      </div>
    </div>
  );
}
