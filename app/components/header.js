
export default function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-white text-2xl font-bold">
          <a href="/">TrackTune AI</a>
        </div>

        {/* Auth Buttons */}
        <div className="space-x-4">
          <a
            href="/login"
            className="bg-white text-indigo-600 hover:bg-indigo-100 font-semibold py-2 px-4 rounded-full transition duration-300"
          >
            Login
          </a>
          <a
            href="/register"
            className="bg-indigo-700 text-white hover:bg-indigo-800 font-semibold py-2 px-4 rounded-full transition duration-300"
          >
            Register
          </a>
        </div>
      </div>
    </header>
  );
}
