import { useForm } from "react-hook-form"
import { useState } from "react"
import { postTrack } from "../../api/fetchApi"
import { useAuth0 } from "@auth0/auth0-react"
import "./addMusicForm.css"
import placeholder from '../../assets/img/bg-image.webp'
import toast, { Toaster } from "react-hot-toast"
import { useUserContext } from "../../utils/hooks/useUserContext"
import { useTranslation } from "react-i18next"
import { GenreType } from "../../types/genre"
import { Select, Space } from 'antd';
import { useGenreContext } from "../../utils/hooks/useGenresContext"






export const AddMusicForm = () => {

    const [privacityState, setPrivacityState] = useState<boolean>(false);
    const [genresSelected, setGenresSelected] = useState<string[]>([]);
    const [albumSelected, setAlbumSelected] = useState<string | null>(null)
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [genresSelectedError, setGenresSelectedError] = useState<boolean>(false);
    const { getAccessTokenSilently } = useAuth0()
    const { currentUser, setCurrentLoggedUser } = useUserContext();
    const { showGenre } = useGenreContext();
    const { t } = useTranslation();


    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
        defaultValues: {
            image: "",
            audio: "",
            title: "",
            genres: "",
            albumName: ""
        }
    })
    const [imagePreview, setImagePreview] = useState(placeholder)

    const submitForm = async () => {
        if (!isFetching) {
            setIsFetching(true)
            if (genresSelected.length > 0) {
                toast.success('Track is uploading...');

                setGenresSelectedError(false)
                const trackTitle = watch("title");

                let trackGenres = ""
                genresSelected.forEach(genre => {
                    trackGenres += `,${genre}`
                })
                trackGenres = trackGenres.slice(1)

                let trackPrivacy: string;
                if (privacityState) trackPrivacy = "true"
                else trackPrivacy = "false"
                const trackAudioFileList = watch("audio");
                const trackAudioFile = trackAudioFileList[0];

                const trackImgFileList = watch("image");
                const trackImgFile = trackImgFileList[0];

                const formTrackData = new FormData();
                formTrackData.append("upload_preset", "apollofy-track-addition")
                formTrackData.append("audio", trackAudioFile);
                formTrackData.append("image", trackImgFile);
                formTrackData.append("name", trackTitle);
                formTrackData.append("genres", trackGenres);
                formTrackData.append("privacityString", trackPrivacy);

                let correctData: boolean = true;
                if (albumSelected) {
                    if (albumSelected === "newAlbum") {
                        //crearlo y linkearlo
                        const albumNameInput = watch("albumName");
                        if (albumNameInput && albumNameInput !== "") {
                            formTrackData.append("albumName", watch("albumName"))
                        } else {
                            correctData = false
                            toast.error("Add an album name.")
                        }

                    } else {
                        formTrackData.append("albumName", albumSelected)
                    }
                }
                if (correctData) {
                    if (currentUser?.id === undefined) return;
                    const updatedUser = await postTrack(getAccessTokenSilently, formTrackData, currentUser?.id);
                    setCurrentLoggedUser(updatedUser);

                    toast.success('Track uploaded successfully...')
                    reset();
                }
            } else {
                setGenresSelectedError(true)
            }
            setIsFetching(false)
        }
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

    const handleChangeGenres = (value: string[]) => {
        setGenresSelected(value)
    };
    const handleChangeAlbumName = (value: string) => {
        setAlbumSelected(value)
    };


    return (


        <form className="add-music-form" onSubmit={handleSubmit(submitForm)}>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />

            <div className="track-container">
                <div className="track-img-container-preview">
                    <img className='img-preview' src={imagePreview} alt="Preview img" />
                </div>
            </div>
            <div className="add-track-img-container">
                <label htmlFor="track-img-input" className="track-img-label">{t('image')}</label>
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

            </div>
            {errors.image && <p className="music-form-error">{errors.image.message}</p>}
            <div className="track-audio-container">
                <label htmlFor="track-audio-input" className="track-audio-label">{t('track')}</label>
                <input id="track-audio-input" className="track-audio-input add-music-input hidden-input" type="file" accept="audio/mp3, audio/wav, audio/ogg" placeholder="Select your audio..."
                    {...register("audio", {
                        required: {
                            value: true,
                            message: "Audio is required"
                        }
                    })}
                />
            </div>
            {errors.audio && <p className="music-form-error-audio">{errors.audio.message}</p>}




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
                    onChange={handleChangeGenres}
                    optionLabelProp="label"
                >
                    {showGenre?.map((genres: GenreType) => (
                        <Select.Option
                            key={genres.id}
                            value={genres.name}>
                            <Space >
                                {genres.name}
                            </Space>
                        </Select.Option>
                    ))}

                </Select>

            </div>
            {genresSelectedError && <p className="music-form-error select-error">Select genres for your song</p>}

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
            <div className="add-to-album-container">

                <Select
                    className="add-to-album"
                    placeholder={t('selectAlbum')}
                    onChange={handleChangeAlbumName}
                >
                    {currentUser?.albums?.map(album => (
                        <Select.Option key={album.id} value={album.name}>{album.name}</Select.Option>
                    ))}
                    <Select.Option value="newAlbum">{t("newAlbum")}</Select.Option>

                </Select>

                <input
                    className="add-album-name"
                    type="text"
                    placeholder={t('addNewAlbum')}
                    disabled={albumSelected !== "newAlbum"}
                    {...register("albumName", {
                        required: false
                    })}
                >
                </input>

            </div>
            <button className="add-music-submit-btn" type="submit">{t('upload')}</button>
        </form >

    )
}
