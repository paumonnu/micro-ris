import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import RadiologyList from './radiology/RadiologyList';
import AuthedTopBar from '../components/navigation/TopBar';
import { Dashboard } from './dashboard/Dashboard';
import { useStore } from '../hooks/useStore';
import { useQueryClient } from '@tanstack/react-query';
import { useMe } from '../hooks/useMe';
import { Users } from './users/Users';

function AuthedApp() {
  const queryClient = useQueryClient();
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
          userName={me ? me.info.firstName + ' ' + me.info.lastName : ''}
          userEmail={me ? me.email : ''}
          userAvatar=""
          onSignOut={handleSignOut}
        />
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="radiology" element={<RadiologyList />} />
          <Route path="users/*" element={<Users />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </>
  );
}

export default AuthedApp;
