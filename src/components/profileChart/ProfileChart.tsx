import { FC } from 'react'
import { ProfileChartPropTypes } from '../../types/propTypes/profileChartProps'
import './profileChart.css'
const ProfileChart: FC<ProfileChartPropTypes> = ({ imageUrl, userName }) => {
    return (
        <div className='profile-chart-container'>
            <div className='pcc-top'>
                <div className='profile-img-container'><img className='pcc-profile-image' src={imageUrl} alt="Profile-picture" /></div>
                <div className='profile-data-container'>
                    <p>{userName}</p>
                    <p className='profile-data-followers'><span>50</span><span className='pcc-width'> Followers </span><span>0</span><span className='pcc-width'> Following</span></p>
                </div>
            </div>
            <div className='pcc-bottom'>
                {/* <button>Edit</button> */}
            </div>
        </div>
    )
}
export default ProfileChart
