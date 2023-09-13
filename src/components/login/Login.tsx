
import { useTranslation } from 'react-i18next';
import './login.css'
import { useAuth0 } from "@auth0/auth0-react";

export const LoginButton = () => {

  const { loginWithRedirect } = useAuth0();

  const { t } = useTranslation()

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/home",
      },
    });
  };

  return (
    <>
      <button className='login-btn' onClick={handleLogin}>{t('login')}</button>
    </>
  )

};
