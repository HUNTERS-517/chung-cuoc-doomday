import type { ResultWithFormula } from '../../domain/resultWithFormula';
import { useFormat, useTranslation } from '../../context/LocaleContext';
import { InfoTip } from '../InfoTip';

/** Info tip showing the localized formula behind a calculated result. */
export function FormulaTip({ result }: { result: ResultWithFormula }) {
  const t = useTranslation();
  const format = useFormat();
  return (
    <InfoTip label={result.formatFormula({ formatNumber: format, label: t })} />
  );
}
