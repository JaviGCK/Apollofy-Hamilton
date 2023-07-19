import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '../layout/Layout'
import { HomePage } from '../pages/homePage/HomePage'
import { SearchPage } from '../pages/searchPage/SearchPage'
import { LibraryPage } from '../pages/libraryPage/LibraryPage'
import { LoginPage } from '../pages/loginPage/LoginPage'
import { UserPage } from '../pages/userPage/UserPage'
import { AuthenticationGuard } from '../components/login/AuthenticationGuard'
import { Auth0ProviderWithNavigate } from '../context/Auth0ProviderWithNavigate'
import { AddMusic } from '../components/addMusic/AddMusic'



export const RouterPaths = () => {


  return (
    <>
      <BrowserRouter>
        <Auth0ProviderWithNavigate>
          <Routes>

            <Route path='/'>
              <Route index element={<LoginPage />} />
            </Route>
            <Route path='' element={AuthenticationGuard(Layout)}>
              <Route path='home' element={<HomePage />} />
              <Route path='search' element={<SearchPage />} />
              <Route path='library' element={<LibraryPage />} />
              <Route path='user' element={<UserPage />} />
              <Route path='form' element={<AddMusic />} />
            </Route>


          </Routes>
        </Auth0ProviderWithNavigate>
      </BrowserRouter>
    </>
  )
}
