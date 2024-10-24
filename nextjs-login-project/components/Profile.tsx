'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Profile() {
  const [username, setUsername] = useState('')
  const router = useRouter()

  useEffect(() => {
    const storedUsername = localStorage.getItem('username')
    if (!storedUsername) {
      router.push('/login')
    } else {
      setUsername(storedUsername)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    router.push('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md space-y-8 bg-gray-800 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-white text-center">Profile</h1>
        <p className="text-xl text-gray-300 text-center">Welcome, {username}!</p>
        <button
          onClick={handleLogout}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-md transition duration-150 ease-in-out"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
