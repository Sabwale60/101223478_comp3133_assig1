import { Users, Listings, UserListings } from "../db/dbConnector.js";
import { validateEmail, checkPassword } from "../../utils/utils.js";
import { checkUserNameUnique, loginUser } from "../db/dbHelper.js";
import { JWT_SECRET } from "../../config/config.js";
import jsonwebtoken from "jsonwebtoken";
/**
 * GraphQL Resolvers
 **/

export const resolvers = {
  Query: {
    searchListings: (root, { search }) => {
      return new Promise((resolve, reject) => {
        Listings.aggregate(
          [
            {
              $match: {
                $or: [
                  { listing_title: search },
                  { city: search },
                  { postal_code: search },
                ],
              },
            },
          ],
          (err, listing) => {
            if (err) reject(err);
            else resolve(listing);
          }
        );
      });
    },
    getAllUserListings: (root, args, { user }) => {
      if (!user) throw new Error("You are not authenticated!");
      return new Promise((resolve, reject) => {
        UserListings.find((err, listings) => {
          if (err) reject(err);
          else resolve(listings);
        });
      });
    },
    getCurrentUserBookings: (root, args, { user }) => {
      if (!user) throw new Error("You are not authenticated!");
      return new Promise((resolve, reject) => {
        UserListings.find({ username: user.username }, (err, listings) => {
          if (err) reject(err);
          else resolve(listings);
        });
      });
    },
    getCurrentAdminListings: (root, args, { user }) => {
      if (!user) throw new Error("You are not authenticated!");
      if (user.type !== "admin") {
        throw new Error("Only Admin can see listing.");
      }
      return new Promise((resolve, reject) => {
        Listings.find({ username: user.username }, (err, listings) => {
          if (err) reject(err);
          else resolve(listings);
        });
      });
    },
    getAllListings: (root, args) => {
      
      return new Promise((resolve, reject) => {
        Listings.find((err, listings) => {
          if (err) reject(err);
          else resolve(listings);
        });
      });
    },
  },
  Mutation: {
    createUserListing: async (root, { input }, { user }) => {
      if (!user) throw new Error("You are not authenticated!");
      if (
        !input.listing_id ||
        !input.username ||
        !input.booking_id ||
        !input.booking_date ||
        !input.booking_start ||
        !input.booking_end
      ) {
        throw new Error("All Fields are required.");
      }

      const loggedInUser = await checkUserNameUnique(input.username);
      if (!loggedInUser) {
        throw new Error("Please enter valid username.");
      }
      if (user.type !== "customer") {
        throw new Error("Only customer can book listing.");
      }
      const newListing = new UserListings({
        listing_id: input.listing_id,
        booking_id: input.booking_id,
        booking_date: input.booking_date,
        booking_start: input.booking_start,
        booking_end: input.booking_end,
        username: input.username,
      });

      newListing.id = newListing._id;

      return new Promise((resolve, reject) => {
        newListing.save((err) => {
          if (err) reject(err);
          else resolve(newListing);
        });
      });
    },
    createListing: async (root, { input }, { user }) => {
      if (!user) throw new Error("You are not authenticated!");
      if (user.type !== "admin") {
        throw new Error("Only admin can create listing.");
      }

      if (
        !input.listing_id ||
        !input.listing_title ||
        !input.description ||
        !input.email ||
        !input.street ||
        !input.city ||
        !input.postal_code ||
        !input.price ||
        !input.username
      ) {
        throw new Error("All Fields are required.");
      } else if (!validateEmail(input.email)) {
        throw new Error("Please enter a valid email address.");
      }

      const newListing = new Listings({
        listing_id: input.listing_id,
        listing_title: input.listing_title,
        description: input.description,
        street: input.street,
        city: input.city,
        postal_code: input.postal_code,
        price: input.price,
        email: input.email,
        username: input.username,
      });

      newListing.id = newListing._id;

      return new Promise((resolve, reject) => {
        newListing.save((err) => {
          if (err) reject(err);
          else resolve(newListing);
        });
      });
    },
    createUser: async (root, { input }) => {
      if (
        !input.username ||
        !input.firstname ||
        !input.lastname ||
        !input.email ||
        !input.password ||
        !input.type
      ) {
        throw new Error("All Fields are required.");
      } else if (!validateEmail(input.email)) {
        throw new Error("Please enter a valid email address.");
      }
      const passwordNotApproved = checkPassword(input.password);
      if (passwordNotApproved) {
        throw new Error(passwordNotApproved);
      }
      const isUnique = await checkUserNameUnique(input.username);

      if (isUnique) {
        throw new Error("Username already existing.");
      }

      const newUser = new Users({
        username: input.username,
        firstname: input.firstname,
        lastname: input.lastname,
        email: input.email,
        password: input.password,
        type: input.type,
      });

      newUser.id = newUser._id;

      const savedUser = await newUser.save();
      // return jwt
      const token = jsonwebtoken.sign(
        {
          userId: savedUser.id,
          email: savedUser.email,
          username: savedUser.username,
        },
        JWT_SECRET,
        { expiresIn: "1d" }
      );
      return {
        token,
        user: savedUser,
      };
    },
    loginUser: async (root, { input }) => {
      const user = await loginUser(input.username, input.password);
      if (!user) {
        throw new Error("Username does not exists");
      }
      // return jwt
      const token = jsonwebtoken.sign(
        {
          userId: user.id,
          username: user.username,
          type: user.type,
        },
        JWT_SECRET,
        { expiresIn: "1d" }
      );
      return {
        user,
        token,
      };
    },
  },
};
