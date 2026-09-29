import type { ReactNode } from 'react';
import * as Styles from './Modal.styles';

export interface ModalProps {
  children: ReactNode;
  width?: number;
}

export function Modal({ children, width, ...rest }: ModalProps) {
  return (
    <Styles.StyledModalOverlay>
      <Styles.StyledModalContent $width={width} {...rest}>
        {children}
      </Styles.StyledModalContent>
    </Styles.StyledModalOverlay>
  );
}
