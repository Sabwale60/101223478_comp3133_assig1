export const PORT = 8080;
export const JWT_SECRET = "secret";
export const environment = {
  development: {
    JWT_SECRET: JWT_SECRET,
    serverURL: `http://localhost:${PORT}/`,
    dbString:
      "mongodb+srv://saba1214:saba1214@cluster0.97jos.mongodb.net/101223478_comp3133_assig1?retryWrites=true&w=majority",
  },
  production: {
    JWT_SECRET: JWT_SECRET,
    serverURL: `http://localhost:${PORT}/`,
    dbString:
      "mongodb+srv://saba1214:saba1214@cluster0.97jos.mongodb.net/101223478_comp3133_assig1?retryWrites=true&w=majority",
  },
};
