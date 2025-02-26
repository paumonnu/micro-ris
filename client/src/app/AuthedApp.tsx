import { useState } from 'react';
import './AuthedApp.scss';
import AuthedNavigation from '../layout/SidebarNavigation';
import AuthedTopBar from './AuthedTopBar';
import { Route, Routes } from 'react-router';
import UsersListPage from '../users/UsersListPage';
import RadiologyListPage from '../radiology/RadiologyListPage';

function AuthedApp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex-1">
        <AuthedNavigation
          open={sidebarOpen}
          onClickBackground={() => {
            setSidebarOpen(false);
          }}
          onMenuItemClick={() => {
            setSidebarOpen(false);
          }}
        />
        <div className="flex-1">
          <AuthedTopBar
            onMenuIconClick={() => {
              setSidebarOpen(true);
            }}
          />
          <main>
            <Routes>
              {/* <Route path="/" element={} /> */}
              <Route path="radiology" element={<RadiologyListPage />} />
              <Route path="users" element={<UsersListPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
}

export default AuthedApp;
