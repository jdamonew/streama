import * as Styles from './QualitySelector.styles';
import { Circle, CircleCheck } from 'lucide-react';
import { OPTIONS } from './QualitySelector.mock';
import { QualitySelectorProps } from './QualitySelector.types';

export function QualityTagSelector({ value, onChange, disabled = false }: QualitySelectorProps) {

  return (
    <Styles.QualitySelectorWrapper>
      <Styles.QualityOptionsRow>
        {OPTIONS.map((opt) => (
          <Styles.QualityOptionButton
            key={opt.value}
            type="button"
            disabled={disabled}
            onClick={() => onChange(opt.value)}
            title={opt.hint}
            $active={value === opt.value}
          >
            <Styles.QualityInfo style={{ gap: 8 }}>

              <Styles.QualityInfoIcon>
                {
                  value === opt.value ?
                    <CircleCheck /> : <Circle />
                }
              </Styles.QualityInfoIcon>

              <Styles.QualityInfos>
                <p>{opt.label}</p>
              </Styles.QualityInfos>

            </Styles.QualityInfo>

          </Styles.QualityOptionButton>
        ))}
      </Styles.QualityOptionsRow>
    </Styles.QualitySelectorWrapper>
  );
}
