import { useState, type FormEvent } from 'react';
import { FirebaseError } from 'firebase/app';
import { useAuth } from '@/context/AuthContext';
import { Button, Heading, Input, Text } from '@design-system';
import * as Styles from './Login.styles';
import { PasswordInput } from '@/design-system/components/Input';
import { Loading } from '@/design-system/components/Loading';
import LogoWhiteImage from '../../assets/logo-white-400.avif';

type AuthMode = 'login' | 'register';

const ERROR_MESSAGES: Record<string, string> = {
  'auth/invalid-email': 'E-mail inválido.',
  'auth/user-not-found': 'Usuário não encontrado.',
  'auth/wrong-password': 'Senha incorreta.',
  'auth/email-already-in-use': 'Este e-mail já está em uso.',
  'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres.',
  'auth/popup-closed-by-user': 'Login com Google cancelado.',
  'auth/invalid-credential': 'Credenciais inválidas.',
};

function describeError(err: unknown): string {
  if (err instanceof FirebaseError) {
    return ERROR_MESSAGES[err.code] || err.message;
  }
  if (err instanceof Error) {
    return err.message;
  }
  return 'Ocorreu um erro inesperado.';
}

export function Login() {
  const { login, register, loginWithGoogle } = useAuth();

  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setError(null);

    if (mode === 'register' && password !== confirmPassword) {
      setError('Suas senhas estão diferentes');
      return;
    }

    setLoading(true);

    try {
      switch (mode) {
        case 'login':
          await login(email, password);
          break;

        case 'register':
          await register(email, password, name);
          break;

        default:
          throw new Error(`Modo inválido: ${mode}`);
      }
    } catch (err) {
      setError(describeError(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin(): Promise<void> {
    setError(null);
    setLoading(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      setError(describeError(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Styles.AuthPage>
      <Styles.AuthCardWrapper>
        <Heading level={1}>
          <img
            src={LogoWhiteImage}
            alt='Logo Branca da Streama'
            fetchPriority='high'
            width={380}
          />
        </Heading>
        <Styles.Subtitle>{mode === 'login' ? 'Entre na sua conta' : 'Crie sua conta'}</Styles.Subtitle>
        {loading ?
          <Styles.LoadingContainer>
            <Loading size='lg' />
          </Styles.LoadingContainer>
          :
          <>
            <Styles.AuthForm onSubmit={handleSubmit}>
              {mode === 'register' && (
                <Input
                  type="text"
                  placeholder="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              )}
              <Input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <PasswordInput
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}

              />
              {mode === 'register' && (
                <Input
                  type="password"
                  placeholder="Confirme sua Senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                />
              )}
              {error && (
                <Text tone="danger" small>
                  {error}
                </Text>
              )}
              <Button type="submit" variant="primary" fullWidth disabled={loading} >
                {mode === 'login' ? 'Entrar' : 'Cadastrar'}
              </Button>
            </Styles.AuthForm>

            <Styles.Divider>ou</Styles.Divider>

            <Button variant="outline" fullWidth onClick={handleGoogleLogin} disabled={loading}>
              <GoogleIcon />
              Entrar com Google
            </Button>

            <Styles.SwitchModeText>
              {mode === 'login' ? (
                <>
                  Não tem conta?
                  <Button variant="link" onClick={() => setMode('register')}>
                    Cadastre-se
                  </Button>
                </>
              ) : (
                <>
                  Já tem conta?
                  <Button variant="link" onClick={() => setMode('login')} >
                    Entrar
                  </Button>
                </>
              )}
            </Styles.SwitchModeText>
          </>
        }

      </Styles.AuthCardWrapper>
    </Styles.AuthPage>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.6 32.9 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 15.3 18.9 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.4 0 10.3-2.1 14-5.5l-6.5-5.4C29.4 34.7 26.8 36 24 36c-5.2 0-9.6-3.1-11.3-7.5l-6.5 5C9.6 39.6 16.3 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.4-2.4 4.4-4.5 5.8l6.5 5.4C39.7 37 44 31 44 24c0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  );
}
