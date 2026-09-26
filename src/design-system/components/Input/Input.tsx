import { useState, type InputHTMLAttributes } from 'react';
import * as Styles from './Input.styles';
import { Eye, EyeClosed } from 'lucide-react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export function Input({ hasError = false, ...rest }: InputProps) {
  return <Styles.StyledInput $hasError={hasError} {...rest} />;
}

export function PasswordInput({ hasError = false, ...rest }: InputProps) {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <Styles.ContainerInput $hasError={hasError}>
      <Styles.StyledInputPassword  {...rest} {...showPassword && { type: 'text' }} />
      <Styles.ShowPasswordButton
        title='Mostrar Senha'
        type='button'
        onClick={() => setShowPassword(!showPassword)}
      >
        {
          showPassword ?
            <Eye size={18} />
            :
            <EyeClosed size={18} />
        }
      </Styles.ShowPasswordButton>
    </Styles.ContainerInput>
  )
}
