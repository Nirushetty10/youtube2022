import { useEffect, useState } from "react";
import "./navbar.css";
import {Link} from "react-router-dom";
import Login from "../login/Login";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsync } from "../../redux/auth-slice";

const Navbar = () => {
  const dispatch = useDispatch();
  const [loginOpen , setLoginOpen] = useState(false);
  const user = useSelector(state => state.auth.user);
  
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  },[user]);

   const handleLogout = () => {
      dispatch(logoutAsync());
   }

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color : "inherit" , textDecoration : "none"}}>
        <span className="logo">lamabooking</span>
        </Link>
        {!user ? <div className="navItems">
          <button className="navButton">Register</button>
          <button className="navButton" onClick={() => setLoginOpen(true)}>Login</button>
        </div> :  <div className="userProfile">
          <h2>{user.username}</h2>
          <button className="navButton" onClick={handleLogout}>Logout</button>
          </div>}
      </div>
      {loginOpen && <Login onclose={setLoginOpen}/>}
    </div>
  )
}

export default Navbar