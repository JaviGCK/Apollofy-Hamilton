import { useForm } from "react-hook-form"
import "./form.css"
import { useState } from "react"
import { postDataCloud, postTrackServer } from "../../../api/fetchApi"
import { useAuth0 } from "@auth0/auth0-react"
import { GenreTypes } from "../../../types/dataTypes/enums"
import { getUniqueId } from "../../../utils/functions/randomId"


export const Form = () => {

    const [privacityState, setPrivacityState] = useState(false)
    const { user } = useAuth0()

    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
        defaultValues: {
            image: "",
            audio: "",
            title: "",
            genre: ""
        }
    })


    const submitForm = async () => {

        const email = "ali.hourag@gmail.com"; //este sería el usuario que se logea!!
        const trackTitle = watch("title");
        const trackPrivacy = privacityState;
        const trackId = getUniqueId();
        const trackGenre = watch("genre") as GenreTypes;
        console.log(trackId);

        const trackAudioFileList = watch("audio");
        const trackAudioFile = trackAudioFileList[0];

        const trackImgFileList = watch("image");
        const trackImgFile = trackImgFileList[0];

        const formTrackData = new FormData();
        formTrackData.append("upload_preset", "apollofy-track-addition")
        formTrackData.append("file", trackAudioFile);

        const formTrackImgData = new FormData();
        formTrackImgData.append("upload_preset", "apollofy_tracks-img")
        formTrackImgData.append("file", trackImgFile);

        const audioUrl = await postDataCloud(formTrackData);
        const imageUrl = await postDataCloud(formTrackImgData);


        postTrackServer(email, audioUrl, trackId, trackTitle, imageUrl, trackPrivacy, trackGenre);

        reset();

    }


    const handlePrivacity = () => {
        setPrivacityState(!privacityState)
    }


    return (
        <div>
            <form className="add-music-form" onSubmit={handleSubmit(submitForm)}>
                <input className="track-img-input add-music-input" type="file" accept="image/jpeg, image/jpg, image/webp" placeholder="Select track image..."
                    {...register("image", {
                        required: {
                            value: true,
                            message: "Image is required"
                        }
                    })}
                />
                {errors.image && <p className="music-form-error">{errors.image.message}</p>}

                <input className="track-audio-input add-music-input" type="file" accept="audio/mp3, audio/wav, audio/ogg" placeholder="Select your audio..."
                    {...register("audio", {
                        required: {
                            value: true,
                            message: "Audio is required"
                        }
                    })}
                />
                {errors.audio && <p className="music-form-error">{errors.audio.message}</p>}

                <input className="track-title-input add-music-input" type="text" placeholder="Your song name..."
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
                {errors.title && <p className="music-form-error">{errors.title.message}</p>}

                <select className="track-genre-select add-music-input" id="genres"
                    defaultValue=""
                    {...register("genre", {
                        required: {
                            value: true,
                            message: "Genre selection is required"
                        }
                    })}
                >
                    <option value="" disabled hidden>Select a genre for your song</option>
                    <option value="hip-hop">Hip-Hop</option>
                    <option value="rock">Rock</option>
                    <option value="pop">Pop</option>
                    <option value="r&b">R&B</option>
                    <option value="metal">Metal</option>
                    <option value="punk">Punk</option>
                    <option value="dance">Dance</option>
                    <option value="rap">Rap</option>
                    <option value="drill">Drill</option>
                    <option value="urban">Urban</option>
                </select>
                {errors.genre && <p className="music-form-error">{errors.genre.message}</p>}

                <p>Privacity</p>
                <p>{privacityState ? "Private" : "Public"}</p>
                <label className="switch">
                    <input type="checkbox" id="track-privacity-check" onChange={handlePrivacity} />
                    <span className="slider"></span>
                </label>

                <button type="submit">Upload</button>
            </form>
        </div>
    )
}
