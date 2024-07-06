import { checkAuthentication } from '../../utils/checkAuthentication';
import { postValidationChecker } from '../../utils/validationChecker';
import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql';
const prisma = new PrismaClient();

const replyResolvers = {
    Mutation: {
        async createReply(_, { replyInput: { body, postId } }, context) {
            // CHECK IF PROPER AUTH
            const userViaAuthHeader = checkAuthentication(context)
            // VALIDATE VIA postValidationChecker() FUNCTION
            const { errors, valid } = postValidationChecker(body);
            if (!valid) {
                throw new GraphQLError("Errors!", { extensions: { errors } });
            }
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
                    const reply = await prisma.post.update({
                        where: {
                            id: postId,
                        },
                        data: {
                            replies: {
                                create: {
                                    body: body,
                                    createdAt: new Date(),
                                    user: {
                                        connect: {
                                            id: userDataBase.id,
                                        }
                                    }
                                }
                            }
                        }
                    });
                    return reply;
                }
            } catch (err) {
                throw new Error(String(err));
            }
        },
        async deleteReply(_, { replyId }, context) {
            // CHECK IF PROPER AUTH
            const userViaAuthHeader = checkAuthentication(context);
            try {
                const replyDataBase = await prisma.reply.findUnique({
                    where: {
                        id: replyId,
                    }
                });
                if (replyDataBase && replyDataBase.userId === userViaAuthHeader.id) {
                    await prisma.reply.delete({
                        where: {
                            id: replyId,
                        }
                    });
                    return "Successful!";
                }
            } catch (err) {
                throw new Error(String(err));
            }
        }
    }
}

export { replyResolvers };