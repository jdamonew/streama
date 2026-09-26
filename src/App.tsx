import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Login } from '@/pages/Login';
import { Dashboard } from '@/pages/Dashboard';


function AppContent() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Login />;
  }

  return <Dashboard currentUser={currentUser} />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
