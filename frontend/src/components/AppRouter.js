import Homepage from "../pages/Homepage";
 import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
// import UserProfile from "./UserProfile";
const AppRouter = () =>{
    return(
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
    )
}

export default AppRouter;

    //     <Route path="/user-profile" element={<UserProfile/>}/>