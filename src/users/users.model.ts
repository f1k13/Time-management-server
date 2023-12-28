import { DataTypes } from "sequelize";
import { Column, Model, HasMany, Table } from "sequelize-typescript";
import { CalendarTasks } from "src/calendar/calendarTasks.model";
import { Notes } from "src/notes/notes.model";
import { Work } from "src/work/work.model";

interface UserCreationAttributes {
  email: string;
  username: string;
  password: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttributes> {
  @Column({
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id: number;
  @Column({ type: DataTypes.STRING, unique: true, allowNull: false })
  email: string;
  @Column({ type: DataTypes.STRING, unique: true, allowNull: false })
  username: string;
  @Column({ type: DataTypes.STRING })
  password: string;

  @Column({
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
    defaultValue: [],
  })
  unacceptedRequests: Array<Number>;
  @Column({
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
    defaultValue: [],
  })
  friends: Array<Number>;
  @HasMany(() => CalendarTasks)
  calendarTasks: CalendarTasks[];

  @HasMany(() => Notes)
  notes: Notes[];

  @HasMany(() => Work)
  works: Work[];
}
