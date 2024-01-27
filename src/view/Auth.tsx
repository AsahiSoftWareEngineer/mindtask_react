import {Routes, Route} from "react-router-dom";
import appIcon from "../img/Logo.png";
import "./styles/Auth.css"
import LoginPage from "../page/auth/Login";
import SignupPage from "../page/auth/Signup";

const AuthenticationTemplate = () => {
    return (<>
    <div className="app">
        <section className="appIcon">
            <img src={appIcon} alt=""/>
        </section>
        <section className="appContent">
            <Routes>
                <Route path="login/" element={<LoginPage/>}/>
                <Route path="register/" element={<SignupPage/>}/>
            </Routes>
        </section>
    </div>
    </>)
}

export default AuthenticationTemplate;