import WorkoutForm from "../components/WorkoutForm";
import SleepTracker from "../components/SleepTracker";
import WeightTracker from "../components/WeightTracker";

export default function WorkoutLogPage() {
  return (
    <div className="relative h-screen bg-[url('https://wallpapercave.com/wp/wp2333032.jpg')] bg-cover bg-center">
    <div className="grid lg:grid-cols-3 gap-6 p-6 bg-slate-100 text-White absolute inset-0 bg-gradient-to-br from-black/70 via-gray-800/60 to-black/70 backdrop-blur-sm">
      <WorkoutForm />
      <SleepTracker />
      <WeightTracker />
    </div>
    </div>
  );
}