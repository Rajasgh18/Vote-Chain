import Party from "@/model/Party";

import { Request, Response } from "express";
import { validationResult } from 'express-validator';

export const getParties = async (req: Request, res: Response) => {
    try {
        const parties = await Party.findAll();
        const formattedParties = parties.map((party) => {
            const image = Buffer.from(party.image).toString('base64');
            return { ...party.toJSON(), image };
        });
        res.status(200).json(formattedParties);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Something went wrong while fetching parties" });
    }
};

export const getParty = async (req: Request, res: Response) => {
    try {
        const partyId = req.body.id;
        if (partyId.length === 0) return res.status(400).json({ message: "Invalid Party ID" });

        let party = await Party.findOne({ where: { partyId } });
        const image = Buffer.from(party!.image).toString('base64');

    } catch (error: any) {
        res.status(500).json({ message: error.message || "Something went wrong while fetching party" });
    }
};

export const createParty = async (req: Request, res: Response) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) return res.status(400).json({ message: error.array() });

        const { name, level, description, image } = req.body;
        const buffer = Buffer.from(image, 'base64');

        if (!buffer) {
            return res.status(400).json({ message: "Image is required" });
        }

        const party = await Party.create({
            name,
            level,
            description,
            image: buffer,
        });

        console.log(party);

        res.status(200).json(party);
    } catch (error: any) {
        console.log(error.message);
        res.status(500).json({ message: error.message || "Party registration failed" });
    }
};

export const updateParty = async (req: Request, res: Response) => {
    const partyId = req.body.id;
    if (partyId.length === 0) return res.status(400).json({ message: "Invalid Voter ID" });

    try {
        const party = await Party.findOne({ where: { partyId } });
        if (!party) return res.status(404).json({ message: 'Voter not found' });

        const { image, name, description, level } = req.body;

        if (image) party.image = image;
        if (name) party.name = name;
        if (description) party.description = description;
        if (level) party.level = level;

        await party.save();

        res.status(200).json({ message: "Party Updated successfully" });

    } catch (error: any) {
        res.status(500).json({ message: error.message || "Something went wrong while updating party" });
    }
};

export const deleteParty = async (req: Request, res: Response) => {
    const partyId = req.body.id;
    if (!partyId) return res.status(400).json({ messsage: "Invalid Party ID" });

    try {
        const party = await Party.findOne({ where: { partyId } });
        if (!party) return res.status(404).json({ message: "Party not found" });

        await party.destroy();
        res.status(200).json({ message: "Deleted Voter successfully" });

    } catch (error: any) {
        res.status(500).json({ message: error.message || "Something went wrong while deleting voter" });
    }
};