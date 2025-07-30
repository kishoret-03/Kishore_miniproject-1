import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function ProfileSetup() {
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    gender: "",
    fitnessLevel: "",
    goals: "",
    email: "",
    image: "",
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("userProfile", JSON.stringify(profile));
    toast.success("Profile saved successfully!");
    window.location.href = "/Profile";
  };

  return (
    <div className="relative h-screen bg-[url('https://wallpapercave.com/wp/wp2333032.jpg')] bg-cover bg-center backdrop-blur-sm">
    <div className="max-w-xl mx-auto bg-slate-600 p-6 rounded-xl shadow text-white absolute inset-0 bg-gradient-to-br from-black/70 via-gray-800/60 to-black/70 backdrop-blur-sm ">
      <h2 className="text-2xl font-bold mb-4 text-center"> Edit Profile</h2>
      <form onSubmit={handleSave} className="space-y-4">
        <input
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="w-full px-3 py-2 border rounded"
        />
        <input
          name="age"
          value={profile.age}
          onChange={handleChange}
          type="number"
          placeholder="Age"
          required
          className="w-full px-3 py-2 border rounded"
        />
        <select
          name="gender"
          value={profile.gender}
          onChange={handleChange}
          required
          className="w-full bg-slate-600 px-3 py-2 border rounded"
        >
          <option value="">Select Gender</option>
          <option value="Male"> Male</option>
          <option value="Female"> Female</option>
          <option value="Other"> Other</option>
        </select>
        <select
          name="fitnessLevel"
          value={profile.fitnessLevel}
          onChange={handleChange}
          required
          className="w-full bg-slate-600 px-3 py-2 border rounded"
        >
          <option value="">Fitness Level</option>
          <option value="Beginner">Beginner </option>
          <option value="Intermediate">Intermediate </option>
          <option value="Advanced">Advanced </option>
        </select>
        <input
          name="goals"
          value={profile.goals}
          onChange={handleChange}
          placeholder="Fitness Goals"
          required
          className="w-full px-3 py-2 border rounded"
         />

         <input
          name="mobile"
          value={profile.mobile}
          onChange={handleChange}
          type="tel"
          placeholder="Mobile Number"
          required
          className="w-full px-3 py-2 border rounded"
        />
        <input
          name="email"
          value={profile.email}
          onChange={handleChange}
          type="email"
          placeholder="Email Address"
          required
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full px-3 py-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
           Save Profile
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
    </div>
    </div>
    
  );
}
