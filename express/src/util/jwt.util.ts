import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export const provideToken = (id: string, type: string) => {
    return jwt.sign({
            id, type
        }, secret, {
            algorithm: 'HS256',
            expiresIn: '1h'
        }
    );
};