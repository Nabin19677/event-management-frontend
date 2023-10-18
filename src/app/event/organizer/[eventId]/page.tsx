"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_EVENT_ORGANIZER_MUTATION } from "@/graphql/event_organizer";
import { GET_USERS_QUERY } from "@/graphql/user";
import { GET_EVENT_ROLES_QUERY } from "@/graphql/event";

export default function AddOrganizer({ params }: any) {
  const router = useRouter();

  const { eventId } = params;
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");

  const [
    addOrganizer,
    { loading: createEventOrganizerLoading, error: createEventOrganizerError },
  ] = useMutation(CREATE_EVENT_ORGANIZER_MUTATION);
  const { loading: userLoading, data: usersQueryData } =
    useQuery(GET_USERS_QUERY);
  const { loading: eventRolesLoading, data: eventRolesQueryData } =
    useQuery(GET_EVENT_ROLES_QUERY);


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await addOrganizer({
        variables: { eventId, userId: user, roleId: role },
      });

      if(data) {
        router.push(`/event/${eventId}`)
      }
    } catch (error: any) {
      console.error("Register failed:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Add New Organizer</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label
            htmlFor="user"
            className="block text-sm font-medium text-gray-700"
          >
            User:
          </label>
          <select
            id="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            defaultValue={""}
            className="block w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          >
             <option value="">Select a user</option>
            {usersQueryData?.users.map((user : any) => (
              <option key={user.userId} value={user.userId}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="user"
            className="block text-sm font-medium text-gray-700"
          >
            Role:
          </label>
          <select
            id="role"
            value={role}
            defaultValue={""}
            onChange={(e) => setRole(e.target.value)}
            className="block w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">Select a role</option>
            {eventRolesQueryData?.events_roles.map((user : any) => (
              <option key={user.roleId} value={user.roleId}>
                {user.roleName}
              </option>
            ))}
          </select>
        </div>
      
        <button
          type="submit"
          disabled={createEventOrganizerLoading}
          className="w-full py-2 px-4 text-white bg-blue-500 rounded focus:outline-none"
        >
          Add Organizer
        </button>
        {createEventOrganizerError && (
          <p className="mt-2 text-red-500">
            Unable to add user as organizer : {createEventOrganizerError.message}
          </p>
        )}
      </form>
    </div>
  );
}
