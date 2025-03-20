import { AppLayout } from './components/layout/AppLayout';
import { useMe } from './hooks/useMe';
import { useStore } from './hooks/useStore';
import AuthedApp from './pages/AuthedApp';
import GuestApp from './pages/GuestApp';

function App() {
  const authStore = useStore((state) => state.auth);

  return (
    <AppLayout>{authStore.token ? <AuthedApp /> : <GuestApp />}</AppLayout>
  );
}

export default App;
