import { useState } from "react";
import { Eye, EyeOffSharp } from "react-ionicons";

import "./styles/Login.css"
import { Link } from "react-router-dom";
import { AuthenticationService } from "../../api/Authenticationapi";
const LoginPage = () => {
    const authenticationService = new AuthenticationService();
    const [isHiddenPassword, setPasswordState] = useState(true);
    const [state, setState] = useState<LoginRequest>({
        email: "",
        password: "",
    })

    const login = async () => {
        const request = await authenticationService.loginRequest(
            state.email,
            state.password
        )
        if(request.response == 200) {
            window.location.href = "/"
        } else {
            window.alert(request);
        }
    }


    return (<>
    <section className="loginPage">
        <h2>Sign in to MindTask</h2>
        <div className="loginWidget">
            <div className="emailField">
                <label htmlFor="">Email</label>
                <input type="text" name="" id="" value={state.email} onChange={(e) => {setState({...state, email:e.target.value})}}/>
            </div>
            <div className="passwordField">
                <label htmlFor="">Password</label>
                <span className="passwordInput">
                    <input type={isHiddenPassword?"password":"text"} value={state.password} onChange={(e) => {setState({...state, password:e.target.value})}}/>
                    <button onClick={() => {setPasswordState(!isHiddenPassword)}}>
                        {isHiddenPassword?<Eye/>: <EyeOffSharp/>}
                    </button>
                </span>
            </div>
            <button className="signinButton" onClick={login}>Sign in</button>
            <span className="createNewAccount"><Link to="/auth/register">Create New Account</Link></span>
        </div>
    </section>
    </>)
}

export default LoginPage;