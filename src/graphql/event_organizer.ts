import { gql } from "@apollo/client";



export const CREATE_EVENT_ORGANIZER_MUTATION = gql`
  mutation createEventOrganizer($eventId: Int!, $userId: Int!, $roleId: Int!) {
    createEventOrganizer(eventId: $eventId, input : {
        eventId : $eventId,
        userId : $userId,
        roleId : $roleId,
    })
  }
`;