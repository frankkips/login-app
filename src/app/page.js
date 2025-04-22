
import Link  from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      <h1 className="text-3xl font-bold">Welcome To Home Page</h1>
      <div className="flex space-x-4">
        <Link href="/register">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Register
          </button>
        </Link>
        <Link href="/login">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}

