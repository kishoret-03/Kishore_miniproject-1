import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RequireAuth from "./components/RequireAuth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfileSetup from "./pages/ProfileSetup";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import WorkoutLog from "./pages/WorkoutLog";
import WorkoutDetail from "./pages/WorkoutDetail";
import GoalSetting from "./pages/GoalSetting";
import ExerciseCoach from "./components/ExerciseCoach";
import WorkoutLogsPage from "./components/WorkoutLogsPage"


export default function App() {
  const [workouts, setWorkouts] = useState([]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-600 text-gray-800">
      <Navbar />
      <main className="flex-grow p-4 ">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/profile" element={<RequireAuth><Profile workouts={workouts} /></RequireAuth>} />
          <Route path="/dashboard" element={<RequireAuth><Dashboard workouts={workouts} /></RequireAuth>} />
          <Route path="/workouts" element={<RequireAuth><WorkoutLog workouts={workouts} setWorkouts={setWorkouts} /></RequireAuth>} />
          <Route path="/WorkoutDetail/:id" element={<RequireAuth><WorkoutDetail /></RequireAuth>} />
          <Route path="/goalsetting" element={<RequireAuth><GoalSetting workouts={workouts} setWorkouts={setWorkouts} /></RequireAuth>} />
          <Route path="/ExerciseCoach" element={<RequireAuth><ExerciseCoach /></RequireAuth>} />
          <Route path="/WorkoutLogsPage" element={<RequireAuth><WorkoutLogsPage /></RequireAuth>} />

      
        </Routes>
      </main>
      <Footer />
    </div>
  );
}