import "./App.css";
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/header/Header";
import AddButton from "./components/addButton/AddButton";
import AddMagazine from "./pages/add-magazine/AddMagazine";
import SignUp from "./pages/sign-up/SignUp";
import Login from "./pages/login/Login";
import PrivateRoute from "./routes/PrivateRoutes";
import Home from "./pages/home/Home";
import MyMagazine from "./pages/my-magazine/MyMagazine";
import EditMagazine from "./pages/edit-magazine/EditMagazine";

const App = () => {
  const location = useLocation();
  return (
    <React.Fragment>
      <Header />
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/add-magazine"
            element={
              <PrivateRoute path="/add-magazine" component={AddMagazine} />
            }
          />
          <Route
            path="/my-magazine"
            element={
              <PrivateRoute path="/my-magazine" component={MyMagazine} />
            }
          />
          <Route
            path="/edit-magazine/:id"
            element={
              <PrivateRoute
                path={`${location.pathname}`}
                component={EditMagazine}
              />
            }
          />
        </Routes>
      </>
      <AddButton />
    </React.Fragment>
  );
};
export default App;
