"use client"; 

import LoginPage from "./pages/login";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo";
import SignupPage from "./pages/signup";

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <SignupPage />
    </ApolloProvider>
  );
}
