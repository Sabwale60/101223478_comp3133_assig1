import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID
    username: String
    firstname: String
    lastname: String
    password: String
    email: String
    type: String
  }

  input UserInput {
    username: String!
    firstname: String!
    lastname: String!
    password: String!
    email: String!
    type: String!
  }

  input UserLoginInput {
    username: String!
    password: String!
  }
  type Query {
    getAllListings: [Listing]
    getCurrentAdminListings: [Listing]
    getCurrentUserBookings: [UserListing]
    searchListings(search: String): [Listing]
    getAllUserListings: [UserListing]
  }

  input CreateListingInput {
    listing_id: String!
    listing_title: String!
    description: String!
    street: String!
    city: String!
    postal_code: String!
    price: Float!
    email: String!
    username: String!
  }

  input CreateUserListingInput {
    listing_id: String!
    booking_id: String!
    booking_date: String!
    booking_start: String!
    booking_end: String!
    username: String!
  }

  type UserListing {
    id: ID
    listing_id: String
    booking_id: String
    booking_date: String
    booking_start: String
    booking_end: String
    username: String
  }

  type Listing {
    id: ID
    listing_id: String
    listing_title: String
    description: String
    street: String
    city: String
    postal_code: String
    price: Float
    email: String
    username: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    createUserListing(input: CreateUserListingInput): UserListing
    createListing(input: CreateListingInput): Listing
    createUser(input: UserInput): AuthPayload!
    loginUser(input: UserLoginInput): AuthPayload!
  }
`;
