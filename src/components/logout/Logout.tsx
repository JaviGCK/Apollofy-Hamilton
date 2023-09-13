import { useAuth0 } from "@auth0/auth0-react";
import './logout.css'
import { useTranslation } from "react-i18next";
export const LogoutButton = () => {
  const { logout } = useAuth0();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <button className='logout-btn' onClick={handleLogout}>{t('logOut')}</button>
  );
};
