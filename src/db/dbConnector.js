const mongoose = require("mongoose");
const { environment } = require("../../config/config");
const { userSchema } = require("./schema/userSchema.js");
const { listingSchema,listingUserSchema } = require("./schema/listingSchema.js");
const env = process.env.NODE_ENV || "development";

/**
 * Mongoose Connection
 **/

mongoose.connect(environment[env].dbString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;
db.on("error", () => {
  console.error("Error while connecting to DB");
});

const Users = mongoose.model("users", userSchema);
const Listings = mongoose.model("listings", listingSchema);
const UserListings = mongoose.model("bookings", listingUserSchema);

export {  Users,Listings,UserListings };
