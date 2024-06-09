import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { loginValidationChecker, registrationValidationChecker } from '../../utils/validationChecker';
import { checkAuthentication } from '../../utils/checkAuthentication';
import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql'
const prisma = new PrismaClient();

const userResolvers = {
    Query: {
        // GET ALL USERS
        async getAllUsers() {
            try {
                const usersDataBase = await prisma.user.findMany({
                    relationLoadStrategy: 'join',
                    include: {
                        posts: true,
                        likedPosts: true,
                        following: true,
                        followers: true,
                        replies: true,
                    },
                });
                return usersDataBase;
            } catch (err) {
                throw new Error(String(err));
            }
        },
        // GET USER BY ID
        async getSingleUser(_, { userId }) {
            try {
                const userDataBase = await prisma.user.findUnique(
                    {
                        relationLoadStrategy: 'join',
                        include: {
                            posts: true,
                            likedPosts: true,
                            following: true,
                            followers: true,
                            replies: true,
                        },
                        where: {
                            id: userId,
                        }
                    }
                );
                return userDataBase;
            } catch (err) {
                throw new Error(String(err));
            }
        }
    },
    Mutation: {
        // LOGIN EXISTING USER
        async loginUser(_, { loginInput: { username, password } }) {
            // VALIDATE VIA loginValidationChecker() FUNCTION
            const { errors, valid } = loginValidationChecker(username, password);
            if (!valid) {
                throw new GraphQLError("Errors!", { extensions: { errors } });
            }
            // CHECK IF USER EXISTS
            const userDataBase = await prisma.user.findFirst(
                {
                    where: {
                        username: username.toUpperCase(),
                    }
                }
            )
            if (!userDataBase) {
                throw new GraphQLError("Errors!", {
                    extensions: {
                        errors: {
                            "USERNAME/PASSWORD": "Wrong username/password!"
                        }
                    }
                })
            }
            // CHECK IF PASSWORD MATCHES DATABASE PASSWORD
            const passwordMatch = await bcrypt.compare(password, userDataBase.password);
            if (!passwordMatch) {
                throw new GraphQLError("Errors!", {
                    extensions: {
                        errors: {
                            "USERNAME/PASSWORD": "Wrong username/password!"
                        }
                    }
                })
            }
            // UPDATE WITH NEW TOKEN
            const jwtUpdate = await prisma.user.update(
                {
                    where: {
                        id: userDataBase.id,
                    },
                    data: {
                        token: jwt.sign({
                            id: userDataBase.id,
                            username: userDataBase.username,
                        }, process.env.SECRET_KEY, { expiresIn: '1h' })
                    }
                }
            )
            return jwtUpdate;
        },
        // REGSITER NEW USER
        async registerUser(_, { registrationInput: { username, password, confirmPassword } }) {
            // VALIDATE VIA registrationValidationChecker() FUNCTION
            const { errors, valid } = registrationValidationChecker(username, password, confirmPassword);
            if (!valid) {
                throw new GraphQLError("Errors!", { extensions: { errors } });
            }
            // CHECK IF USERNAME ALREADY EXISTS
            const userDataBase = await prisma.user.findFirst(
                {
                    where: {
                        username: username.toUpperCase(),
                    }
                }
            );
            if (userDataBase) {
                throw new GraphQLError("Errors!", {
                    extensions: {
                        errors: {
                            "USERNAME": "This username is taken!"
                        }
                    }
                })
            }
            // HASH PASSWORD
            password = await bcrypt.hash(password, 12);
            // STORE USER
            try {
                const user = await prisma.user.create({
                    data: {
                        username: username.toUpperCase(),
                        password: password,
                        createdAt: new Date()
                    }
                })
                return user;
            } catch (err) {
                throw new Error(String(err));
            }
        },
        async followUser(_, { userId }, context) {
            // CHECK IF PROPER AUTH
            const userViaAuthHeader = checkAuthentication(context);
            try {
                // CHECK IF USER TO FOLLOW EXISTS IN DATABASE
                const userToFollowDataBase = await prisma.user.findUnique({
                    where: {
                        id: userId,
                    }
                });
                // CHECK IF USER EXISTS IN DATABASE
                const userDataBase = await prisma.user.findUnique({
                    where: {
                        id: userViaAuthHeader.id,
                    }
                });
                // CHECK IF USER TO FOLLOW AND USER ARE _NOT_ NULL
                if (userToFollowDataBase && userDataBase && userToFollowDataBase.id !== userDataBase.id) {
                    // CHECK IF USER TO FOLLOW IS _ALREADY_ FOLLOWED
                    const isAlreadyFollowing = await prisma.user.findFirst({
                        where: {
                            id: userDataBase.id,
                            following: {
                                some: {
                                    id: userId
                                }
                            }
                        }
                    });
                    if (isAlreadyFollowing) {
                        // IF USER TO FOLLOW IS _ALREADY_ FOLLOWED THEN UNFOLLOW
                        await prisma.user.update({
                            where: {
                                id: userDataBase.id,
                            },
                            data: {
                                following: {
                                    disconnect: {
                                        id: userId
                                    }
                                }
                            }
                        });
                        await prisma.user.update({
                            where: {
                                id: userId,
                            },
                            data: {
                                followers: {
                                    disconnect: {
                                        id: userDataBase.id,
                                    }
                                }
                            }
                        });
                        return "Successful!";
                    } else {
                        await prisma.user.update({
                            where: {
                                id: userDataBase.id,
                            },
                            data: {
                                following: {
                                    connect: {
                                        id: userId
                                    }
                                }
                            }
                        });
                        await prisma.user.update({
                            where: {
                                id: userId,
                            },
                            data: {
                                followers: {
                                    connect: {
                                        id: userDataBase.id,
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

export { userResolvers };