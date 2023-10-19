"use client";

import { useQuery } from "@apollo/client";
import { GET_EVENT_DETAIL_QUERY } from "@/graphql/event";
import Link from "next/link";
import Organizers from "./organizers";
import Sessions from "./sessions";
import { useState } from "react";
import InviteModal from "@/components/modals/invite";
import Expenses from "./expenses";

export default function EventDetailPage({ params }: any) {
  const { id } = params;

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const { loading, error, data } = useQuery(GET_EVENT_DETAIL_QUERY, {
    variables: {
      eventId: id,
    },
  });

  if (loading) {
    return <>Loading...</>;
  }

  if (!data || !data.getEventDetail) {
    return <div>Not invited to this event.</div>;
  }

  const { getEventDetail: detail } = data;

  return (
    <>
      <section className="py-14">
        <div className="max-w-screen-xl mx-auto md:px-8">
          <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
            <div className="flex-1 sm:hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                className="md:max-w-lg sm:rounded-lg"
                alt=""
              />
            </div>
            <div className="max-w-xl px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
              <div className="text-left">
                <h3 className="text-indigo-600 font-semibold">
                  {detail.event.location}
                  {detail.role === "Admin" && (
                    <Link
                      href="/event/[id]/edit"
                      as={`/event/${id}/edit`}
                      className="text-blue-500 hover:underline hover:text-blue-700 ml-4"
                    >
                      Edit
                    </Link>
                  )}
                  {detail.role === "Contributor" && (
                    <button
                      onClick={() => {
                        setIsInviteModalOpen(true);
                      }}
                      className="hover:text-blue-600 cursor-pointer ml-4"
                    >
                      Invite
                    </button>
                  )}
                </h3>
              </div>

              <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                {detail.event.name}
              </p>
              <p className="mt-3 text-gray-600">{detail.event.description}</p>
            </div>
          </div>
        </div>
      </section>

      {detail.role === "Admin" && <Organizers eventId={id} />}

      <Sessions eventId={id} role={detail.role} />

      {["Admin", "Contributor"].includes(detail.role) && (
        <Expenses eventId={id} role={detail.role} />
      )}

      <InviteModal
        isOpen={isInviteModalOpen}
        onRequestClose={() => setIsInviteModalOpen(false)}
        eventId={id}
      />
    </>
  );
}
