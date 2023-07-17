import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App.tsx'
import './index.css'
import { LibraryPage } from './pages/LibraryPage.tsx'
import { ListDetailPage } from './pages/ListDetailPage.tsx'
// import { Profile } from './components/profile/Profile.tsx'
// import { LoginButton } from './components/login/Login.tsx'
// import { LogoutButton } from './components/logout/Logout.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(

  <Auth0Provider
    clientId='jqLND7zE31OrTY8Ppo3hi10vV3TdF0IO'
    domain='dev-7g7shvra8f741e5q.us.auth0.com'
    authorizationParams={{
      redirect_uri: window.location.origin
    }}>
    {/* <App /> */}
    <ListDetailPage />
    {/* <Profile />
    <LoginButton />
    <LogoutButton /> */}
  </Auth0Provider>

)
