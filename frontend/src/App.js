import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Error404 from './pages/Error404'
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import RequireAuth from './components/RequireAuth';
import SecretPage from './pages/SecretPage';
import ErrorDisplay from './components/ErrorDisplay';
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
        <BrowserRouter>
          <ThemeProvider theme={appTheme}>
            <ErrorDisplay />

            <Routes>
              <Route element={<Layout />}>
                <Route path='/' element={<RequireAuth />}>
                  <Route path='/' element={<Home />} />
                  <Route path='/secrets' element={< SecretPage />} />
                </Route>
                <Route path='login' element={<LoginPage />} />
                <Route path='register' element={<RegisterPage />} />
                <Route path='*' element={<Error404 />} />
              </Route>
            </Routes>

          </ThemeProvider>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
