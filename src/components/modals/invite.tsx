import {
  CREATE_EVENT_ATTENDEE_MUTATION,
  GET_EVENT_ATTENDEES_BY_EVENT_QUERY,
} from "@/graphql/event_attendee";
import { GET_USERS_QUERY } from "@/graphql/user";
import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#react_modal"); // Set the root element for the modal

function InviteModal({ isOpen, onRequestClose, eventId }: any) {
  const { data: usersQueryData } = useQuery(GET_USERS_QUERY);

  const [invite] = useMutation(CREATE_EVENT_ATTENDEE_MUTATION, {
    refetchQueries: [
      {
        query: GET_EVENT_ATTENDEES_BY_EVENT_QUERY,
        variables: {
          eventId,
        },
      },
    ],
  });

  const handleInviteClick = (user: any) => {
    handleInvitation(user.userId);
  };

  const handleInvitation = async (userId: number) => {
    try {
      const { data } = await invite({ variables: { eventId, userId } });
    } catch (error: any) {
      console.error("Register failed:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Invite Users"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {usersQueryData?.users.map((user: any, index: number) => (
          <div key={index} className="bg-white shadow-md rounded p-4">
            <h3 className="text-xl font-semibold">{user.name}</h3>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">Phone Number: {user.phoneNumber}</p>
            <button
              onClick={() => handleInviteClick(user)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Invite
            </button>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default InviteModal;
