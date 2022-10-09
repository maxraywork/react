import "./styles/App.css";
import { BrowserRouter } from "react-router-dom";

import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/UI/AppRouter";
import { AuthContext, User } from "./context";
import { useEffect, useState } from "react";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    const accessToken = localStorage.getItem("accessToken");

    if (uid && accessToken) {
      setIsAuth(true);
      setUser({ uid: uid, accessToken: accessToken });
    }
    setIsLoading(false);
  }, []);

  return (
    <User.Provider value={user}>
      <AuthContext.Provider
        value={{
          isAuth,
          setIsAuth,
          isLoading,
        }}
      >
        <BrowserRouter>
          <Navbar />
          <AppRouter />
        </BrowserRouter>
      </AuthContext.Provider>
    </User.Provider>
  );
}

export default App;
