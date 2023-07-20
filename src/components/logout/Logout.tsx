import { useAuth0 } from "@auth0/auth0-react";
import './logout.css'
export const LogoutButton = () => {
    const { logout } = useAuth0();

    const handleLogout = () => {
        logout({
          logoutParams: {
            returnTo: window.location.origin,
          },
        });
      };

    return (
        <button className = 'logout-btn' onClick={handleLogout}>
            Log Out
        </button>
    );
};