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