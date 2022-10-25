import { useContext } from "react";
import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import { AuthContext } from "../../context";
import About from "../../pages/About";
import PostIdPage from "../../pages/PostIdPage";
import Posts from "../../pages/Posts";
import Login from "../../pages/Login";
// import { privateRoutes, publicRoutes } from "../../router";

const AppRouter = () => {
    const {isAuth, setIsAuth, isLoading} = useContext(AuthContext);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    let privateRoutes = useRoutes([
      { path: "/about", element: <About /> },
      {
        path: "/posts",
        element: <Posts />,
        children: [{ path: ":id", element: <PostIdPage /> }],
      },
    ]);
    
    let publicRoutes = useRoutes([{ path: "/login", element: <Login /> }])

  return (
    isAuth ? <Routes>
      {privateRoutes}
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
