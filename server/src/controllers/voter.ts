import Voter from "@/model/Voter";

import { Request, Response } from "express";
import { validationResult } from 'express-validator';

export const getVoters = async (req: Request, res: Response) => {
  try {
    const voters = await Voter.findAll();
    const formattedVoters = voters.map((voter) => {
      const image = Buffer.from(voter.image).toString('base64');
      return { ...voter.toJSON(), image }; // Spread voter properties and replace image with Base64 string
    });
    res.status(200).json(formattedVoters);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Something went wrong while fetching voters" });
  }
};

export const getVoter = async (req: Request, res: Response) => {
  try {
    const voterId = req.body.id;
    if (voterId.length === 0) return res.status(400).json({ message: "Invalid Voter ID" });

    let voter = await Voter.findOne({ where: { voterId } });
    const image = Buffer.from(voter!.image).toString('base64');
    res.status(200).json({ ...voter?.toJSON(), image });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Something went wrong while fetching voter" });
  }
};

export const createVoter = async (req: Request, res: Response) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty) return res.status(400).json({ message: error.array() });

    let voter = await Voter.findOne({ where: { voterId: req.body.voterId } });
    if (voter) return res.status(400).json({ message: "A voter already exists with this Voter ID" })

    const buffer = Buffer.from(req.body.image, 'base64');

    voter = await Voter.create({ ...req.body, image: buffer });

    res.status(200).json(voter);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Voter registration failed" });
  }
};

export const updateVoter = async (req: Request, res: Response) => {
  const voterId = req.body.id;
  if (voterId.length === 0) return res.status(400).json({ message: "Invalid Voter ID" });

  try {
    const voter = await Voter.findOne({ where: { voterId } });
    if (!voter) return res.status(404).json({ message: 'Voter not found' });

    const { image, email, name, phoneNumber, district } = req.body;

    if (image) voter.image = image;
    if (email) voter.email = email;
    if (name) voter.name = name;
    if (phoneNumber) voter.phoneNumber = phoneNumber;
    if (district) voter.district = district;

    await voter.save();

    res.status(200).json({ message: "User Updated successfully" });

  } catch (error: any) {
    res.status(500).json({ message: error.message || "Something went wrong while updating voter" });
  }
};

export const deleteVoter = async (req: Request, res: Response) => {
  const voterId = req.body.id;
  if (!voterId) return res.status(400).json({ messsage: "Invalid Voter ID" });

  try {
    const voter = await Voter.findOne({ where: { voterId } });
    if (!voter) return res.status(404).json({ message: "Voter not found" });

    await voter.destroy();
    res.status(200).json({ message: "Deleted Voter successfully" });

  } catch (error: any) {
    res.status(500).json({ message: error.message || "Something went wrong while deleting voter" });
  }
};