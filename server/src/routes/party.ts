import express from 'express';
import { check } from 'express-validator';
import { getParties, getParty, createParty, updateParty, deleteParty } from '@/controllers/party';
import { authenticateToken } from '@/middleware/authenticate';

const Router = express();

Router
    .get("/", getParty)
    .get("/all", getParties)
    .post("/", authenticateToken, [
        check('image').notEmpty().withMessage('Image must be a valid URL'),
        check('name').isLength({ min: 1 }).withMessage('Name is required'),
        check('level').isLength({ min: 1 }).withMessage('Level is required'),
        check('description').isLength({ min: 1 }).withMessage('Description is required'),
    ], createParty)
    .put("/", authenticateToken, [
        check('partyId').isLength({ min: 1 }).withMessage('Party ID is required').optional(),
        check('image').isURL().withMessage('Image must be a valid URL').optional(),
        check('name').isLength({ min: 1 }).withMessage('Name is required').optional(),
        check('level').isLength({ min: 1 }).withMessage('Level is required').optional(),
        check('description').isLength({ min: 1 }).withMessage('Description is required').optional(),
    ], updateParty)
    .delete("/", authenticateToken, deleteParty);

export default Router;
