import express from 'express';
import passport from 'passport';
import * as userController from '../controllers/userController';
import * as paintController from '../controllers/paintController';

const router = express.Router();

// GET current user
router.get('/user', passport.authenticate('jwt', { session: false }), userController.fetch_self);

// GET all users (admin)
router.get('/users', passport.authenticate('jwt', { session: false }), userController.fetch_users);

// GET all paints
router.get('/paint', passport.authenticate('jwt', { session: false }), paintController.fetch_paints);

// PUT update all paints
router.put('/paint', passport.authenticate('jwt', { session: false }), paintController.update_paints);

export default router;