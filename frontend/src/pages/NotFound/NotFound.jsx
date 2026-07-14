import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center text-center px-6">

      <h1 className="text-8xl font-extrabold text-blue-500">
        404
      </h1>

      <h2 className="text-4xl font-bold mt-6">
        Page Not Found
      </h2>

      <p className="text-slate-400 mt-4 max-w-md">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-10 bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-semibold transition"
      >
        🏠 Back to Home
      </button>

    </div>
  );
}

export default NotFound;