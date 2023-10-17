"use client"; 

import { FormEvent, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { LOGIN_MUTATION } from '@/app/graphql/user';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await login({ variables: { email, password } });

      if (data.login.authToken.accessToken) {
        localStorage.setItem("TOKEN", data.login.authToken.accessToken)
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={handleLogin} className="mt-4">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button type="submit" disabled={loading} className="w-full py-2 px-4 text-white bg-blue-500 rounded focus:outline-none">
          Login
        </button>
        {error && <p className="mt-2 text-red-500">Invalid email or password.</p>}
      </form>
    </div>
  );
}