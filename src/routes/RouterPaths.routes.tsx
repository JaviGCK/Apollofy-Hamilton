import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '../layout/Layout'
import { HomePage } from '../pages/homePage/HomePage'
import { SearchPage } from '../pages/searchPage/SearchPage'
import { LibraryPage } from '../pages/libraryPage/LibraryPage'
import { LoginPage } from '../pages/loginPage/LoginPage'
import { ProtectedRoutes } from './ProtectedRoutes.routes'


export const RouterPaths = () => {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/*' element={
            // <ProtectedRoutes>
            <Route path='/*' element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path='search' element={<SearchPage />} />
              <Route path='library' element={<LibraryPage />} />

            </Route>
            // </ProtectedRoutes>
          } />

        </Routes>
      </BrowserRouter>
    </>
  )
}
