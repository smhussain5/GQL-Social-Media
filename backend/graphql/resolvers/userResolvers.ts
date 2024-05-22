import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { loginValidationChecker, registrationValidationChecker } from '../../utils/validationChecker';
import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql'
const prisma = new PrismaClient();

const userResolvers = {
    Query: {
        // GET ALL USERS
        async getAllUsers() {
            try {
                const usersDataBase = await prisma.user.findMany();
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
        },
        // REGSITER NEW USER
        async registerUser(_, { registrationInput: { username, password, confirmPassword, email } }) {
            // VALIDATE VIA registrationValidationChecker() FUNCTION
            const { errors, valid } = registrationValidationChecker(username, password, confirmPassword, email);
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
            // CHECK IF EMAIL ALREADY EXISTS
            const emailDataBase = await prisma.user.findFirst(
                {
                    where: {
                        email: email.toUpperCase(),
                    }
                }
            );
            if (emailDataBase) {
                throw new GraphQLError("Errors!", {
                    extensions: {
                        errors: {
                            "EMAIL": "This email is taken!"
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
                        email: email.toUpperCase(),
                        createdAt: new Date().toISOString(),
                        token: jwt.sign({
                            username: username,
                            email: email,
                        }, process.env.SECRET_KEY, { expiresIn: '1h' })
                    }
                })
                return user;
            } catch (err) {
                throw new Error(String(err));
            }
        },
    }
};

export { userResolvers };