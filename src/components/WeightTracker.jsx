import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function WeightTracker() {
  const [entry, setEntry] = useState({ date: "", weight: "" });
  const [logs, setLogs] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showLogs, setShowLogs] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("weightLogs");
    if (saved) setLogs(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("weightLogs", JSON.stringify(logs));
  }, [logs]);

  const handleChange = (e) =>
    setEntry({ ...entry, [e.target.name]: e.target.value });

  const saveWeight = (e) => {
    e.preventDefault();
    const newLog = { ...entry, id: Date.now() };
    const updatedLogs = editId
      ? logs.map((l) => (l.id === editId ? newLog : l))
      : [...logs, newLog];
    setLogs(updatedLogs);
    setEntry({ date: "", weight: "" });

    toast.success(editId ? "Weight updated successfully!" : "Weight added successfully!");
    

    setEditId(null);
  };

  const handleEdit = (id) => {
    const log = logs.find((l) => l.id === id);
    if (log) {
      setEntry(log);
      setEditId(id);
    }
  };

  const handleDelete = (id) => {
    setLogs(logs.filter((l) => l.id !== id));
    if (editId === id) {
      setEditId(null);
      setEntry({ date: "", weight: "" });
    }
  };

  return (
    <div className="p-6 bg-slate-600 text-white text-center rounded-xl shadow">
      <h2 className="text-xl font-bold text-grey-600 mb-4"> Weight Tracker</h2>
      <form onSubmit={saveWeight} className="space-y-3">
        <input
          type="date"
          name="date"
          value={entry.date}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="number"
          name="weight"
          value={entry.weight}
          onChange={handleChange}
          placeholder="Weight (kg)"
          required
          className="w-full px-3 py-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          {editId ? "Update Weight Log" : "Add Weight Log"}
        </button>
      </form>

      <button
        onClick={() => setShowLogs(!showLogs)}
        className="mt-6 w-full bg-gray-100 text-blue-600 py-2 rounded border"
      >
        {showLogs ? "Hide Weight Logs" : "View Weight Logs"}
      </button>

      {showLogs && (
        <ul className="mt-4 space-y-2">
          {logs.map((log) => (
            <li
              key={log.id}
              className="bg-slate-300 text-black  p-3 rounded shadow flex justify-between items-center"
            >
              <span>{log.date} — {log.weight} kg</span>
              <div className="flex gap-4 text-sm">
                <button onClick={() => handleEdit(log.id)} className="text-green-600 underline">Edit</button>
                <button onClick={() => handleDelete(log.id)} className="text-red-600 underline">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
    </div>
  );
}