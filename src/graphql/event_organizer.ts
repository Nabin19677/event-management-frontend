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

export const ADD_EVENT_EXPENSE_MUTATION = gql`
  mutation CreateEventExpense($eventId: Int!, $itemName : String!, $cost: Float!, $description: String!, $categoryId: Int!) {
    createEventExpense(
      eventId: $eventId
      input: { 
        eventId: $eventId, 
        itemName: $itemName, 
        cost: $cost, 
        description: $description, 
        categoryId: $categoryId
      }
    )
  }
`;

export const GET_EVENT_EXPENSES_BY_CATEGORY_QUERY = gql`
  query GetEventExpensesByCategory($eventId: Int!) {
    getEventExpensesByCategory(eventId: $eventId) {
      categoryName,
      totalCost
    }
  }
`;


export const GET_EVENT_EXPENSES_CATEGORIES_QUERY = gql`
  query GetEventExpensesCategories {
    events_expense_categories {
      categoryId,
      categoryName
    }
  }
`;
