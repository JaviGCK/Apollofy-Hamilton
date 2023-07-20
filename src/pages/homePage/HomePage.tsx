import { TrendList } from "../../components/trendList/TrendList.tsx"
import { IoSettingsSharp } from 'react-icons/io5'
import Logo from '../../assets/img/apollofy-logo.webp'
import './homePage.css'
import { useAuth0 } from "@auth0/auth0-react"
import { SettingsBar } from "../../components/settingsbar/SettingsBar.tsx"
import { useEffect, useRef, useState } from "react"

export const HomePage = () => {

    const [settingsExpanded, setSettingsExpanded] =useState(false)
    const settingMenu = useRef<HTMLDivElement | null>(null)

    const {
        isLoading,
        error,
    } = useAuth0();


    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Oops... {error.message}</div>;
    }

    const handleToggleSettingsMenu = () =>{
        setSettingsExpanded(!settingsExpanded)
        
    }

    useEffect(()=>{

        settingMenu.current?.classList.toggle('setting-menu-container-expanded')
        
    },[settingsExpanded])

    return (
        
        <section className="home-page-container">
            <div className="home-heading-container">
                <img src={Logo} alt='App Logo' />
                <span onClick={handleToggleSettingsMenu}>
                    <IoSettingsSharp className='home-setting-icon'/>
                </span>             
                    
            </div>
            {settingsExpanded ? <div ref = {settingMenu} className="settings-menu-container">
                <SettingsBar/>  
            </div> : <></>}
            <TrendList />
        </section>
    )
}