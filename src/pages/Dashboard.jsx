import { useEffect, useState } from "react";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "react-big-calendar/lib/css/react-big-calendar.css";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const localizer = momentLocalizer(moment);

export default function Dashboard() {
  const [workouts, setWorkouts] = useState([]);
  const [sleepLogs, setSleepLogs] = useState([]);
  const [weightLogs, setWeightLogs] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setWorkouts(JSON.parse(localStorage.getItem("workoutLogs")) || []);
    setSleepLogs(JSON.parse(localStorage.getItem("sleepLogs")) || []);
    setWeightLogs(JSON.parse(localStorage.getItem("weightLogs")) || []);
  }, []);

  const filteredWorkouts = selectedDate
    ? workouts.filter((w) => w.date === selectedDate)
    : workouts;

  const stepBased = filteredWorkouts.filter((w) =>
    ["Walking", "Running"].includes(w.type)
  );

  const totalSteps = stepBased.reduce((sum, w) => sum + Number(w.steps || 0), 0);
  const totalStepTarget = stepBased.reduce((sum, w) => sum + Number(w.targetSteps || 0), 0);
  const totalCalories = filteredWorkouts.reduce((sum, w) => sum + Number(w.calories || 0), 0);
  const totalSleep = sleepLogs.reduce((sum, s) => sum + Number(s.sleep || 0), 0);
  const latestWeight = weightLogs.at(-1)?.weight || 0;

  const pieData = {
    labels: ["Steps", "Target Steps", "Calories", "Sleep", "Weight"],
    datasets: [
      {
        data: [totalSteps, totalStepTarget, totalCalories, totalSleep, latestWeight],
        backgroundColor: ["#3b82f6", "#60a5fa", "#10b981", "#f59e0b", "#ef4444"],
      },
    ],
  };

  const sorted = [...filteredWorkouts]
    .filter((w) => w.date)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const lineLabels = sorted.map((w) => moment(w.date).format("MMM D"));
  const stepsActual = sorted.map((w) =>
    ["Walking", "Running"].includes(w.type) ? Number(w.steps || 0) : null
  );
  const stepsTarget = sorted.map((w) =>
    ["Walking", "Running"].includes(w.type) ? Number(w.targetSteps || 0) : null
  );
  const caloriesActual = sorted.map((w) => Number(w.calories || 0));
  const caloriesTarget = sorted.map((w) => Number(w.targetCalories || 0));

  const lineData = {
    labels: lineLabels,
    datasets: [
      {
        label: "Steps (Achieved)",
        data: stepsActual,
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
      },
      {
        label: "Steps (Target)",
        data: stepsTarget,
        borderColor: "#10b981",
        borderDash: [6, 6],
      },
      {
        label: "Calories (Achieved)",
        data: caloriesActual,
        borderColor: "#f59e0b",
        backgroundColor: "rgba(245, 158, 11, 0.2)",
      },
      {
        label: "Calories (Target)",
        data: caloriesTarget,
        borderColor: "#f59e0b",
        borderDash: [6, 6],
      },
    ],
  };

  const exerciseSummary = {};
  filteredWorkouts.forEach((w) => {
    if (!w.exerciseName) return;
    const key = `${w.type}: ${w.exerciseName}`;
    if (!exerciseSummary[key]) exerciseSummary[key] = { sets: 0, reps: 0 };
    exerciseSummary[key].sets += Number(w.sets || 0);
    exerciseSummary[key].reps += Number(w.reps || 0);
  });

  const barData = {
    labels: Object.keys(exerciseSummary),
    datasets: [
      {
        label: "Sets",
        data: Object.values(exerciseSummary).map((e) => e.sets),
        backgroundColor: "#3b82f6",
      },
      {
        label: "Reps",
        data: Object.values(exerciseSummary).map((e) => e.reps),
        backgroundColor: "#10b981",
      },
    ],
  };

  const events = workouts.map((w) => ({
    id: w.id,
    title: `${w.type}: ${w.exerciseName} (${w.sets}x${w.reps})`,
    start: new Date(w.date),
    end: new Date(w.date),
    allDay: true,
  }));

  return (
    <div className="p-6 bg-slate-300 text-black min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Dashboard</h1>

      <div className="mb-6">
        <label className="font-semibold block mb-2">📅 Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-4 py-2 border rounded w-full max-w-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow h-[500px] flex flex-col items-center justify-center">
          <h3 className="text-xl font-bold mb-4 text-center">Daily Summary</h3>
          <div className="w-[220px] h-[220px]">
            <Doughnut data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow h-[500px]">
          <h3 className="text-xl font-bold mb-4 text-center">Strength Breakdown</h3>
          <Bar
            data={barData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { position: "bottom" } },
              scales: {
                x: { ticks: { color: "#333" } },
                y: { beginAtZero: true, ticks: { stepSize: 1, color: "#333" } },
              },
            }}
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow h-[500px]">
          <h3 className="text-xl font-bold mb-4 text-center">Target vs Achieved</h3>
          <Line
            data={lineData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { position: "bottom" } },
              scales: {
                x: { ticks: { color: "#333" } },
                y: { beginAtZero: true, ticks: { color: "#333" } },
              },
            }}
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow h-[500px]">
          <h3 className="text-xl font-bold mb-4 text-center">Workout Calendar</h3>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 400 }}
            views={["month", "week", "day", "agenda"]}
            defaultView="month"
            toolbar={true}
            popup={true}
            onSelectEvent={(event) => navigate(`/workoutDetail/${event.id}`)}
          />
        </div>
      </div>
    </div>
  );
}