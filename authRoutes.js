import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Google OAuth Strategy Setup
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `http://localhost:3000/auth/google/callback`,  // Ensure callback URL is correct
}, (token, tokenSecret, profile, done) => {
  // Save profile information or handle login
  return done(null, profile); // Pass user profile to the next step
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Google Login Route
router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Google Callback Route
router.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: '/login', // Redirect to login if failed
}), (req, res) => {
  // On successful authentication, redirect to the homepage
  res.redirect('/');
});

export default router;
