import type { ButtonHTMLAttributes, ReactNode } from 'react';
import * as Styles from './Button.styles';
import { Loading } from '../Loading';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: ReactNode;
  loading?: boolean;
  loadingColor?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  type = 'button',
  children,
  loading,
  loadingColor,
  ...rest
}: ButtonProps) {
  return (
    <Styles.StyledButton type={type} $variant={variant} $size={size} $fullWidth={fullWidth} {...rest}>
      {
        loading ?
          <Loading color={loadingColor} />
          :
          children
      }
    </Styles.StyledButton>
  );
}
