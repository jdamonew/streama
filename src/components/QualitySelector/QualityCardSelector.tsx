import * as Styles from './QualitySelector.styles';
import { Circle, CircleCheck, Signal, SignalHigh, SignalMedium } from 'lucide-react';
import { Tag } from '@/design-system/components/Tag';
import { OPTIONS } from './QualitySelector.mock';
import { QualitySelectorProps } from './QualitySelector.types';

export function QualityCardSelector({ value, onChange, disabled = false }: QualitySelectorProps) {

  const getSignalIcon = (fps: number) => {
    switch (fps) {
      case 60:
        return <Signal />
      case 30:
        return <SignalHigh />
      default:
        return <SignalMedium />
    }
  }
  return (
    <Styles.QualitySelectorWrapper>
      <Styles.QualityOptionsRowCard>
        {OPTIONS.map((opt) => (
          <Styles.QualityOptionButton
            key={opt.value}
            type="button"
            disabled={disabled}
            onClick={() => onChange(opt.value)}
            title={opt.hint}
            $active={value === opt.value}
          >
            <Styles.QualityInfo>

              <Styles.QualityInfoIcon>
                {
                  value === opt.value ?
                    <CircleCheck /> : <Circle />
                }
              </Styles.QualityInfoIcon>

              <Styles.QualityInfos>
                <h4>{opt.label}</h4>
                <p>{opt.feature}</p>
                <small>{opt.hint}</small>
              </Styles.QualityInfos>

            </Styles.QualityInfo>

            <Styles.QualityDetails>

              <Styles.QualityTags>
                <Tag active={value === opt.value}> {opt.fps} FPS</Tag>
                {opt.quality &&
                  <Tag active={value === opt.value}>{opt.quality}</Tag>
                }
                {getSignalIcon(opt.fps!)}
              </Styles.QualityTags>

              <Styles.QualityText>
                {opt.quality_text}
              </Styles.QualityText>

            </Styles.QualityDetails>


          </Styles.QualityOptionButton>
        ))}
      </Styles.QualityOptionsRowCard>
    </Styles.QualitySelectorWrapper>
  );
}
