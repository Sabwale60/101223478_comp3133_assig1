const mongoose = require("mongoose");

export const listingSchema = new mongoose.Schema({
  listing_id: {
    type: String,
  },
  listing_title: {
    type: String,
  },
  description: {
    type: String,
  },
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  postal_code: {
    type: String,
  },
  price: {
    type: Number,
  },
  email: {
    type: String,
  },
  username: {
    type: String,
  },
});


export const listingUserSchema = new mongoose.Schema({
  listing_id: {
    type: String,
  },
  booking_id: {
    type: String,
  },
  booking_date: {
    type: String,
  },
  booking_start: {
    type: String,
  },
  booking_end: {
    type: String,
  },
  username: {
    type: String,
  },
});
