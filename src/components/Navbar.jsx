import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const navClass = ({ isActive }) =>
    isActive ? "text-cyan-300 font-semibold" : "text-white hover:text-cyan-300";


  useEffect(() => {
    const loginFlag = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loginFlag === "true");
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <nav className="bg-slate-800 shadow px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img src="/FitRace.png" alt="FitRace Icon" className="w-8 h-8 rounded-full border-2 border-cyan-400" />
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
         FitRace
        </h1>
      </div>
      <div className="flex gap-4 text-sm font-medium">
        <NavLink to="/dashboard" className={navClass}>Dashboard</NavLink>
        <NavLink to="/workouts" className={navClass}>Workouts</NavLink>
        <NavLink to="/GoalSetting" className={navClass}>Goals</NavLink>
        <NavLink to="/ExerciseCoach" className={navClass}>Exercises</NavLink>
        <NavLink to="/profile" className={navClass}>Profile</NavLink>
        {!isLoggedIn && <NavLink to="/" className={navClass}>Login</NavLink>}
        {isLoggedIn && <button onClick={handleLogout} className="text-white hover:text-red-400">Logout</button>}
      </div>
    </nav>
  );
}