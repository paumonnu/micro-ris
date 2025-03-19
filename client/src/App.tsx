import { Layout } from './components/layout/Layout';
import { useMe } from './hooks/useMe';
import { useStore } from './hooks/useStore';
import AuthedApp from './pages/AuthedApp';
import GuestApp from './pages/GuestApp';

function App() {
  const me = useMe();
  const authStore = useStore((state) => state.auth);

  return <Layout>{!!authStore.token ? <AuthedApp /> : <GuestApp />}</Layout>;
}

export default App;
