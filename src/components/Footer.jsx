export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white text-center py-4 text-sm mt-8 flex items-center justify-center gap-2">
      <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text font-bold">&copy; 2025 </span>
      <span>
        <img
          src="/FitRace.png"
          alt="FitRace App Icon"
          className="w-6 h-6 inline-block rounded-full border-2 border-cyan-400"
        />
      </span>
      <span
        className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text font-bold"
      >
        FitRace
      </span>
      •
      <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text font-bold">Powered by Kishore.</span>
    </footer>
  );
}