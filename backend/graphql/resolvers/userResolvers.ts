import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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
    Mutation: {
        async loginUser() {

        },
        async registerUser(_, { registrationInput: { username, password, confirmPassword, email } }) {
            // 1. CHECK IF USERNAME IS EMPTY
            // 2. CHECK IF PASSWORD IS EMPTY
            // 3. CHECK IF EMAIL IS EMPTY
            // 4. CHECK IF PASSWORDS DO NOT MATCH
            // 5. MAKE SURE USERNAME DOES NOT ALREADY EXIST
            // 6. MAKE SURE EMAIL DOES NOT ALREADY EXIST
            // 7. HASH PASSWORDS
            password = await bcrypt.hash(password, 12);
            // 8. GENERATE JWT
            // 9. STORE USER
            try {
                const user = await prisma.user.create({
                    data: {
                        username: username,
                        password: password,
                        email: email,
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