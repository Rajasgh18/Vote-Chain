import Candidate from "@/model/Candidate";
import { Request, Response } from "express";
import { validationResult } from 'express-validator';

export const getCandidates = async (req: Request, res: Response) => {
    try {
        const candidates = await Candidate.findAll();
        const formattedCandidates = candidates.map((candidate) => {
            const image = Buffer.from(candidate.image).toString('base64');
            return { ...candidate.toJSON(), image };
        });
        res.status(200).json(formattedCandidates);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Something went wrong while fetching candidates" });
    }
};

export const getCandidate = async (req: Request, res: Response) => {
    try {
        const candidateId = req.body.id;
        if (candidateId.length === 0) return res.status(400).json({ message: "Invalid Candidate ID" });

        let candidate = await Candidate.findOne({ where: { candidateId } });

        const image = Buffer.from(candidate!.image).toString('base64');

        res.status(200).json({ ...candidate, image });

    } catch (error: any) {
        res.status(500).json({ message: error.message || "Something went wrong while fetching candidate" });
    }
};

export const createCandidate = async (req: Request, res: Response) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty) return res.status(400).json({ message: error.array() });

        const buffer = Buffer.from(req.body.image, 'base64');
        const candidate = await Candidate.create({ ...req.body, image: buffer });

        res.status(200).json(candidate);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Candidate registration failed" });
    }
};

export const updateCandidate = async (req: Request, res: Response) => {
    const candidateId = req.body.id;
    if (candidateId.length === 0) return res.status(400).json({ message: "Invalid Candidate ID" });

    try {
        const candidate = await Candidate.findOne({ where: { candidateId } });
        if (!candidate) return res.status(404).json({ message: 'Candidate not found' });

        const { image, partyId, name, phoneNumber } = req.body;

        if (image) candidate.image = image;
        if (partyId) candidate.partyId = partyId;
        if (name) candidate.name = name;
        if (phoneNumber) candidate.phoneNumber = phoneNumber;

        await candidate.save();

        res.status(200).json({ message: "Candidate Updated successfully" });

    } catch (error: any) {
        res.status(500).json({ message: error.message || "Something went wrong while updating candidate" });
    }
};

export const deleteCandidate = async (req: Request, res: Response) => {
    const candidateId = req.body.id;
    if (!candidateId) return res.status(400).json({ messsage: "Invalid candidate ID" });

    try {
        const candidate = await Candidate.findOne({ where: { candidateId } });
        if (!candidate) return res.status(404).json({ message: "Candidate not found" });

        await candidate.destroy();
        res.status(200).json({ message: "Deleted Candidate successfully" });

    } catch (error: any) {
        res.status(500).json({ message: error.message || "Something went wrong while deleting candidate" });
    }
};