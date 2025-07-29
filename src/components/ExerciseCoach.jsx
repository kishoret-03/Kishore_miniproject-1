import { useState } from 'react';
import axios from 'axios';

const ExerciseCoach = () => {
  const [query, setQuery] = useState('');
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchExercises = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/exercises?muscle=${query}`,
        {
          headers: {
            'X-Api-Key': 'Tfyupa8OuM3x6bMEZF5LdA==A1jw73Nf3dZO9Oup',
          },
        }
      );
      console.log('Response:', response.data);
      setExercises(response.data);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800"> Exercise Coach</h2>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter muscle group (e.g. chest, biceps)"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full"
        />
        <button
          onClick={fetchExercises}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-gray-600">🔄 Loading exercises...</p>}

      {!loading && exercises.length === 0 && (
        <p className="text-gray-500">No results yet. Try a valid muscle group.</p>
      )}

      <ul className="space-y-4">
        {exercises.map((ex, idx) => (
          <li key={idx} className="border border-gray-300 p-4 rounded-md bg-gray-50">
            <h3 className="text-lg font-semibold text-blue-700">{ex.name}</h3>
            <p><strong>Type:</strong> {ex.type}</p>
            <p><strong>Muscle:</strong> {ex.muscle}</p>
            <p><strong>Difficulty:</strong> {ex.difficulty}</p>
            <p><strong>Instructions:</strong> {ex.instructions}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseCoach;