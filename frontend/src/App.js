import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Error404 from './pages/Error404'
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import RequireAuth from './components/RequireAuth';
import SecretPage from './pages/SecretPage';
import ErrorDisplay from './components/ErrorDisplay';


function App() {


  return (
    <>

      <BrowserRouter>
        <ErrorDisplay/>
        <Routes>
          <Route path='/' element={<RequireAuth/>}>
            <Route path='/' element={<Home />} />
            <Route path='/secrets' element={< SecretPage />}/>
          </Route>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='*' element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
