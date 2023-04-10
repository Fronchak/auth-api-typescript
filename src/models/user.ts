import { Table, Model, Column, Unique, AllowNull, BelongsToMany, DataType } from 'sequelize-typescript';
import Role from './role';
import UserRole from './userrole';

interface UserAttributes {
    id: number;
    email: string;
    password: string,
    roles: Role[]
}

interface UserCreationAttributes {
    email: string;
    password: string
}

@Table({
    tableName: 'user'
})
class User extends Model<UserAttributes, UserCreationAttributes> {

    @AllowNull(false)
    @Unique(true)
    @Column({ type: DataType.STRING(120) })
    email!: string;

    @AllowNull(false)
    @Column({ type: DataType.STRING })
    password!: string

    @BelongsToMany(() => Role, () => UserRole)
    roles!: Array<Role>
}

export default User;