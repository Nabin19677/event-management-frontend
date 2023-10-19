import { gql } from "@apollo/client";



export const GET_EVENT_SESSIONS_BY_EVENT_QUERY = gql`
  query getEventSessions($eventId: Int!) {
    getEventSessions(eventId: $eventId) {
        sessionId,
        name,
        startTime,
        endTime
    }
  }
`;

export const CREATE_EVENT_SESSION_MUTATION = gql`
  mutation CreateEventSesssion($eventId: Int!, $name: String!, $startTime: String!, $endTime: String!) {
    createEventSesssion(
      eventId: $eventId
      input: { eventId: $eventId, name: $name, startTime: $startTime, endTime: $endTime }
    )
  }
`;