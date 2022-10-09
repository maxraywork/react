import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../context";
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
      <Route path="*" element={<Navigate replace to="/posts" />} />
    </Routes> :
    <Routes>
      {publicRoutes.map((route) => {
        return <Route element={route.element} path={route.path} key={route.path} />;
      })}
      <Route path="*" element={<Navigate replace to="/login" />} />
    </Routes>
    
  );
};

export default AppRouter;
