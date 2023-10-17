"use client"; 

import LoginPage from "@/app/pages/login";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo";

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <LoginPage />
    </ApolloProvider>
  );
}
