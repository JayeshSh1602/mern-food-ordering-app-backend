import { auth } from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

console.log('AUTH0_AUDIENCE:', process.env.AUTH0_AUDIENCE);
console.log('AUTH0_ISSUER_BASE_URL:', process.env.AUTH0_ISSUER_BASE_URL);

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: 'RS256'
});

export const jwtParse = async(req,res,next) => {
  const {authorization} = req.headers;

   if (!authorization?.startsWith('Bearer ')) {
    return res.sendStatus(401);
  }

  const token = authorization.split(' ')[1];

   try {
    const decoded = jwt.decode(token);
    const auth0Id = decoded?.sub;

    if (!auth0Id) {
      return res.sendStatus(401);
    }

    const user = await User.findOne({ auth0Id });

    if (!user) {
      return res.sendStatus(401);
    }

    req.auth0Id = auth0Id;
    req.userId = user._id.toString();
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};