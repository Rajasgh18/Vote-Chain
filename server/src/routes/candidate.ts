import express from 'express';
import { getCandidate, getCandidates, createCandidate, updateCandidate, deleteCandidate } from '@/controllers/candidate';
import { check } from 'express-validator';

const Router = express();

Router
    .get("/", getCandidate)
    .get("/all", getCandidates)
    .post("/", [
        check('image').isURL().withMessage('Image must be a valid URL'),
        check('name').isLength({ min: 1 }).withMessage('Name is required'),
        check('phoneNumber').isLength({ min: 10 }).withMessage('Phone number must be at least 10 characters long'),
        check('partyId').notEmpty().withMessage('Part ID must be at least 10 characters long'),
    ], createCandidate)
    .put("/", [
        check('image').isURL().withMessage('Image must be a valid URL').optional(),
        check('name').isLength({ min: 1 }).withMessage('Name is required').optional(),
        check('phoneNumber').isLength({ min: 10 }).withMessage('Phone number must be at least 10 characters long').optional(),
        check('partyId').notEmpty().withMessage('Part ID must be at least 10 characters long').optional(),
    ], updateCandidate)
    .delete("/", deleteCandidate);

export default Router;
