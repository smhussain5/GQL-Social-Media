import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const userResolvers = {
    Query: {
        async getUsers() {
            try {
                const users = await prisma.user.findMany();
                return users;
            } catch (err) {
                throw new Error(String(err));
            }
        }
    },
};

export { userResolvers };