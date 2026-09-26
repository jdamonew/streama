import type { ReactNode } from 'react';
import * as Styles from './Modal.styles';

export interface ModalProps {
  children: ReactNode;
}

export function Modal({ children }: ModalProps) {
  return (
    <Styles.StyledModalOverlay>
      <Styles.StyledModalContent>{children}</Styles.StyledModalContent>
    </Styles.StyledModalOverlay>
  );
}
