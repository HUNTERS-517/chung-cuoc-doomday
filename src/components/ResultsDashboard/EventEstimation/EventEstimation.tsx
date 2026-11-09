import { useTranslation } from '../../../context/LocaleContext';
import { cx } from '../../../shared/cx';
import { ScenarioComparison } from '../ScenarioComparison';
import { CalculationDetails } from './CalculationDetails';
import { ProjectionCards } from './ProjectionCards';
import { TimingGrid } from './TimingGrid';
import shared from '../../shared.module.css';
import styles from './EventEstimation.module.css';

export function EventEstimation() {
  const t = useTranslation();
  return (
    <section className={cx(shared.card, styles.summaryCard)}>
      <div className={cx(shared.sectionHeading, shared.sectionHeadingLight)}>
        <h2>{t('projectedTitle')}</h2>
        <span className={shared.sectionIndex}>02</span>
      </div>
      <CalculationDetails />
      <ProjectionCards />
      <ScenarioComparison />
      <TimingGrid />
    </section>
  );
}
