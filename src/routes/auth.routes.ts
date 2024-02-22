import express from 'express';
import passport from 'passport';
import { generateJWT } from '../services/jwt.service';
import { UserDocument } from '../models/user.model';
import requireAuth from '../middlewares/auth.middleware';
import getUserDetails from '../controllers/user.controller';

const router = express.Router();

const successLoginUrl = 'http://localhost:8000/login/success';
const failedLoginUrl = 'http://localhost:8000/login/error';

router.get('/user', requireAuth, getUserDetails);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: successLoginUrl,
    failureRedirect: failedLoginUrl,
  }),
  (req, res) => {
    const token = generateJWT(req.user as UserDocument);

    res.cookie('token', token, { httpOnly: false });
  },
);

router.get('/microsoft', passport.authenticate('azuread-openidconnect', { scope: ['user.read'] }));
router.get(
  '/microsoft/callback',
  passport.authenticate('azuread-openidconnect', {
    successRedirect: successLoginUrl,
    failureRedirect: failedLoginUrl,
  }),
  (req, res) => {
    const token = generateJWT(req.user as UserDocument);

    res.cookie('token', token, { httpOnly: true });
  },
);

router.get('/facebook', passport.authenticate('facebook'));

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: successLoginUrl,
    failureRedirect: failedLoginUrl,
  }),
  (req, res) => {
    const token = generateJWT(req.user as UserDocument);

    res.cookie('token', token, { httpOnly: true });
  },
);

export default router;