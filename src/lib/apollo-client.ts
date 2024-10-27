// lib/apollo-client.js
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const createApolloClient = () => {
  const baseURL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: `${baseURL}/graphql`,
    }),
    cache: new InMemoryCache(),
  });
};

export const initializeApollo = (initialState: any = null) => {
  const _apolloClient = createApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  if (typeof window === "undefined") {
    return _apolloClient;
  }

  if (!("___apolloClient" in window)) {
    (window as any).___apolloClient = _apolloClient;
  }

  return (window as any).___apolloClient;
};
