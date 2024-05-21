import { userResolvers } from "./userResolvers";
import { postResolvers } from "./postResolvers";

const resolvers = {
    Query: {
        ...userResolvers.Query,
        ...postResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation
    }
};

export { resolvers };