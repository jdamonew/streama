import styled from 'styled-components';
import type { StackAlign, StackDirection, StackJustify } from './Stack';
import type { SpacingKey } from '../../theme/spacing';

export const StyledStack = styled.div<{
  $direction: StackDirection;
  $gap: SpacingKey;
  $align: StackAlign;
  $justify: StackJustify;
  $wrap: boolean;
}>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  align-items: ${({ $align }) => $align};
  justify-content: ${({ $justify }) => $justify};
  gap: ${({ theme, $gap }) => theme.spacing[$gap]};
  flex-wrap: ${({ $wrap }) => ($wrap ? 'wrap' : 'nowrap')};
`;
