import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userProfile");
    localStorage.removeItem("workoutLogs");
    localStorage.removeItem("sleepLogs");
    localStorage.removeItem("weightLogs");
    window.location.href = "/";
  };

  return (
    <div className="relative h-screen bg-[url('https://wallpapercave.com/wp/wp2333032.jpg')] bg-cover bg-center">
    <div className="max-w-4xl mx-auto bg-white  p-6 rounded-xl shadow text-white absolute inset-0 bg-gradient-to-br from-black/70 via-gray-800/60 to-black/70 backdrop-blur-sm">
      <h2 className="text-2xl font-bold mb-4 text-center"> User Profile</h2>
      {profile ? (
        <>
          {profile.image && (
            <img
              src={profile.image}
              alt="Profile"
              className="w-24 h-24 mx-auto mb-4 rounded-full object-cover border-2 border-blue-500"
            />
          )}
          <div className="space-y-2 text-sm">
            <p><span className="font-bold">Name :</span> {profile.name}</p>
            <p><span className="font-bold">Age :</span> {profile.age}</p>
            <p><span className="font-bold">Gender :</span> {profile.gender}</p>
            <p><span className="font-bold">Fitness Level :</span> {profile.fitnessLevel}</p>
            <p><span className="font-bold">Goals :</span> {profile.goals}</p>
            <p><span className="font-bold">Email :</span> {profile.email}</p>
            <p><span className="font-bold">Mobile Number : </span>{profile.mobile}</p>
          </div>
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => navigate("/profile-setup")}
              className="flex-grow bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
               Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="flex-grow bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
               Logout
            </button>
          </div>
        </>
      ) : (
        <div className="text-sm text-center text-gray-500">
          No profile found.
          <button
            onClick={() => navigate("/profile-setup")}
            className="mt-4 block w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            ➕ Create Profile
          </button>
        </div>
      )}
    </div>
    </div>
  );
}