const { gql } = require('apollo-server');

const typeDefs = gql`
    # Your schema will go here
    scalar Date

    type Query {
        categories: [Category!]!
        transactions: [Transaction!]!
        me: User
    }

    type Mutation {
        createCategory(name: String!): Category
        uploadTransactions(file: Upload!): TransactionUploadResponse
        login(email: String): String
    }
    
    type Category {
        id: String!
        name: String!
    }

    type Transaction {
        id: String!
        date: Date!
        memo: String!
        payee: String!
        inflow: String!
        outflow: String!
        isBankTransaction: Boolean!
        isInflowForBudgeting: Boolean!
        category: Category
    }
    
    type TransactionUploadResponse {
        amountSuccessful: Int
        amountDuplicate: Int
        amountFaulty: Int
    }
    
    type User {
        id: ID!
        email: String!
    }
`;

module.exports = typeDefs;