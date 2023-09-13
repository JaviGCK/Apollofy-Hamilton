import { FC } from 'react'
import { ProfileChartPropTypes } from '../../types/propTypes/profileChartProps'
import './profileChart.css'
import { useTranslation } from 'react-i18next'
const ProfileChart: FC<ProfileChartPropTypes> = ({ imageUrl, userName }) => {
    const { t } = useTranslation();
    return (
        <div className='profile-chart-container'>
            <div className='pcc-top'>
                <div className='profile-img-container'><img className='pcc-profile-image' src={imageUrl} alt="Profile-picture" /></div>
                <div className='profile-data-container'>
                    <p>{userName}</p>
                    <p className='profile-data-followers'><span>50</span><span className='pcc-width'> {t('followersProfile')} </span><span> 0 </span><span className='pcc-width'> {t('followingProfile')} </span></p>
                </div>
            </div>
        </div>
    )
}
export default ProfileChart
