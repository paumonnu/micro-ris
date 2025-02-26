import { Route, Routes } from 'react-router';
import LoginPage from '../auth/LoginPage';

function GuestApp() {
  return (
    <>
      <main className="flex-1 flex bg-zinc-100">
        <Routes>
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </main>
    </>
  );
}

export default GuestApp;
