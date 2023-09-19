import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import { fetchData, postTrack } from "../../api/fetchApi"
import { useAuth0 } from "@auth0/auth0-react"
import { GenreTypes } from "../../types/enums"
import "./addMusicForm.css"
import placeholder from '../../assets/img/bg-image.webp'
import toast, { Toaster } from "react-hot-toast"
import { useUserContext } from "../../utils/hooks/useUserContext"
import { useTranslation } from "react-i18next"
import { GenreType } from "../../types/genre"
import { Select, Space } from 'antd';
import { useGenreContext } from "../../utils/hooks/useGenresContext"




export const AddMusicForm = () => {

    const [privacityState, setPrivacityState] = useState<boolean>(false)
    const { getAccessTokenSilently } = useAuth0()
    const { currentUser, setCurrentLoggedUser } = useUserContext();
    const { showGenre, setGenres } = useGenreContext();
    const { t } = useTranslation();
    const { Option } = Select;


    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
        defaultValues: {
            image: "",
            audio: "",
            title: "",
            genre: ""
        }
    })
    const [imagePreview, setImagePreview] = useState(placeholder)

    const submitForm = async () => {

        const trackTitle = watch("title");
        const trackPrivacy = privacityState;
        const trackGenre = watch("genre") as GenreTypes;
        toast.success('Track is uploading...');

        const trackAudioFileList = watch("audio");
        const trackAudioFile = trackAudioFileList[0];

        const trackImgFileList = watch("image");
        const trackImgFile = trackImgFileList[0];

        const formTrackData = new FormData();
        formTrackData.append("upload_preset", "apollofy-track-addition")
        formTrackData.append("audio", trackAudioFile);
        formTrackData.append("image", trackImgFile);
        formTrackData.append("name", trackTitle);
        formTrackData.append("genres", trackGenre);
        formTrackData.append("privacity", trackPrivacy.toString());

        if (currentUser?.id === undefined) return;
        const newTrack = await postTrack(getAccessTokenSilently, formTrackData, currentUser?.id);

        toast.success('Track uploaded successfully...')

        if (currentUser.trackList === undefined) return;
        const newTracksList = [...currentUser.trackList, newTrack];
        const userLoggedNewObject = {
            ...currentUser,
            tracks: newTracksList
        }
        setCurrentLoggedUser(userLoggedNewObject);

        reset();

    }


    const handlePrivacity = () => {
        setPrivacityState(!privacityState)
    }
    const handlePreview = () => {
        const trackImgFileList = watch("image");
        const trackImgFile = trackImgFileList[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(trackImgFile as any);
    }

    const handleChange = (value: string[]) => {
        //console.log(`selected ${value}`);
    };


    return (


        <form className="add-music-form" onSubmit={handleSubmit(submitForm)}>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />

            <div className="track-container">
                <div className="track-img-container">
                    <label htmlFor="track-img-input" className="track-img-label">{t('selectTrackImage')}</label>
                    <input
                        id="track-img-input"
                        className="track-img-input add-music-input hidden-input"
                        type="file"
                        accept="image/jpeg, image/jpg, image/webp"
                        placeholder="Select track image..."
                        {...register("image", {
                            required: {
                                value: true,
                                message: "Image is required"
                            }
                        })}
                        onChange={(e) => {
                            register("image").onChange(e);
                            handlePreview();
                        }}
                    />

                    {errors.image && <p className="music-form-error">{errors.image.message}</p>}
                </div>
                <div className="track-img-container-preview">
                    <img className='img-preview' src={imagePreview} alt="Preview img" />
                </div>
            </div>


            <div className="track-audio-container">
                <label htmlFor="track-audio-input" className="track-audio-label">{t('selectTrack')}</label>
                <input id="track-audio-input" className="track-audio-input add-music-input hidden-input" type="file" accept="audio/mp3, audio/wav, audio/ogg" placeholder="Select your audio..."
                    {...register("audio", {
                        required: {
                            value: true,
                            message: "Audio is required"
                        }
                    })}
                />
                {errors.audio && <p className="music-form-error">{errors.audio.message}</p>}
            </div>


            <input className="track-title-input add-music-input" type="text" placeholder={t('songName')}
                {...register("title", {
                    required: {
                        value: true,
                        message: "Track title is required"
                    },
                    minLength: {
                        value: 4,
                        message: "Use 4 or more characters"
                    },
                    maxLength: {
                        value: 20,
                        message: "Use less than 20 characters"
                    }
                })}
            />
            {errors.title && <p className="music-form-error error-title">{errors.title.message}</p>}

            <div className="multiselect">

                <Select
                    className="track-genre-select add-music-input"
                    mode="multiple"
                    placeholder={t('songGenre')}
                    defaultValue={[]}
                    {...register("genre", {
                        required: {
                            value: true,
                            message: "Genre selection is required"
                        }
                    })}
                    onChange={handleChange}
                    optionLabelProp="label"
                >
                    {showGenre?.map((genres: GenreType) => (
                        <Option
                            key={genres.id}
                            value={genres.name}>
                            <Space >
                                {genres.name}
                            </Space>
                        </Option>
                    ))}

                </Select>

            </div>
            {errors.genre && <p className="music-form-error select-error">{errors.genre.message}</p>}

            <div className="privacity-selection-container">
                <p>{t('trackPrivacyText')}</p>
                <span className="privacity-btn-container">
                    <p>{privacityState ? t('trackPrivacityPrivate') : t('trackPrivacityPublic')}</p>
                    <label className="switch">
                        <input type="checkbox" id="track-privacity-check" onChange={handlePrivacity} />
                        <span className="slider"></span>
                    </label>
                </span>
            </div>




            <button className="add-music-submit-btn" type="submit">{t('upload')}</button>
        </form >

    )
}
