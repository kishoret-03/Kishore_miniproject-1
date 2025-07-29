export default function AuthForm({ type, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white/5 text-white backdrop-blur-md border border-white/20 shadow-xl rounded px-8 pt-6 pb-8 max-w-md w-full"
    >
      <h2 className="text-3xl font-bold mb-6 text-center drop-shadow-md">
        {type === "login" ? "Login" : "Register"}
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-white/80">Email</label>
        <input
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          className="w-full px-4 py-2 bg-white/10 text-white placeholder-gray-300 rounded-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-white/80">Password</label>
        <input
          type="password"
          name="password"
          required
          placeholder="Enter password"
          className="w-full px-4 py-2 bg-white/10 text-white placeholder-gray-300 rounded-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm"
        />
      </div>

      {type === "register" && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-white/80">Confirm Password</label>
          <input
            type="password"
            name="confirm"
            required
            placeholder="Repeat password"
            className="w-full px-4 py-2 bg-white/10 text-white placeholder-gray-300 rounded-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm"
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition duration-200"
      >
        {type === "login" ? "Login" : "Register"}
      </button>
    </form>
  );
}