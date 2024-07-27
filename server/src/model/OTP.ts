import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@/db';
import Voter from './Voter';

class OTP extends Model {
    public id!: number;
    public voterId!: string;
    public otp!: number;
    public expiry!: Date;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

OTP.init({
    id: {
        type: DataTypes.INTEGER,  // Use INTEGER for auto-incrementing ID
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    voterId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    otp: {
        type: DataTypes.INTEGER,  // Use INTEGER for numeric fields
        allowNull: false
    },
    expiry: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'OTP',
    timestamps: true, // Include timestamps by default
});

OTP.belongsTo(Voter, { foreignKey: 'voterId'});
Voter.hasMany(OTP, { foreignKey: 'voterId'});

export default OTP;
