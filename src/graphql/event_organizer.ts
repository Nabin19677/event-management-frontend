import { gql } from "@apollo/client";

export const CREATE_EVENT_ORGANIZER_MUTATION = gql`
  mutation createEventOrganizer($eventId: Int!, $userId: Int!, $roleId: Int!) {
    createEventOrganizer(
      eventId: $eventId
      input: { eventId: $eventId, userId: $userId, roleId: $roleId }
    )
  }
`;

export const DELETE_EVENT_ORGANIZER_MUTATION = gql`
  mutation DeleteEventOrganizer($eventId: Int!, $eventOrganizerId: Int!) {
    deleteEventOrganizer(
      eventId: $eventId
      eventOrganizerId: $eventOrganizerId
    )
  }
`;

export const GET_EVENT_ORGANIZERS_BY_EVENT_QUERY = gql`
  query GetEventOrganizersByEvent($eventId: Int!) {
    getEventOrganizers(eventId: $eventId) {
      eventOrganizerId,
      eventId {
        eventId
      },
      userId {
        userId,
        name
      },
      roleId {
        roleName
      }
    }
  }
`;
