import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function WorkoutDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [workout, setWorkout] = useState(null);

  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem("workoutLogs")) || [];
    const found = logs.find((w) => String(w.id) === String(id));
    if (found) setWorkout(found);
  }, [id]);

  if (!workout) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center text-red-600">
        ❌ Workout not found.
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          ⬅️ Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white  p-6 rounded-xl shadow text-black ">
      <h2 className="text-4xl font-bold mb-4 text-center"> Workout Details</h2>
      <div className="text-3xl space-y-2 text-sm">
        <p><strong>🗓 Date:</strong> {workout.date}</p>
        <p><strong>🏃 Type:</strong> {workout.type}</p>
        <p><strong>⏱ Duration:</strong> {workout.duration} mins</p>
        <p><strong>👣 Steps:</strong> {workout.steps}</p>
        <p><strong>🔥 Calories Burned:</strong> {workout.calories}</p>
        <p><strong>🎯 Target Steps:</strong> {workout.targetSteps}</p>
        <p><strong>🎯 Target Calories:</strong> {workout.targetCalories}</p>
        {workout.notes && (
          <p><strong>📝 Notes:</strong> {workout.notes}</p>
        )}
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-slate-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          ⬅️ Back to Dashboard
        </button>
      </div>
    </div>
  );
}