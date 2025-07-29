import { useState, useEffect } from "react";

export default function GoalSetting() {
  const [goals, setGoals] = useState({
    steps: "",
    calories: "",
    sleep: "",
    weight: ""
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("fitnessGoals");
    if (stored) {
      setGoals(JSON.parse(stored));
      setEditMode(true);
    }
  }, []);

  const handleChange = (e) =>
    setGoals({ ...goals, [e.target.name]: e.target.value });

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("fitnessGoals", JSON.stringify(goals));
    setEditMode(true);
  };

  const handleDeleteGoal = (goalKey) => {
    const updatedGoals = { ...goals, [goalKey]: "" };
    setGoals(updatedGoals);
    localStorage.setItem("fitnessGoals", JSON.stringify(updatedGoals));
  };

  const handleReset = () => {
    localStorage.removeItem("fitnessGoals");
    setGoals({ steps: "", calories: "", sleep: "", weight: "" });
    setEditMode(false);
  };

  return (
    <div className="relative h-screen bg-[url('https://cdn.mos.cms.futurecdn.net/t2VpXGccQQ7FHpqSg3BY2b-1200-80.jpg')] bg-cover bg-center">
      <div className="max-w-5xl mx-auto text-white p-6 rounded-lg shadow absolute inset-0 bg-gradient-to-br from-black/70 via-gray-800/60 to-black/70 backdrop-blur-md">
        <h2 className="text-2xl font-bold mb-4 text-center">🎯 Set Your Fitness Goals</h2>
        <form onSubmit={handleSave} className="space-y-4">
          <input
            type="number"
            name="steps"
            value={goals.steps}
            onChange={handleChange}
            placeholder="Daily Step Goal"
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="number"
            name="calories"
            value={goals.calories}
            onChange={handleChange}
            placeholder="Daily Calorie Goal"
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="number"
            name="sleep"
            value={goals.sleep}
            onChange={handleChange}
            placeholder="Sleep Goal (hrs)"
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="number"
            name="weight"
            value={goals.weight}
            onChange={handleChange}
            placeholder="Target Weight (kg)"
            className="w-full px-3 py-2 border rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            {editMode ? "Update Goals" : "Save Goals"}
          </button>
          {editMode && (
            <button
              type="button"
              onClick={handleReset}
              className="w-full mt-2 bg-red-500 text-white py-2 rounded"
            >
              Reset All Goals
            </button>
          )}
        </form>

       
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-center"> Current Goals</h3>
          <ul className="space-y-3">
            {["steps", "calories", "sleep", "weight"].map((key) => (
              goals[key] ? (
                <li key={key} className="bg-gray-100 text-black p-3 rounded flex justify-between items-center">
                  <span>
                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {goals[key]}
                  </span>
                  <button
                    onClick={() => handleDeleteGoal(key)}
                    className="text-red-600 text-sm underline"
                  >
                    Delete
                  </button>
                </li>
              ) : null
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}