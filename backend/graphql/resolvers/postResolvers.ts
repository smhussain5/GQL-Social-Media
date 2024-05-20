import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const postResolvers = {
    Query: {
        async getPosts() {
            try {
                const posts = await prisma.post.findMany();
                return posts;
            } catch (err) {
                throw new Error(String(err));
            }
        }
    }
};

export { postResolvers };