import { isValidElement, useContext, useState } from "react";
import MyButton from "../components/UI/button/MyButton";
import { AuthContext } from "../context";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import FirebaseService from "../API/FirebaseService";

const Login = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const isValid = () => {
    return validateEmail(email) && password.trim().length >= 6;
  };

  const login = (event) => {
    event.preventDefault();

    if (isValid()) {
      const auth = FirebaseService.getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          saveUser(userCredential);
        })
        .catch((error) => {
          showError(error);
        });
    } else {
      alert("Email or password is wrong!");
    }
  };

  const signUp = (event) => {
    event.preventDefault();
    if (isValid()) {
      const auth = FirebaseService.getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          saveUser(userCredential);
        })
        .catch((error) => {
          showError(error);
        });
    } else {
      alert("Email or password is wrong!");
    }
  };

  const saveUser = (userCredential) => {
    const user = userCredential.user;
    localStorage.setItem("accessToken", user.accessToken);
    localStorage.setItem("uid", user.uid);
    localStorage.setItem("auth", "true");
    setIsAuth(true);
  }
  const showError = (error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + ": " + errorMessage);
  }

  return (
    <div>
      <h1>Login page</h1>
      <form>
        {/* <MyInput
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="text"
          placeholder="Email"
        />
        <MyInput
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
        /> */}
        <MyButton onClick={login}>Log in</MyButton>
        <MyButton onClick={signUp}>Sign up</MyButton>
      </form>
    </div>
  );
};

export default Login;
