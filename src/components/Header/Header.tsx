import type { CalculatorConfig } from '../../domain/types';
import { HeaderBrand } from './HeaderBrand';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ProfileManager, type SaveStatus } from './ProfileManager';
import styles from './Header.module.css';

interface HeaderProps {
  profiles: Pick<CalculatorConfig, 'id' | 'name'>[];
  activeId: string;
  saveStatus: SaveStatus;
  onSave: () => void;
  onRename: (id: string, name: string) => void;
  onSelect: (id: string) => void;
  onAdd: () => void;
  onDelete: (id: string) => void;
}

export function Header(props: HeaderProps) {
  return (
    <header className={styles.topbar}>
      <HeaderBrand />
      <div className={styles.topbarControls}>
        <ProfileManager {...props} />
        <LanguageSwitcher />
      </div>
    </header>
  );
}
