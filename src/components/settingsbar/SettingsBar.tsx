import { LogoutButton } from "../logout/Logout"
import { IoIosConstruct } from "react-icons/io";
import { MdLanguage } from "react-icons/md";
import { FaAngleLeft } from "react-icons/fa";
import './settingsBar.css'
import { useTranslation } from "react-i18next";
import { useState } from "react";
import i18n from "../../utils/functions/i18n";

export const SettingsBar = () => {

    const [languageClicked, setLanguageClicked] = useState<boolean>(false);

    const { t } = useTranslation();

    const handleLanguage = () => {
        setLanguageClicked(!languageClicked);
    }
    const handleLanguageClicked = (lang_code: string) => {
        i18n.changeLanguage(lang_code)
    }

    return (
        <>
            {!languageClicked ?
                <nav className="settings-menu-bar">
                    <span className="setting-menu-options-construction">{t('language')}<MdLanguage className='language-icon' onClick={handleLanguage} /></span>
                    <span className="setting-menu-options-construction">{t('notifications')}<IoIosConstruct className='construction-icon' /></span>
                    <LogoutButton />
                </nav>
                :
                <div className="language-selector-container settings-menu-bar">
                    <FaAngleLeft className="back-icon-language" onClick={handleLanguage} />
                    <div className="language-selector english-language-selector" onClick={() => handleLanguageClicked('en')}>
                        <img className="language-flag-icon" src="https://res.cloudinary.com/dmeh7kzjm/image/upload/v1694603946/frontend-internal-use/qdp1zr8awxzhehqzt68s.png" />
                    </div>
                    <div className="language-selector spanish-language-selector" onClick={() => handleLanguageClicked('es')}>
                        <img className="language-flag-icon" src="https://res.cloudinary.com/dmeh7kzjm/image/upload/v1694603938/frontend-internal-use/z2pnsuk3lqhz5w9dly8t.png" />
                    </div>
                </div>
            }
        </>
    )
}