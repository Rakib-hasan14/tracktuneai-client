'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Image from 'next/image';

import loginImage from '../../public/login.jpg'; // Adjust the path as needed
import { loginUser } from '@/utils/rest-api/login'; // Your login API function

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await loginUser(form); // Expecting response.token

      setStatus({ type: 'success', message: 'Login successful!' });

      
      Cookies.set('token', response.token, { expires: 1 });
      router.push('/');
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Login failed.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(() => setStatus({ type: '', message: '' }), 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Form Section */}
      <div className="flex flex-col justify-center px-8 md:px-16 py-12 bg-white">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6">Login to TrackTune AI</h1>

        {status.message && (
          <div
            className={`px-4 py-3 rounded relative mb-4 border ${
              status.type === 'success'
                ? 'bg-green-100 border-green-400 text-green-700'
                : 'bg-red-100 border-red-400 text-red-700'
            }`}
            role="alert"
          >
            <strong className="font-bold">
              {status.type === 'success' ? 'Success! ' : 'Error! '}
            </strong>
            <span className="block sm:inline">{status.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              disabled={loading}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password *</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              disabled={loading}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>

      {/* Image Section */}
      <div className="hidden md:block relative">
        <Image
          src={loginImage}
          alt="Login Illustration"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
