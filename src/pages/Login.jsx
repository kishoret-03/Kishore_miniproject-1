import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    if (!email.value || !password.value) {
    alert("Please enter both email and password.");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("auth", "true");
    navigate("/dashboard");
  };

  return (
    <div className="relative h-screen bg-[url('https://static.vecteezy.com/system/resources/previews/022/460/664/large_2x/muscular-bodybuilder-male-athlete-demonstrates-her-body-in-the-gym-generative-ai-free-photo.jpg ')]  bg-centebg-coverr">
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-gray-800/60 to-black/70 backdrop-blur-sm" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-white text-center">
        <h1 className="text-5xl font-extrabold drop-shadow-lg mb-4">
          FitRace Login
        </h1>
        <p className="mb-6 text-lg text-gray-300 max-w-md">
          Track workouts, set goals, and stay on top of your fitness journey.
        </p>
        <AuthForm type="login" onSubmit={handleLogin} />

        <p className="mt-4 text-sm text-gray-200">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-400 hover:underline cursor-pointer"
          >
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
}