import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './graphql/typeDefs'
import { resolvers } from './graphql/resolvers/resolvers'
import { makeExecutableSchema } from '@graphql-tools/schema'

const schema = makeExecutableSchema({
    resolvers,
    typeDefs,
});

async function startApolloServer() {
    const server = new ApolloServer({ schema });
    const { url } = await startStandaloneServer(server);
    console.log(`
    🚀 Server is running!
    🔎 Query at ${url}`
    );
}

startApolloServer();