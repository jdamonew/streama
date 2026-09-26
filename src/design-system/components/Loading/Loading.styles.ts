import styled, { css, keyframes } from "styled-components";
import { LoadingSize } from "./Loading";

const animation = keyframes`
    to{
        transform: rotate(.5turn)
    }
`

const sizes = {
  sm: css`
    background-size: 5px 5px;
    width: 25px;
  `,
  md: css`
    background-size: 8px 8px;
    width: 30px;
  `,
  lg: css`
    background-size: 12px 12px;
    width: 50px;
  `
} satisfies Record<LoadingSize, ReturnType<typeof css>>;

export const StylesLoading = styled.div<{ $color?: string, $size: LoadingSize }>`
  aspect-ratio: 1;
  --_c: radial-gradient(farthest-side, ${({ theme, $color }) => $color ? $color : theme.colors.white} 92%,#0000);
  background: 
  var(--_c) top,
  var(--_c) left,
  var(--_c) right,
  var(--_c) bottom;
  background-repeat: no-repeat;
  animation: ${animation} 1s infinite;
  /* background-size: 5px 5px;
  width: 25px; */

  ${({ $size }) => sizes[$size]}
`