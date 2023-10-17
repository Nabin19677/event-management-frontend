"use client"; 

import { FormEvent, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT_ORGANIZER_MUTATION } from '@/graphql/event_organizer';

export default function AddOrganizer({params} : any) {
  const {eventId} = params;
  const [user, setUser] = useState('');
  const [role, setRole] = useState('');;

  const [addOrganizer, { loading, error }] = useMutation(CREATE_EVENT_ORGANIZER_MUTATION);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const  {data} =  await addOrganizer({ variables: { eventId, userId: user, roleId: role } })

    } catch (error : any) {
      console.error('Register failed:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Add New Organizer</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="user" className="block text-sm font-medium text-gray-700">User:</label>
          <input
            type="user"
            id="name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="block w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role:</label>
          <input
            type="text"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="block w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
     
        <button type="submit" disabled={loading} className="w-full py-2 px-4 text-white bg-blue-500 rounded focus:outline-none">
          Add Organizer
        </button>
        {error && <p className="mt-2 text-red-500"> Unable to register user : {error.message }</p>}
      </form>

    </div>
  );
}