import { useState } from "react";
import "./styles/Signup.css"
import { Link } from "react-router-dom";
import { AuthenticationService } from "../../api/Authenticationapi";
const SignupPage = () => {
    const authenticationService = new AuthenticationService();

    const [state, setState] = useState<SignupRequest>({
        email: "",
        username: "",
        password1: "",
        password2: "",
    });

    const signup = async () => {
        const request = await authenticationService.signupRequest(
            state.email,
            state.username,
            state.password1,
            state.password2
        )
        if(request?.response == 200){
            window.location.href = "/"
        } else {
            window.alert(request?.message)
        }
    }

    return (<>
    <section className="signupPage">
        <h2>Sign up to MindTask</h2>
        <div className="signupWidget">
            <div className="emailField">
                <label htmlFor="">Email</label>
                <input type="email" name="" id="" value={state.email} onChange={(e) => {setState({...state, email: e.target.value});}}/>
            </div>
            <div className="userNameField">
                <label htmlFor="">User name</label>
                <input type="email" name="" id="" value={state.username} onChange={(e) => setState({...state, username: e.target.value})}/>
            </div>
            <div className="passwordField">
                <label htmlFor="">Password</label>
                <input type="password" name="" id="" value={state.password1} onChange={(e) => setState({...state, password1: e.target.value})}/>
            </div>
            <div className="passwordField">
                <label htmlFor="">Password(again)</label>
                <input type="password" name="" id="" value={state.password2} onChange={(e) => setState({...state, password2: e.target.value})}/>
            </div>
            <button className="signupButton" onClick={signup}>Sign up</button>
            <span className="loginAccount"><Link to="/auth/login">Sign in your account</Link></span>
        </div>
    </section>
    </>)
}

export default SignupPage;