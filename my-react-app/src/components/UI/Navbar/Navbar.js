import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context";
import MyButton from "../button/MyButton";

const Navbar = () => {
    const {isAuth, setIsAuth, isLoading} = useContext(AuthContext);

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth');
        localStorage.removeItem('uid');
        localStorage.removeItem('accessToken');
    }

    return (
        <div className="navbar">
            <MyButton onClick={logout} >Log out</MyButton>
        <div className="navbar__links">
            <Link to="/about">About</Link>
            <Link to="/posts" style={{marginLeft: 16}}>Posts</Link>
        </div>
      </div>
    );
}

export default Navbar;