const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

const axios = require('axios');

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
    }
    type Event {
        id: ID!
        title: String
        desc: String
        date: String
        from: String
        to: String
        location_id: ID!
        user_id: ID!
        user: User!
        location: Location!
        participant: Participant!
    }
    type Location {
        id: ID!
        name: String
        desc: String
        lat: Float
        lng: Float
    }
    type Participant {
        id: ID!
        user_id: ID!
        event_id: ID!
    }
    type Query {
        events: [Event!]
        event(id: ID): Event!
        users: [User!]
        user(id: ID): User!
        locations: [Location!]!
        location(id: ID): Location!
        participants: [Participant!]
        participant(id: ID): Participant!
    }
`;

const resolvers = {
    Query: {
        users: () => {
            return axios.get('http://localhost:3000/users/').then(res => res.data);       
        },
        user: (parent, args) => {
            const data = axios.get('http://localhost:3000/users/'+ args.id).then(res => res.data);
            return data; 
        },
        events: () => {
            return axios.get('http://localhost:3000/events/').then(res => res.data);            
        },
        event: (parent, args) => {
            const data = axios.get('http://localhost:3000/events/'+ args.id).then(res => res.data);
            return data; 
        },
        
        locations: () => {
            return axios.get('http://localhost:3000/locations/').then(res => res.data)
        },
        location: (parents, args) => {
            const data = axios.get('http://localhost:3000/locations/'+ args.id).then(res => res.data);
            return data; 
        },
        participants: () => {
            return axios.get('http://localhost:3000/participants/').then(res => res.data)
        },
        participant: (parents, args) => {
            const data = axios.get('http://localhost:3000/participants/'+ args.id).then(res => res.data);
            return data; 
        },
    },
    Event: {
        user: (parent,args) => {
            return axios.get('http://localhost:3000/users/' + parent.user_id).then(res => res.data);
        },
        location: (parent, args) => {
            return axios.get('http://localhost:3000/locations/' + parent.location_id).then(res => res.data);
        },
        participant: (parent, args) => {
            return axios.get('http://localhost:3000/participants/' + parent.id).then(res => res.data);
        }
    },
}


const server = new ApolloServer({
    typeDefs, 
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground({}),
    ]
});

server.listen().then(({ url }) => console.log(`GraphQL apollo server up at ${url}`));