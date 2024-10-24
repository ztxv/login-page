import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md space-y-8 bg-gray-800 p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-white">Welcome</h1>
        <div className="space-y-4">
          <Link href="/login" className="block w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-md transition duration-150 ease-in-out">
            Login
          </Link>
          <Link href="/signup" className="block w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition duration-150 ease-in-out">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}
