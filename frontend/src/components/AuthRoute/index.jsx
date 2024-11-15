import { Navigate } from 'react-router';
import authStore from '../../store/auth';

// this route is used to check whether the current user logged-in
export default function AuthRoute ({ children }) {
  const token = authStore.getState().getToken();
  if (!token) {
    return <Navigate to='/login' replace></Navigate>
  }
  return children
}
