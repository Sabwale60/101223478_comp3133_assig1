# 101223478_comp3133_assig1

## Steps to run the application

```
   npm install
   npm start
```

# Queries And Mutations

# 1. Create a new User Profile (type = admin OR type = customer) (validate that All
# fields are mandatory)
```
mutation createUser{
  createUser(input:{
    username:"customer"
    firstname:"First"
    lastname:"Last"
    password:"test12132"
    email:"test@gmail.com"
    type:"customer"
  }){
    token
    user{
      username
    }
  }
}
```

# 2. Login API – Pass the username and password to validate the user to allow
# booking of any listing (both user and admin) (Optional: implement JWT token)
```
mutation login{
  loginUser(input:{
    username:"username"
    password:"test12132"
  }){
    token
    user{
      username
    }
  }
}
```
# 3. Create a new listing (Admin) (validate All fields are mandatory)
```
mutation createListing{
  createListing(input:{
    listing_id:"21212"
    listing_title:"1212"
    email:"test@gmail.com"
    username:"admin"
    street:"sdsd"
    city:"sd"
    description:"sdsd"
    price: 15.00
    postal_code:"23232"
  }){
    listing_id
  }
}
```

# 4. View all listings created by Admin
```
query getAllListings{
  getAllListings{
    listing_id
  }
}
```

# 5. Book listings as a User
```
mutation createUserListing{
createUserListing(input:{
  listing_id:"90902"
  booking_id:"32323"
  booking_end:"01-24-2022"
  booking_start:"01-24-2022"
  booking_date:"01-24-2022"
	username:"customer"
}){
  booking_id
}
}
```

# 6. Search listing by
# • Name
# • City / Postal code
```
query search{
  searchListings(search:"sd"){
    listing_id
  }
}
```
# 7. List all User bookings (Only when logged in as User)
```
query getCurrentUserBookings{
  getCurrentUserBookings{
    username
    booking_start
  }
}
```
# 8. View all listing added by Admin user (Only when logged in as Admin)
```
query getCurrentAdminListings{
  getCurrentAdminListings{
    username
    street
  }
}
```
