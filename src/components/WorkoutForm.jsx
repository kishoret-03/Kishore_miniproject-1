import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function WorkoutForm() {
  const [form, setForm] = useState({
    type: "Chest",
    date: "",
    exerciseName: "",
    sets: "",
    reps: "",
    weight: "",
    restTime: "",
    duration: "",
    steps: "",
    calories: "",
    targetSteps: "",
    targetCalories: "",
    notes: "",
  });

  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem("workoutLogs");
    return saved ? JSON.parse(saved) : [];
  });

  const [editId, setEditId] = useState(null);

  const workoutTypes = [
    "Walking", "Running", "Cycling", "Yoga", "Gym", "Swimming", "Dance",
    "Chest", "Back", "Shoulders", "Biceps", "Triceps", "Legs",
    "Abs/Core", "Full Body", "HIIT", "Cardio",
  ];

  const showStepsFields = ["Walking", "Running"].includes(form.type);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLog = { ...form, id: editId || Date.now() };
    const updatedLogs = editId
      ? logs.map((w) => (w.id === editId ? newLog : w))
      : [...logs, newLog];

    setLogs(updatedLogs);
    localStorage.setItem("workoutLogs", JSON.stringify(updatedLogs));
    setForm({
      type: "Chest",
      date: "",
      exerciseName: "",
      sets: "",
      reps: "",
      weight: "",
      restTime: "",
      duration: "",
      steps: "",
      calories: "",
      targetSteps: "",
      targetCalories: "",
      notes: "",
    });
    toast.success(editId ? "Workout updated successfully!" : "Workout added successfully!", {
      autoClose: 2000,
    });
    setEditId(null);
  };

  const handleEdit = (id) => {
    const log = logs.find((l) => l.id === id);
    if (log) {
      setForm(log);
      setEditId(id);
    }
  };

  const handleDelete = (id) => {
    const filtered = logs.filter((l) => l.id !== id);
    setLogs(filtered);
    localStorage.setItem("workoutLogs", JSON.stringify(filtered));
    if (editId === id) {
      setEditId(null);
      setForm({
        type: "Chest",
        date: "",
        exerciseName: "",
        sets: "",
        reps: "",
        weight: "",
        restTime: "",
        duration: "",
        steps: "",
        calories: "",
        targetSteps: "",
        targetCalories: "",
        notes: "",
      });
    }
  };

  return (
    <div className="p-6 bg-slate-600 text-white rounded-xl shadow max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Workout Log</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <select name="type" value={form.type} onChange={handleChange} required className="w-full bg-slate-600 px-3 py-2 border rounded">
          {workoutTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>

        <input type="text" name="exerciseName" value={form.exerciseName} onChange={handleChange} placeholder="Exercise Name" className="w-full px-3 py-2 border rounded" />
        <input type="number" name="sets" value={form.sets} onChange={handleChange} placeholder="Sets" className="w-full px-3 py-2 border rounded" />
        <input type="number" name="reps" value={form.reps} onChange={handleChange} placeholder="Reps" className="w-full px-3 py-2 border rounded" />
        <input type="number" name="weight" value={form.weight} onChange={handleChange} placeholder="Weight (kg)" className="w-full px-3 py-2 border rounded" />
        <input type="number" name="restTime" value={form.restTime} onChange={handleChange} placeholder="Rest Time (secs)" className="w-full px-3 py-2 border rounded" />
        <input type="date" name="date" value={form.date} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
        <input type="number" name="duration" value={form.duration} onChange={handleChange} placeholder="Duration (mins)" className="w-full px-3 py-2 border rounded" />

        {showStepsFields && (
          <>
            <input type="number" name="steps" value={form.steps} onChange={handleChange} placeholder="Steps" className="w-full px-3 py-2 border rounded" />
            <input type="number" name="targetSteps" value={form.targetSteps} onChange={handleChange} placeholder="Target Steps" className="w-full px-3 py-2 border rounded" />
          </>
        )}

        <input type="number" name="calories" value={form.calories} onChange={handleChange} placeholder="Calories Burned" className="w-full px-3 py-2 border rounded" />
        <input type="number" name="targetCalories" value={form.targetCalories} onChange={handleChange} placeholder="Target Calories" className="w-full px-3 py-2 border rounded" />
        <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" className="w-full px-3 py-2 border rounded" />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {editId ? "Update Workout" : "Add Workout"}
        </button>
      </form>

      <Link to="/WorkoutLogsPage" className="mt-4 block text-center bg-gray-100 text-blue-600 py-2 rounded border hover:bg-gray-200">
        View Workout Logs
      </Link>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover={false}
        draggable={false}
      />
    </div>
  );
}