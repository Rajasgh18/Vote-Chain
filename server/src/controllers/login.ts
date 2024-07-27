import OTP from "@/model/OTP";
import Voter from "@/model/Voter";
import { Request, Response } from "express"
import speakeasy from 'speakeasy';
import { Resend } from "resend";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOTP = async (req: Request, res: Response) => {
    const voterId = req.params.id;
    if (!voterId) return res.status(400).json({ message: "Invalid VoterId" });

    try {
        const voter = await Voter.findOne({ where: { voterId } });
        if (!voter) return res.status(404).json({ message: "Voter not found" });

        const otp = speakeasy.totp({
            secret: process.env.SECRET_KEY!,
            encoding: "base64"
        });
        const expiry = new Date(Date.now() + 5 * 60 * 1000);
        await OTP.create({ voterId, otp, expiry });

        const { error } = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: [voter.email],
            subject: "Vote Chain Login",
            html: `<strong>Your Login OTP is ${otp}</strong>`,
        });
        console.log(error);
        if (error) {
            return res.status(400).json({ error });
        }

        res.status(200).json({ message: "OTP sent successfully" });

    } catch (error: any) {
        res.status(500).json({ message: error.message || "Something went wrong while generating OTP" });
    }
};

export const verifyOTP = async (req: Request, res: Response) => {
    const { voterId, otp } = req.body;
    if (!voterId) return res.status(400).json({ message: "Invalid VoterId" });

    try {
        const foundOtp = await OTP.findOne({ where: { voterId, otp } });
        if (!foundOtp) return res.status(404).json({ message: "Incorrect OT" });

        if (new Date > foundOtp.expiry) return res.status(403).json({ "message": "OTP expired" });

        const token = jwt.sign({ voterId }, process.env.SECRET_KEY!, { expiresIn: '1h' });
        res.status(200).json({ token, message: "OTP verified successfully" });

    } catch (error: any) {
        res.status(500).json({ message: error.message || "Something went wrong while verifying" });
    }
};
