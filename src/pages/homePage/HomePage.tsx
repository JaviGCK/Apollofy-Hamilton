import { TrendList } from "../../components/trendList/TrendList"
import { IoSettingsSharp } from 'react-icons/io5'
import Logo from '../../assets/img/apollofy-logo.webp'
import './homePage.css'

export const HomePage = () => {

    return (

        <div>
            <div className="home-heading-container">
                <img src={Logo} alt='App Logo' />
                <IoSettingsSharp className='home-setting-icon' />
            </div>
            <TrendList />

        </div>

    )
}