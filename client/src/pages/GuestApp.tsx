import { Navigate, Route, Routes } from 'react-router';
import LoginPage from './auth/Login';

function GuestApp() {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default GuestApp;
