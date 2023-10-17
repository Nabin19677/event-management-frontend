"use client";

import { FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { CREATE_EVENT_MUTATION } from "../graphql/event";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const [createEvent, { loading, error }] = useMutation(CREATE_EVENT_MUTATION);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // await register({ variables: { name, email, phoneNumber, password } });
      const { data } = await createEvent({
        variables: { name, startDate, endDate, location, description },
      });

      if (data.createEvent) {
        router.push("/dashboard")
      }
    } catch (error: any) {
      console.error("Create Event failed:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Create Event</h1>
      <form onSubmit={handleLogin} className="mt-4">
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
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700"
          >
            Start Date:
          </label>
          <input
            type="text"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="block w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700"
          >
            End Date:
          </label>
          <input
            type="text"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="block w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location:
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="block w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description:
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 text-white bg-blue-500 rounded focus:outline-none"
        >
          Create
        </button>
        {error && (
          <p className="mt-2 text-red-500">
            {" "}
            Unable to register user : {error.message}
          </p>
        )}
      </form>
    </div>
  );
}
