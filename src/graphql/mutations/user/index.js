import { GraphQLString, GraphQLNonNull } from 'graphql';
import { AuthenticationType } from '../../types/user';
import { generateHash, comparePassword } from '../../../jwt/bcrypt';
import { signToken } from '../../../jwt';
import User from '../../../model';

export const createUser = () => ({
    type: AuthenticationType,
    args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(_, args) {
        // 1. Hash password entered by user while creating account
        const password = await generateHash(args.password, 10);
        const newArgs = { ...args, password };
        // 2. Create new user based on details entered by user
        const newUser = await User.create(newArgs);
        // 3. Create payload for jwt wrapping userId
        const payload = { userId: newUser._id };
        // 4. Sign jwt token with payload 
        const token = await signToken(payload);
        // 5. Return newly created user and its token to resolve mutation
        return { user: newUser, token };
    }
});

export const signInUser = () => ({
    type: AuthenticationType,
    args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(_, args) {
        // 1. Extract user information based on username
        const user = await User.findOne({ username: args.username });
        // 2. check if the user is what you are looking for
        if(!user) {
            throw new Error('User does not exist');
        }
        const isPasswordSame = await comparePassword(args.password, user.password);
        // 3. Check if password is same or not
        if(!isPasswordSame) {
            throw new Error('Password does not match');
        }
        // 4. Create payload for jwt wrapping userId
        const payload = { userId: user._id };
        // 5. Sign jwt token with payload 
        const token = await signToken(payload);
        // 6. Return newly created user and its token to resolve mutation
        return { user, token };
    }
});

module.exports = { createUser, signInUser };