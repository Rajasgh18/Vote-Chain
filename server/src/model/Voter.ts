import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@/db';
import {body, validationResult} from 'express-validator';

class Voter extends Model {
    public voterId!: string;
    public image!: string;
    public email!: string;
    public name!: string;
    public phoneNumber!: string;
    public district!: string;
}

Voter.init(
    {
        voterId: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: true,
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [10, 15],
            },
        },
        district: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Voter',
    }
);

export default Voter;