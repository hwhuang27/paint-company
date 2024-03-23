import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions, VerifyCallback} from 'passport-jwt';
import { jwtDecoded } from './jwtConfig';
import User from '../models/User';

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};

const verify: VerifyCallback = 
    async (jwtPayload: jwtDecoded, done) => {
        try {
            const user = await User.findOne({ email: jwtPayload.email });
            if (user) {
                return done(null, jwtPayload);
            } else {
                return done(null, false);
            }
        } catch (err) {
            return done(err, false);
        }
    };
    
passport.use(new JwtStrategy(options, verify));