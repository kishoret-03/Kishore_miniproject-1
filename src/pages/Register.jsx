import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";


export default function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const { email, password, confirm } = e.target.elements;

    if (password.value !== confirm.value) {
      alert("Passwords don't match");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("auth", "true");
    navigate("/dashboard");
  };

  return (
    <div className="relative h-screen bg-[url('https://jpimg.com.br/uploads/2023/08/10-beneficios-da-musculacao-para-a-saude-do-corpo-1024x683.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-gray-800/60 to-black/70 backdrop-blur-sm" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-white text-center">
        <h1 className="text-5xl font-extrabold drop-shadow-lg mb-4">
          Create Your FitRace Account
        </h1>
        <p className="mb-6 text-lg text-gray-300 max-w-md">
          Join the race to fitness—log workouts, track goals, and stay motivated.
        </p>
        <AuthForm type="register" onSubmit={handleRegister} />

        <p className="mt-4 text-sm text-gray-200">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-blue-400 hover:underline cursor-pointer"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}
