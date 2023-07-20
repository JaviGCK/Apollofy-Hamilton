import { TrendList } from "../../components/trendList/TrendList.tsx"
import { IoSettingsSharp } from 'react-icons/io5'
import Logo from '../../assets/img/apollofy-logo.webp'
import './homePage.css'
import { useAuth0 } from "@auth0/auth0-react"

export const HomePage = () => {


    const {
        isLoading,
        isAuthenticated,
        error
    } = useAuth0();

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Oops... {error.message}</div>;
    }

    if (isAuthenticated) {
        console.log(isAuthenticated)
    }

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