import Login from './pages/login';
import Register from './pages/register';
import Layout from './pages/layout';
import Alert from './components/Alert';
import PresentationPreview from './pages/auth/presentation/preview';
import { Routes, Route } from 'react-router-dom';

function App () {
  return (
    <>
      <Alert />
      <Routes>
        <Route path="*" element={<Layout />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/presentation/:presentationId/slide/:slideId" element={<PresentationPreview />}></Route>
      </Routes>
    </>
  );
}

export default App;
