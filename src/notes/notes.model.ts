import { DataTypes } from "sequelize";
import { Column, Table, Model } from "sequelize-typescript";

interface NotesCreateAttrs {
  id: number;
  title: string;
}

@Table({ tableName: "notes" })
export class Notes extends Model<Notes, NotesCreateAttrs> {
  @Column({
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;
  @Column({
    type: DataTypes.STRING,
  })
  title: string;
  @Column({
    type: DataTypes.STRING,
  })
  date: string;
  @Column({
    type: DataTypes.INTEGER,
  })
  userId: number;
}
