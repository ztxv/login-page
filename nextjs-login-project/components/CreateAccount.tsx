'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateAccount() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(email)
  }

  const validatePassword = (password: string) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return re.test(password)
  }

  const sanitizeInput = (input: string) => {
    return input.replace(/[<>&'"]/g, '')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    const sanitizedUsername = sanitizeInput(username)
    const sanitizedEmail = sanitizeInput(email)

    if (!validateEmail(sanitizedEmail)) {
      setMessage('Please enter a valid email address')
      return
    }

    if (!validatePassword(password)) {
      setMessage('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character')
      return
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
      return
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: sanitizedUsername, email: sanitizedEmail, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Account created successfully!')
        setTimeout(() => {
          router.push('/login')
        }, 1500)
      } else {
        setMessage(data.message || 'Error creating account')
      }
    } catch (error) {
      console.error('Error:', error)
      setMessage('An error occurred. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-pink-500">Locally Hosted</h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-gray-800 p-8 rounded-lg shadow-md">
          <div className="space-y-2 text-white">
            <h2 className="text-3xl font-bold">Create an Account</h2>
            <p className="text-gray-400">Sign up to get started with our service</p>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-700 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-700 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-700 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-700 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>
          {message && (
            <div className={`text-center ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-md transition duration-150 ease-in-out"
          >
            Sign Up
          </button>
          <div className="text-center">
            <p className="text-sm text-gray-400">
              Already Have An Account?{' '}
              <a href="/login" className="font-medium text-pink-500 hover:text-pink-400">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
