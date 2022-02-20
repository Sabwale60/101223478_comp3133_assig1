module.exports = {
    projects: {
        app: {
            schema: ["./src/data/schema.js","./src/data/resolvers.js"],
            documents: ["./src/**/*.{graphql,js,ts,jsx,tsx}"],
        }
    }
}