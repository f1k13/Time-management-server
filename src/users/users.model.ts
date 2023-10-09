import { DataTypes } from 'sequelize'
import { Column, Model, Table } from 'sequelize-typescript'

interface UserCreationAttributes {
	email: string
	username: string
	password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttributes> {
	@Column({
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	})
	id: string
	@Column({ type: DataTypes.STRING, unique: true, allowNull: false })
	email: string
	@Column({ type: DataTypes.STRING, unique: true, allowNull: false })
	username: string
	@Column({ type: DataTypes.STRING })
	password: string
}
