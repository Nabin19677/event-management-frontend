import { gql } from "@apollo/client";

export const CREATE_EVENT_ATTENDEE_MUTATION = gql`
  mutation CreateEventAttendee($eventId: Int!, $userId: Int!) {
    createEventAttendee(
      eventId: $eventId
      input: { eventId: $eventId, userId: $userId }
    )
  }
`;

export const GET_EVENT_ATTENDEES_BY_EVENT_QUERY = gql`
  query GetEventAttendees($eventId: Int!) {
    getEventAttendees(eventId: $eventId) {
      eventAttendeeId,
      eventId {
        name
      },
      userId {
        name,
        email,
        phoneNumber
      }
    }
  }
`;
