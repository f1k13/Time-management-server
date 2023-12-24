import { DataTypes } from "sequelize";
import {
  Column,
  Model,
  Table,
  HasOne,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "src/users/users.model";

interface CreateCalendarTasksAttrs {
  title: string;
  description: string;
  type: string;
}

@Table({ tableName: "CalendarTasks" })
export class CalendarTasks extends Model<
  CalendarTasks,
  CreateCalendarTasksAttrs
> {
  @Column({
    type: DataTypes.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column({ type: DataTypes.STRING, allowNull: true })
  title: string;
  @Column({ type: DataTypes.STRING, allowNull: true })
  description: string;
  @Column({ type: DataTypes.STRING, allowNull: true })
  type: string;
  @ForeignKey(() => User)
  @Column({ type: DataTypes.INTEGER })
  userId: number;
  @Column({ type: DataTypes.STRING })
  calendarDate: string;
}
