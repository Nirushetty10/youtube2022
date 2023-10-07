import { useState  } from "react";
import "./Login.css";
import { loginAsync } from "../../redux/auth-slice";
import { useDispatch, useSelector } from 'react-redux';

const Login = ({onclose}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    const handleSubmit = () => {
       if(email === "" || password === "") return;
        dispatch(loginAsync({email,password}));
        onclose(false);
    }

  return (
    <div className='login-container'>
        <div className="email container">
           <span>email</span>
           <input type="email" placeholder="email" className="loginInput" onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="password container">
           <span>password</span>
           <input type="password"  placeholder="password" className="loginInput" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div>
        <button type="button" className="loginButton" onClick={handleSubmit}>Login</button>
        <button type="button" className="loginButton" onClick={() => onclose(false)} >close</button>
        </div>

      
    </div>
  )
}

export default Login