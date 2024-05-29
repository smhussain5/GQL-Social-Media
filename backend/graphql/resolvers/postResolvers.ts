import { checkAuthentication } from '../../utils/checkAuthentication';
import { postValidationChecker } from '../../utils/validationChecker';
import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql';
const prisma = new PrismaClient();

const postResolvers = {
    Query: {
        // GET ALL POSTS
        async getAllPosts() {
            try {
                const postsDataBase = await prisma.post.findMany({
                    relationLoadStrategy: 'join',
                    include: {
                        user: true,
                        replies: true,
                        likedBy: true,
                    },
                });
                return postsDataBase;
            } catch (err) {
                throw new Error(String(err));
            }
        },
        // GET POST BY ID
        async getSinglePost(_, { postId }) {
            try {
                const postDataBase = await prisma.post.findUnique({
                    relationLoadStrategy: 'join',
                    include: {
                        user: true,
                        replies: true,
                        likedBy: true,
                    },
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
        // CREATE POST
        async createPost(_, { postInput: { body } }, context) {
            // CHECK IF PROPER AUTH
            const userViaAuthHeader = checkAuthentication(context);
            // VALIDATE VIA postValidationChecker() FUNCTION
            const { errors, valid } = postValidationChecker(body);
            if (!valid) {
                throw new GraphQLError("Errors!", { extensions: { errors } });
            }
            // STORE POST
            try {
                const postDataBase = await prisma.post.create({
                    relationLoadStrategy: 'join',
                    include: {
                        user: true,
                    },
                    data: {
                        body: body,
                        createdAt: new Date().toISOString(),
                        user: {
                            connect: {
                                id: userViaAuthHeader.id
                            }
                        }
                    }
                });
                return postDataBase;
            } catch (err) {
                throw new Error(String(err));
            }
        },
        // DELETE POST BY ID
        async deleteSinglePost(_, { postId }, context) {
            // CHECK IF PROPER AUTH
            const userViaAuthHeader = checkAuthentication(context)
            // DELETE POST
            try {
                const postDataBase = await prisma.post.findUnique({
                    where: {
                        id: postId,
                    }
                });
                if (postDataBase && postDataBase.userId === userViaAuthHeader.userId) {
                    await prisma.post.delete({
                        where: {
                            id: postId,
                        }
                    });
                    return "Successful!";
                }
            } catch (err) {
                throw new Error(String(err));
            }
        },
        async likePost(_, { postId }, context) {
            // CHECK IF PROPER AUTH
            const userViaAuthHeader = checkAuthentication(context)
            try {
                // CHECK IF POST EXISTS IN DATABASE
                const postDataBase = await prisma.post.findUnique({
                    where: {
                        id: postId,
                    }
                });
                // CHECK IF USER EXISTS IN DATABASE
                const userDataBase = await prisma.user.findUnique({
                    where: {
                        id: userViaAuthHeader.id,
                    }
                });
                // CHECK IF POST AND USER ARE _NOT_ NULL
                if (postDataBase && userDataBase) {
                    // CHECK IF POST IS _ALREADY_ LIKED
                    const isAlreadyLiked = await prisma.user.findFirst({
                        where: {
                            id: userViaAuthHeader.id,
                            likedPosts: {
                                some: {
                                    id: postDataBase.id
                                }
                            }
                        }
                    });
                    if (isAlreadyLiked) {
                        // IF POST IS _ALREADY_ LIKED THEN REMOVE LIKE
                        await prisma.user.update({
                            where: {
                                id: userDataBase.id,
                            },
                            data: {
                                likedPosts: {
                                    disconnect: {
                                        id: postDataBase.id,
                                    }
                                }
                            }
                        });
                        return "Successful!";
                    } else {
                        // IF POST IS _NOT_ LIKED THEN ADD LIKE
                        await prisma.user.update({
                            where: {
                                id: userDataBase.id,
                            },
                            data: {
                                likedPosts: {
                                    connect: {
                                        id: postDataBase.id,
                                    }
                                }
                            }
                        });
                        return "Successful!";
                    }
                }
            } catch (err) {
                throw new Error(String(err));
            }
        }
    }
};

export { postResolvers };