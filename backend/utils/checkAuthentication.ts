import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql'

function checkAuthentication(context) {
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
        const bearerToken = authHeader.split("Bearer ")[1];
        if (bearerToken) {
            try {
                const userViaAuthHeader = jwt.verify(bearerToken, process.env.SECRET_KEY);
                return userViaAuthHeader;
            } catch (err) {
                throw new GraphQLError("Errors!", {
                    extensions: {
                        errors: {
                            "AUTH": "Expired/invalid token!"
                        }
                    }
                })
            }
        }
        throw new GraphQLError("Errors!", {
            extensions: {
                errors: {
                    "AUTH": "Token must be in the following format: 'Bearer (...)'!"
                }
            }
        })
    };
    throw new GraphQLError("Errors!", {
        extensions: {
            errors: {
                "AUTH": "Token must be provided'!"
            }
        }
    })
};

export { checkAuthentication };