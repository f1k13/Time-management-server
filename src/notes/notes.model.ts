import { DataTypes } from "sequelize";
import { Column, Table, Model, ForeignKey } from "sequelize-typescript";
import { User } from "src/users/users.model";

interface NotesCreateAttrs {
  id: number;
  title: string;
  date: string;
  userId: number;
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
  @ForeignKey(() => User)
  @Column({ type: DataTypes.INTEGER })
  userId: number;
}
