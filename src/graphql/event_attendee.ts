import { gql } from "@apollo/client";



export const CREATE_EVENT_ATTENDEE_MUTATION = gql`
  mutation CreateEventAttendee($eventId: Int!, $userId: Int!) {
    createEventAttendee(
      eventId: $eventId
      input: { eventId: $eventId, userId: $userId }
    )
  }
`;