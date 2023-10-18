
import { GET_EVENT_SESSIONS_BY_EVENT_QUERY } from "@/graphql/event_session";
import { useQuery } from "@apollo/client";
import Link from "next/link";

export default function Sessions({ eventId, role }: any) {
  const { loading, error, data } = useQuery(
    GET_EVENT_SESSIONS_BY_EVENT_QUERY,
    {
      variables: {
        eventId,
      },
    }
  );

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <section className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-5">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Event Sessions
            </h3>
          </div>
          {["Admin", "Contributor"].includes(role) && (
            <div className="mt-3 md:mt-0">
              <Link
                href={`/event/sessions/${eventId}`}
                className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
              >
                Add New Session
              </Link>
            </div>
          )}
        </div>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Session Name</th>
                <th className="py-3 px-6">Start Time</th>
                <th className="py-3 px-6">End Time</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {data?.getEventSessions?.map((item: any, idx: any) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.startTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.endTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
