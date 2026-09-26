import styled from 'styled-components';
import background from '../../assets/backgrounds/background.svg';

export const AuthPage = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md};
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const AuthCardWrapper = styled.div`
  width: 100%;
  max-width: 380px;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  box-sizing: content-box;
  border-radius: ${({ theme }) => theme.radii.xl};
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.28);

  backdrop-filter:
    blur(24px)
    saturate(180%)
    brightness(110%);

  -webkit-backdrop-filter:
    blur(24px)
    saturate(180%)
    brightness(110%);

  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.4),
    inset 0 -1px 1px rgba(255, 255, 255, 0.08),
    0 20px 50px rgba(0, 0, 0, 0.15);

  &::before {
    content: "";

    position: absolute;
    inset: 0;

    background:
      linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.22),
        transparent 35%,
        transparent 65%,
        rgba(255, 255, 255, 0.06)
      );

    pointer-events: none;   
  }

`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.white};
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Divider = styled.div`
  margin: ${({ theme }) => theme.spacing.lg} 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  text-transform: uppercase;
`;

export const SwitchModeText = styled.p`
  margin-top: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.white};
`;
