import { useQuery } from "@apollo/client";
import Link from "next/link";
import { GET_EVENT_ATTENDEES_BY_EVENT_QUERY } from "@/graphql/event_attendee";

export default function Attendees({ eventId, role }: any) {
  const { loading, error, data } = useQuery(
    GET_EVENT_ATTENDEES_BY_EVENT_QUERY,
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
              Event Attendees
            </h3>
          </div>
        </div>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Phone Number</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {data?.getEventAttendees?.map((item: any, idx: any) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.userId.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                  {item.userId.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                  {item.userId.phoneNumber}
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
