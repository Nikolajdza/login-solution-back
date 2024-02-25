import express from 'express';
import passport from 'passport';
import requireAuth from '../middlewares/auth.middleware';
import getUserDetails from '../controllers/user.controller';
import { handleAuthCallback } from '../controllers/auth.controller';
import { AppConfig } from '../config/configuration.types';
import { configuration } from '../config/configuration';

const router = express.Router();
const appConfig: AppConfig = configuration.app;

const successLoginUrl = appConfig.successfullLoginUrl;
const failedLoginUrl = appConfig.failedLoginUrl;

router.get('/user', requireAuth, getUserDetails);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: successLoginUrl,
    failureRedirect: failedLoginUrl,
  }),
  (req, res) => handleAuthCallback(req, res, false),
);

router.get('/microsoft', passport.authenticate('curity'));
router.get(
  '/microsoft/callback',
  passport.authenticate('curity', {
    successRedirect: successLoginUrl,
    failureRedirect: failedLoginUrl,
  }),
  (req, res) => handleAuthCallback(req, res, false),
);


router.get('/facebook', passport.authenticate('facebook'));

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: successLoginUrl,
    failureRedirect: failedLoginUrl,
  }),
  (req, res) => handleAuthCallback(req, res, false),
);

export default router;