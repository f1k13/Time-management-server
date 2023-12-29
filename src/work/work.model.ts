import { DataTypes } from "sequelize";
import { Column, Table, Model, ForeignKey } from "sequelize-typescript";
import { User } from "src/users/users.model";

interface WorkCreationAttributes {
  startTime: number;
  endTime: number;
  userId: number;
  date: string;
}
@Table({ tableName: "work" })
export class Work extends Model<Work, WorkCreationAttributes> {
  @Column({
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id: number;
  @Column({
    type: DataTypes.INTEGER,
  })
  startTime: number;
  @Column({
    type: DataTypes.INTEGER,
  })
  endTime: number;
  @Column({
    type: DataTypes.STRING,
  })
  date: string;
  @ForeignKey(() => User)
  @Column({
    type: DataTypes.INTEGER,
    unique: true,
  })
  userId: number;
}
