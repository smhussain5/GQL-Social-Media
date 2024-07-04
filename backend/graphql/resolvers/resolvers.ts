import { userResolvers } from "./userResolvers";
import { postResolvers } from "./postResolvers";
import { replyResolvers } from "./replyResolvers";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const resolvers = {
    Reply: {
        user: async (parent) => {
            try {
                const userDataBase = await prisma.user.findUnique(
                    {
                        where: {
                            id: parent.userId,
                        }
                    }
                );
                return userDataBase;
            } catch (err) {
                throw new Error(String(err));
            }
        }
    },
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