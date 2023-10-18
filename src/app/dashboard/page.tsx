"use client";

import { useQuery } from "@apollo/client";
import { ORGANIZER_EVENTS_QUERY } from "../../graphql/event";
import Link from "next/link";
import moment from "moment";

export default function DashboardPage() {
  const { loading, error, data } = useQuery(ORGANIZER_EVENTS_QUERY);

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-5">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Events
          </h3>
          <p className="text-gray-600 mt-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
        <div className="mt-3 md:mt-0">
          <Link
            href="/event"
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
            Add Event
          </Link>
        </div>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Location</th>
              <th className="py-3 px-6">Start Date</th>
              <th className="py-3 px-6">End Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {data.organized_events?.map((item: any, idx: any) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    href="/event/[id]"
                    as={`/event/${item.eventId}`}
                    className="text-blue-500 hover:underline hover:text-blue-700"
                  >
                    {item.name}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.location}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {moment(item.startDate).format("LL")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {moment(item.endDate).format("LL")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
