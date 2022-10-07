import { useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context";
import Login from "../../pages/Login";
import Posts from "../../pages/Posts";
import { privateRoutes, publicRoutes } from "../../router";

const AppRouter = () => {
    const {isAuth, setIsAuth, isLoading} = useContext(AuthContext);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

  return (
    isAuth ? <Routes>
      {privateRoutes.map((route) => {
        return <Route element={route.element} path={route.path} key={route.path} />;
      })}
      <Route path="*" element={<Posts />} />
    </Routes> :
    <Routes>
      {publicRoutes.map((route) => {
        return <Route element={route.element} path={route.path} key={route.path} />;
      })}
      <Route path="*" element={<Login />} />
    </Routes>
    
  );
};

export default AppRouter;
