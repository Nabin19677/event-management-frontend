import { ORGANIZER_EVENTS_QUERY } from "@/graphql/event";
import { GET_EVENT_ORGANIZERS_BY_EVENT_QUERY } from "@/graphql/event_organizer";
import { useQuery } from "@apollo/client";
import Link from "next/link";

export default function Organizers({ eventId }: any) {
  const { loading, error, data } = useQuery(
    GET_EVENT_ORGANIZERS_BY_EVENT_QUERY,
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
              Event Organizer's
            </h3>
          </div>
          <div className="mt-3 md:mt-0">
            <Link
              href={`/event/organizer/${eventId}`}
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
            >
              Add New Organizer
            </Link>
          </div>
        </div>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">User Name</th>
                <th className="py-3 px-6">Role</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {data.getEventOrganizers.map((item: any, idx: any) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.userId.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.roleId.roleName}
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
