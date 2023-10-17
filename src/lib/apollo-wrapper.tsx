"use client"; 


import client from "@/lib/apollo";
import { ApolloProvider } from "@apollo/client";


export function ApolloWrapper({ children }: React.PropsWithChildren) {
return <ApolloProvider client={client}> {children} </ApolloProvider>
}