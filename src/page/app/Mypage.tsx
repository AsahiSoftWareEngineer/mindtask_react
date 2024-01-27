import { useEffect, useState } from "react";
import { ContinuationComponent } from "../../components/Continution";
import { ProfileComponent } from "../../components/Profile";
import {StairsComponent} from "../../components/Stairs"
import "./styles/Mypage.css"
import { ProfileService } from "../../api/Profileapi";
import { LoadingComponent } from "../../components/Loading";

const Mypage = () => {
    const [continuation, setContinuation] = useState(0)
    const [stairs, setStairs] = useState(0);
    const [profile, setProfile] = useState<{name:string}>({name:""})
    const [isLoading, setLoading] = useState(true)

    const profileSvc = new ProfileService()
    useEffect(() => {
        getProfile()
    }, [])

    const getProfile = async () => {
        const request = await profileSvc.getProfile();
        setStairs(request.stairs)
        setContinuation(request.continuation)
        setProfile(request.profile);
        setLoading(false)
    }

    return (<>
        <section className="myPage">
            <div className="profile">
                <ProfileComponent name={profile.name}/>
                <ContinuationComponent value={continuation}/>
                <StairsComponent value={stairs}/>
            </div>
        </section>
        {isLoading&&<LoadingComponent/>}
        </>
    )
}

export default Mypage;