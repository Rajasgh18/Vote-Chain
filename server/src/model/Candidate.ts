import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';
import Party from './Party';

class Candidate extends Model {
    public candidateId!: number;
    public image!: Buffer;
    public name!: string;
    public phoneNumber!: string;
    public partyId!: number;
}

Candidate.init(
    {
        candidateId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        image: {
            type: DataTypes.BLOB,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        partyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Candidate',
    }
);

// Define associations
Candidate.belongsTo(Party, { foreignKey: 'partyId' });
Party.hasMany(Candidate, { foreignKey: 'partyId' });

export default Candidate;