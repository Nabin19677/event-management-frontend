"use client"; 

import { FormEvent, useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(input : {email: $email, password: $password}) {
      authToken {
        accessToken
      }
    }
  }
`;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await login({ variables: { email, password } });

      // Assuming your API returns a token upon successful login
      if (data.login.token) {
        // Store the token in a secure way, such as in a cookie or local storage.
        // You can use a state management library for this as well.
        // Then, redirect to the dashboard or any protected page.
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