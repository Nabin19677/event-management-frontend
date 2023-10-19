"use client";

import { FormEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { GET_EVENT_DETAIL_QUERY, UPDATE_EVENT_MUTATION } from "@/graphql/event";

export default function UpdateEventPage({ params }: any) {
  const { id } = params;

  const router = useRouter();

  const { loading: eventDetailLoading, data : eventDetail } = useQuery(GET_EVENT_DETAIL_QUERY, {
    variables: {
      eventId: id,
    },
  });

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const [updateEvent, { loading, error }] = useMutation(UPDATE_EVENT_MUTATION, {
    refetchQueries : [
      {
        query : GET_EVENT_DETAIL_QUERY,
        variables : {
          eventId : id
        }
      }
    ]
  });


  useEffect(() => {
    if (!eventDetailLoading && eventDetail) {
      const { startDate, endDate, location, description } = eventDetail.getEventDetail.event;
      const formattedStartDate = new Date(startDate).toISOString().split('T')[0];
      setStartDate(formattedStartDate);
      const formattedEndDate = new Date(endDate).toISOString().split('T')[0];
      setEndDate(formattedEndDate);
      setLocation(location);
      setDescription(description);
    }
  }, [eventDetailLoading, eventDetail]);



  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await updateEvent({
        variables: { eventId : id, startDate, endDate, location, description },
      });

      if (data.updateEvent) {
        router.push(`/event/${id}`)
      }
    } catch (error: any) {
      console.error("Create Event failed:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Update Event</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
          Start Date:
        </label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="block w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
        <div className="mb-4">
        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
          End Date:
        </label>
        <input
          type="date"
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
            Unable to update event : {error.message}
          </p>
        )}
      </form>
    </div>
  );
}
