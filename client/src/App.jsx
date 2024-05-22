import { Routes, Route } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import NavBar from "./components/NavBar";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import RequireAuth from "./components/RequireAuth";
import Chats from "./pages/Chats";
import Chat from "./pages/Chat";
import CreateTeleconsult from "./pages/CreateTeleconsult";
import Teleconsults from "./pages/Teleconsults";
import Teleconsult from "./pages/Teleconsult";
import ProfileEdit from "./pages/ProfileEdit";
import Profile from "./pages/Profile";
import CreateChat from "./pages/CreateChat";
import ChangePassword from "./pages/ChangePassword";

import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <main className="my-3 container">
        <Routes>
          {/* general */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* authorization */}
          <Route element={<RequireAuth authRoles={["doctor", "patient"]} />}>
            <Route path="/home" element={<Home />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/chats/:id" element={<Chat />} />
            <Route path="/chats/create" element={<CreateChat />} />
            <Route path="/create-teleconsult" element={<CreateTeleconsult />} />
            <Route path="/teleconsults" element={<Teleconsults />} />
            <Route path="/teleconsults/:id" element={<Teleconsult />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
            <Route path="/profile/edit/password" element={<ChangePassword />} />
          </Route>
        </Routes>
      </main>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
