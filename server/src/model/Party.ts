import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';

class Party extends Model {
    public partyId!: number;
    public image!: Buffer;
    public name!: string;
    public level!: string;
    public description!: string;
}

Party.init(
    {
        partyId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        image: {
            type: DataTypes.BLOB,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        level: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Party',
    }
);

export default Party;
