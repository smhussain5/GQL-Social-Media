import { userResolvers } from "./userResolvers";
import { postResolvers } from "./postResolvers";
import { replyResolvers } from "./replyResolvers";

const resolvers = {
    Query: {
        ...userResolvers.Query,
        ...postResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...replyResolvers.Mutation
    }
};

export { resolvers };