import { useEffect, useState } from "react";

export default function WorkoutLogsPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("workoutLogs");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setLogs(Array.isArray(parsed) ? parsed : []);
      } catch {
        setLogs([]);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-600 p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-white"> Workout Logs</h2>
      {logs.length === 0 ? (
        <p className="text-center text-white">No workout logs found.</p>
      ) : (
        <ul className="space-y-4 max-w-2xl mx-auto">
          {logs.map((log) => (
            <li key={log.id} className="bg-slate-300 p-4 rounded shadow border ">
              <h4 className="font-semibold">{log.type} — {log.date}</h4>
              {log.exerciseName && (
                <p> {log.exerciseName} | {log.sets} sets × {log.reps} reps @ {log.weight}kg</p>
              )}
              <p> Rest: {log.restTime}s |  Duration: {log.duration} mins</p>
              {["Walking", "Running"].includes(log.type) && <p> Steps: {log.steps}</p>}
              <p> Calories: {log.calories} / {log.targetCalories}</p>
              {["Walking", "Running"].includes(log.type) && <p> Target Steps: {log.targetSteps}</p>}
              {log.notes && <p> Notes: {log.notes}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
    
  );
}