import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Login } from '@/pages/Login';
import { Dashboard } from '@/pages/Dashboard';
import { BuyMeACoffeeFloat } from './components/BuyMeACoffeeFloat';
import { posthog } from 'posthog-js';
import { PostHogProvider } from '@posthog/react';

posthog.init(import.meta.env.VITE_POSTHOG_PROJECT_TOKEN, {
  api_host: 'https://us.i.posthog.com',
  defaults: '2026-05-30',
})

function AppContent() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Login />;
  }

  return <Dashboard currentUser={currentUser} />;
}

export default function App() {
  return (
    <PostHogProvider client={posthog}>
      <AuthProvider>
        <AppContent />
        <BuyMeACoffeeFloat />
      </AuthProvider>
    </PostHogProvider>
  );
}
