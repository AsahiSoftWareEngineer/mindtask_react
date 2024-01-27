import { DEFAULT_HOST } from "../env/endpoint"
import { PersonOutline } from "react-ionicons"
import "./styles/Profile.css"

export const ProfileComponent = ({name, image}:{name:string, image?:string|null}) => {
    return (
    <div className="basicInfo">
        <div className="name">
            {name}
        </div>
        <div className="image">
            <span className="icon">
                {image?(<>
                <img src={`${DEFAULT_HOST}/${image}/`} />
                </>):(<>
                <PersonOutline/>
                </>)}
            </span>
        </div>
    </div>
    )
}