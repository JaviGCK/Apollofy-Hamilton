import { TrendList } from "../../components/trendList/TrendList.tsx"
import { IoSettingsSharp } from 'react-icons/io5'
import Logo from '../../assets/img/apollofy-logo.webp'
import './homePage.css'

export const HomePage = () => {

    return (

        <section className="home-page-container">
            <div className="home-heading-container">
                <img src={Logo} alt='App Logo' />
                <IoSettingsSharp className='home-setting-icon' />
            </div>
            <TrendList />

        </section>

    )
}