import './profileChart.css'
const ProfileChart = () => {
    return (
        <div className='profile-chart-container'>
            <div className='pcc-top'>
                <div className='profile-img-container'><img className='pcc-profile-image' src="https://i1.sndcdn.com/avatars-GujBa8wkGP1FmylY-OLjg5Q-t500x500.jpg" alt="Profile-picture" /></div>
                <div className='profile-data-container'>
                    <p>DEPRESED_CAT</p>
                    <p><span>50</span><span className='pcc-width'> Followers </span><span>0</span><span className='pcc-width'> Following</span></p>
                </div>
            </div>
            <div className='pcc-bottom'>
                <button>Edit</button>
            </div>
        </div>
    )
}
export default ProfileChart
