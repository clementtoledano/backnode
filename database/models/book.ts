import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';

interface BookAttributes {
    id: string;
    title: string;
    numberOfPages: number;
    authorId: string;
}

type BookCreationAttributes = Optional<BookAttributes, 'id'>;

interface BookInstance
    extends Model<BookAttributes, BookCreationAttributes>,
        BookAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

const Book = sequelize.define<BookInstance>('Book', {
    id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
        unique: true
    },
    title: {
        allowNull: true,
        type: DataTypes.TEXT
    },
    numberOfPages: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    authorId: {
        allowNull: true,
        type: DataTypes.UUID
    }
});

export default Book;
