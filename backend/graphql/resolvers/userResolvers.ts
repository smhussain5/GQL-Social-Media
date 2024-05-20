import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const userResolvers = {
    Query: {
        // GET ALL USERS
        async getAllUsers() {
            try {
                const users = await prisma.user.findMany();
                return users;
            } catch (err) {
                throw new Error(String(err));
            }
        },
        // GET USER BY ID
        async getSingleUser(_, { userId }) {
            try {
                const user = await prisma.user.findUnique(
                    {
                        where: {
                            id: userId,
                        }
                    }
                );
                return user;
            } catch (err) {
                throw new Error(String(err));
            }
        }
    },
};

export { userResolvers };