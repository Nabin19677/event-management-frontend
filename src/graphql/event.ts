import { gql } from "@apollo/client";


export const ORGANIZER_EVENTS_QUERY = gql`
    query GetOraganizedEvents {
        organized_events {
            eventId,
            name,
            location,
            description,
            startDate,
            endDate
        }
    }
`;

export const CREATE_EVENT_MUTATION = gql`
  mutation CreateEvent($name: String!, $startDate: String!, $endDate: String!, $location: String!,  $description: String!) {
    createEvent(input : {
        name : $name,
        startDate : $startDate,
        endDate : $endDate,
        location : $location,
        description : $description
    })
  }
`;

export const UPDATE_EVENT_MUTATION = gql`
  mutation UpdateEvent($eventId: Int!, $startDate: String!, $endDate: String!, $location: String!,  $description: String!) {
    updateEvent(eventId: $eventId, input : {
        startDate : $startDate,
        endDate : $endDate,
        location : $location,
        description : $description
    })
  }
`;

export const GET_EVENT_DETAIL_QUERY = gql`
  query GetEventDetail($eventId: Int!) {
    getEventDetail(eventId : $eventId){
      event {
        eventId,
        name,
        location,
        startDate,
        endDate,
        description
      },
      sessions {
        sessionId,
        name
      },
      role
    }
  }
`;

export const GET_EVENT_ROLES_QUERY = gql`
query GetEventRoles {
    events_roles {
      roleId
      roleName
    }
  }
`;