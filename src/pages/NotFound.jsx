import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center text-white">
      <h1 className="text-6xl font-bold text-[#6c63ff] mb-4">404</h1>
      <p className="text-xl text-[#aaaaaa] mb-8">Page not found</p>
      <Link
        to="/"
        className="px-6 py-2 bg-[#6c63ff] hover:bg-[#574fd6] rounded-lg transition-colors duration-200"
      >
        Go Home
      </Link>
    </div>
  );
};
export default NotFound;
