import { Route, Routes } from 'react-router';
import UsersListPage from './UsersList';
import { UserEdit } from './UserEdit';

export function Users() {
  return (
    <Routes>
      <Route path="/" element={<UsersListPage />} />
      <Route path=":id" element={<UserEdit />} />
    </Routes>
  );
}
