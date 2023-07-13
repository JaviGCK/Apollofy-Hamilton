import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App.tsx'
import './index.css'
import { LibraryPage } from './pages/LibraryPage.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(

  <Auth0Provider
    clientId='lQALcandyrMV3CFLmYB7qfS6ffBvkvR3'
    domain='dev-7g7shvra8f741e5q.us.auth0.com'
    authorizationParams={{
      redirect_uri: window.location.origin
    }}>
    <LibraryPage />
  </Auth0Provider>

)
