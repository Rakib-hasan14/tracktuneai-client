import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-center px-6">
      <h1 className="text-7xl font-extrabold text-indigo-600 mb-4">404</h1>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Not Found</h2>
      <p className="text-lg text-gray-600 mb-6">
        Could not find the requested resource.
      </p>
      <Link
        href="/"
        className="bg-indigo-600 text-white px-6 py-3 rounded-full font-medium hover:bg-indigo-700 transition duration-300"
      >
        Return Home
      </Link>
    </div>
  );
}
