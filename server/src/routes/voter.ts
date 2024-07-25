import express from 'express';
import { check } from 'express-validator';
import { getVoters, getVoter, createVoter, updateVoter, deleteVoter } from '@/controllers/voter';

const Router = express();

Router
    .get("/", getVoters)
    .get("/:id", getVoter)
    .post("/", [
        check('voterId').isLength({ min: 1 }).withMessage('Voter ID is required').optional(),
        check('image').isURL().withMessage('Image must be a valid URL'),
        check('email').isEmail().withMessage('Email must be valid'),
        check('name').isLength({ min: 1 }).withMessage('Name is required'),
        check('phoneNumber').isLength({ min: 10 }).withMessage('Phone number must be at least 10 characters long'),
        check('district').isLength({ min: 1 }).withMessage('District is required')
    ], createVoter)
    .put("/:id", [
        check('voterId').isLength({ min: 1 }).withMessage('Voter ID is required').optional(),
        check('image').isURL().withMessage('Image must be a valid URL').optional(),
        check('email').isEmail().withMessage('Email must be valid').optional(),
        check('name').isLength({ min: 1 }).withMessage('Name is required').optional(),
        check('phoneNumber').isLength({ min: 10 }).withMessage('Phone number must be at least 10 characters long').optional(),
        check('district').isLength({ min: 1 }).withMessage('District is required').optional()
    ], updateVoter)
    .delete("/:id", deleteVoter);

export default Router;
