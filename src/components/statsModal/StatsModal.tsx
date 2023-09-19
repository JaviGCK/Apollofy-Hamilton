import './statsModal.css'
import { IoCloseSharp, IoEyeOutline, IoBody } from "react-icons/io5"
import { BsPersonHeart } from "react-icons/bs";
import { FaSlideshare } from "react-icons/fa";
import { useUserContext } from '../../utils/hooks/useUserContext';
import { useState } from 'react';
import { fetchStats } from '../../api/statsFetchApi';
import { ClipLoader } from 'react-spinners';

type StatsModalProps = {
    setstatsModalOpen: (state: boolean) => void
}
type StatCardProps = {
    title: string,
    value: number,
    icon: any
}
type StatsType = {
    id: number,
    userId: string,
    likes: number,
    views: number,
    followers: number,
    shared: number
}

const StatsModal = (props: StatsModalProps) => {
    const { setstatsModalOpen } = props;
    const { currentUser } = useUserContext();
    const [userStats, setStats] = useState<StatsType | null>(null)

    if (userStats === null) {
        const fetchData = async () => {
            if (currentUser) {
                const data = await fetchStats(currentUser.id)
                setStats(data)
            }
        }
        fetchData()
    }


    return (
        <section className='stats-modal-container'>
            <div className='stats-modal'>
                <div className='sm-top-bar'>
                    <button value='Close' onClick={() => setstatsModalOpen(false)}>
                        <IoCloseSharp />
                    </button>
                </div>
                <div className='sm-body'>
                    {userStats ? <>
                        <StatCard title={'Views'} value={userStats.views} icon={<IoEyeOutline />} />
                        <StatCard title={'Followers'} value={userStats.followers} icon={<IoBody />} />
                        <StatCard title={'Likes'} value={userStats.likes} icon={<BsPersonHeart />} />
                        <StatCard title={'Shared'} value={userStats.shared} icon={<FaSlideshare />} />
                    </> : <ClipLoader />}
                </div>
            </div>
        </section>
    )
};

const StatCard = (props: StatCardProps) => {
    const { title, value, icon } = props;

    return (
        <div className='stat-card'>
            <div>{icon}</div>
            <p className='data-p-t'>{title}</p>
            <p className='data-p'>{value}</p>
        </div>
    )
}

export default StatsModal
