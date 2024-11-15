import Header from '../../components/Header';
import AuthRoute from '../../components/AuthRoute';
import PresentationDetail from '../auth/presentation/detail';
import Dashboard from '../../pages/dashboard';
import { Routes, Route } from 'react-router-dom'
import '../../assets/css/style.css'

const Layout = () => {
  return (
    <>
      <Header />
      <div className='container'>
        <Routes>
          <Route path="/dashboard" element={ <Dashboard />}></Route>
          <Route path="/presentation/:id" element={
            <AuthRoute>
              <PresentationDetail />
            </AuthRoute>
          }>
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default Layout;
