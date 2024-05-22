import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const postResolvers = {
    Query: {
        // GET ALL POSTS
        async getAllPosts() {
            try {
                const postsDataBase = await prisma.post.findMany();
                return postsDataBase;
            } catch (err) {
                throw new Error(String(err));
            }
        },
        // GET POST BY ID
        async getSinglePost(_, { postId }) {
            try {
                const postDataBase = await prisma.post.findUnique({
                    where: {
                        id: postId,
                    }
                });
                return postDataBase;
            } catch (err) {
                throw new Error(String(err));
            }
        }
    },
    Mutation: {
        // DELETE POST BY ID
        async deleteSinglePost(_, { postId }) {
            try {
                const postDataBase = await prisma.post.delete({
                    where: {
                        id: postId,
                    }
                });
                return postDataBase;
            } catch (err) {
                throw new Error(String(err));
            }
        }
    }
};

export { postResolvers };