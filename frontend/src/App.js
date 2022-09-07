import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Error404 from './pages/Error404'
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import RequireAuth from './components/RequireAuth';
import SecretPage from './pages/SecretPage';
import { ThemeProvider } from '@mui/material'
import appTheme from './theme/theme';
import Layout from './pages/layout';
import { useStoreRehydrated } from 'easy-peasy'


function App() {
  const storeRehydrated = useStoreRehydrated()
  if (!storeRehydrated) {
    return (
      '...Loading...'
    )
  } else {


    return (
      <>
        <ThemeProvider theme={appTheme}>          
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route path='login' element={<LoginPage />} />
              <Route path='register' element={<RegisterPage />} />
              <Route path='/' element={<RequireAuth />}>
                <Route index element={<Home />} />
                <Route path='secrets' element={< SecretPage />} />
              </Route>
              <Route path='*' element={<Error404 />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </>
    );
  }
}

export default App;
