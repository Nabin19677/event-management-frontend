"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_EVENT_EXPENSE_MUTATION,
  GET_EVENT_EXPENSES_BY_CATEGORY_QUERY,
  GET_EVENT_EXPENSES_CATEGORIES_QUERY,
} from "@/graphql/event_organizer";

export default function AddExpenses({ params }: any) {
  const router = useRouter();

  const { eventId } = params;
  const [itemName, setIemName] = useState("");
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [
    addExpense,
    { loading: createEventExpenseLoading, error: createEventExpenseError },
  ] = useMutation(ADD_EVENT_EXPENSE_MUTATION, {
    refetchQueries: [
      {
        query: GET_EVENT_EXPENSES_BY_CATEGORY_QUERY,
        variables: {
          eventId,
        },
      },
    ],
  });
  const { loading: categoriesLoading, data: categoriesData } = useQuery(
    GET_EVENT_EXPENSES_CATEGORIES_QUERY
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await addExpense({
        variables: {
          eventId,
          itemName,
          cost,
          description,
          categoryId: category,
        },
      });

      if (data) {
        router.push(`/event/${eventId}`);
      }
    } catch (error: any) {
      console.error("Register failed:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Add New Expense</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label
            htmlFor="itemName"
            className="block text-sm font-medium text-gray-700"
          >
            Item Name:
          </label>
          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={(e) => setIemName(e.target.value)}
            className="block w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="cost"
            className="block text-sm font-medium text-gray-700"
          >
            Cost:
          </label>
          <input
            type="number"
            id="cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="block w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description:
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="user"
            className="block text-sm font-medium text-gray-700"
          >
            Category:
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            defaultValue={""}
            className="block w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">Select a Category</option>
            {categoriesData?.events_expense_categories?.map((category: any) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={createEventExpenseLoading}
          className="w-full py-2 px-4 text-white bg-blue-500 rounded focus:outline-none"
        >
          Add Expense
        </button>
        {createEventExpenseError && (
          <p className="mt-2 text-red-500">
            Unable to add user as expense : {createEventExpenseError.message}
          </p>
        )}
      </form>
    </div>
  );
}
