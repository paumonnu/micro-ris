import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import UsersListPage from './users/UsersList';
import RadiologyList from './radiology/RadiologyList';
import AuthedTopBar from '../components/navigation/TopBar';
import { Dashboard } from './dashboard/Dashboard';
import { useStore } from '../hooks/useStore';
import { useQueryClient } from '@tanstack/react-query';
import { useMe } from '../hooks/useMe';

function AuthedApp() {
  const queryClient = useQueryClient();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { signOut } = useStore((state) => state.auth);

  const me = useMe();

  const handleSignOut = () => {
    signOut();
    queryClient.removeQueries({
      queryKey: ['me'],
    });
  };

  return (
    <>
      <div className="flex flex-col h-full w-full">
        <AuthedTopBar
          userName={me?.info?.firstName + ' ' + me?.info?.lastName}
          userEmail={me?.email}
          userAvatar=""
          onSignOut={handleSignOut}
        />
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="radiology" element={<RadiologyList />} />
          <Route path="users" element={<UsersListPage />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </>
  );
}

export default AuthedApp;
