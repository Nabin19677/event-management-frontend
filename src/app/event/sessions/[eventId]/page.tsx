"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import {
  CREATE_EVENT_SESSION_MUTATION,
  GET_EVENT_SESSIONS_BY_EVENT_QUERY,
} from "@/graphql/event_session";

export default function AddSessionPage({ params }: any) {
  const router = useRouter();

  const { eventId } = params;
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [
    addSession,
    { loading: createEventSessionLoading, error: createEventSessionError },
  ] = useMutation(CREATE_EVENT_SESSION_MUTATION, {
    refetchQueries: [
      {
        query: GET_EVENT_SESSIONS_BY_EVENT_QUERY,
        variables: {
          eventId,
        },
      },
    ],
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await addSession({
        variables: { eventId, name, startTime, endTime },
      });

      if (data) {
        router.push(`/event/${eventId}`);
      }
    } catch (error: any) {
      console.error("Register failed:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Add New Session</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Start:
          </label>
          <input
            type="datetime-local"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="block w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            End:
          </label>
          <input
            type="datetime-local"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="block w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <button
          type="submit"
          disabled={createEventSessionLoading}
          className="w-full py-2 px-4 text-white bg-blue-500 rounded focus:outline-none"
        >
          Add Session
        </button>
        {createEventSessionError && (
          <p className="mt-2 text-red-500">
            Unable to add user as organizer : {createEventSessionError.message}
          </p>
        )}
      </form>
    </div>
  );
}
