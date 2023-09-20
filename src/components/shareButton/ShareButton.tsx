import './shareButton.css'
import { BsFillShareFill } from "react-icons/bs"
import { useState } from 'react'
import { EmailShareButton, EmailIcon, FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon } from "react-share";
import { BiRightArrow } from "react-icons/bi";
import { useUserContext } from '../../utils/hooks/useUserContext';
import { updateUserStats } from '../../api/statsFetchApi';
import { UserType } from '../profileChart/ProfileChart';

type ShareProps = {
    selectedUser?: UserType | null
}

const ShareButton = (props: ShareProps) => {
    const { selectedUser } = props
    console.log(selectedUser)
    const [shareModalOpen, setShareModalOpen] = useState<boolean>(false)
    const { currentUser } = useUserContext();
    const sharedUrl = window.location.href

    const handleShare = () => {
        if (selectedUser && sharedUrl.includes('search-user')) {
            updateUserStats(selectedUser.id, 'shared')
        }
        else if (currentUser) {
            updateUserStats(currentUser.id, 'shared')
        }
    }
    return (
        <>
            <div className='share-button-container'>
                <button onClick={() => setShareModalOpen(!shareModalOpen)}><BsFillShareFill className={`share-icon ${shareModalOpen ? 'open' : 'closed'}`} /></button>
                {shareModalOpen &&
                    <div className={`share-modal ${shareModalOpen ? 'open' : 'closed'}`}>
                        <div>
                            <EmailShareButton onClick={handleShare} url={sharedUrl} >
                                <EmailIcon size={40} round />
                            </EmailShareButton>
                        </div>
                        <div>
                            <WhatsappShareButton onClick={handleShare} url={sharedUrl} >
                                <WhatsappIcon size={40} round />
                            </WhatsappShareButton>
                        </div>
                        <div>
                            <FacebookShareButton onClick={handleShare} url={sharedUrl} >
                                <FacebookIcon size={40} round />
                            </FacebookShareButton>
                        </div>
                        <div>
                            <TwitterShareButton onClick={handleShare} url={sharedUrl} >
                                <TwitterIcon size={40} round />
                            </TwitterShareButton>
                        </div>
                        <div style={{ fontSize: '24px' }}>
                            <BiRightArrow />
                        </div>

                    </div>}
            </div>

        </>
    )
}
export default ShareButton
