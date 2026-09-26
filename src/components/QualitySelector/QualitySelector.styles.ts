import styled from 'styled-components';

export const QualitySelectorWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const QualitySelectorLabel = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const QualityOptionsRow = styled.div`
  display: flex;
  width: 100%;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;
export const QualityOptionsRowCard = styled(QualityOptionsRow)`
  flex-direction: column;
`;


export const QualityOptionButton = styled.button<{ $active: boolean }>`
  cursor: pointer;
  font-family: inherit;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid
    ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.border)};
  background: ${({ theme, $active }) => ($active ? theme.colors.primaryOpacityLow : theme.colors.surface)};
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.textPrimary)};
  transition: background-color 0.15s ease, border-color 0.15s ease;
 
  display:flex;
  align-items:center;
  justify-content:space-between;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const QualityInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
`

export const QualityInfoIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

`

export const QualityInfos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h4,p{
    margin: 0;

  }
  p{
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  }
`

export const QualityDetails = styled.div`
display: flex;
flex-direction: column;
align-items: end;
justify-content: center;
`

export const QualityTags = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.primary};
`

export const QualityText = styled.small`
  color: ${({ theme }) => theme.colors.primary};
  margin-top: ${({ theme }) => theme.spacing.sm};
`
