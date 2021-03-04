const { ApolloServer, gql } = require("apollo-server")

const books = [
    {
        id: 1,
        name: "Apollo Server",
        author: "Facebook"
    },
    {
        id: 2,
        name: "Introduction Go",
        author: "Ryan"
    },
]

const folks = [
    {
        id: 1,
        name: "Matheus",
        surname: "Gomes"
    }
]

const typeDefs = gql`
    type Book {
        id: ID
        name: String
        author: String
    }

    type People {
        id: ID!
        name: String!
        surname: String
    }

    type Query {
        books: [Book!]!
        people: [People!]!
    }

    type Mutation {
        addBook(name: String, author: String): Book!
        addPeople(name: String, surname: String): People!
    }
`

const resolvers = {
    Query: {
        books: () => books,
        people: () => folks
    },
    Mutation: {
        addBook(_, { name, author }) {
            let book = {
                id: 3,
                name,
                author
            }
            books.push(book)

            return book
        },
        addPeople(_, { name, surname }) {
            let newPeople = {
                id: 3,
                name,
                surname
            }

            folks.push(newPeople)

            return newPeople
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen()