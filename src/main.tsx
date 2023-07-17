import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(

  <Auth0Provider
    clientId='ZkEGJH0Gs2jT7K1ydUJEP15lcSx7qtci'
    domain={'dev-7g7shvra8f741e5q.us.auth0.com'}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}>
    <App />
      
  </Auth0Provider>

)
