import { Table, Model, Unique, AllowNull, Column, DataType, BelongsToMany } from 'sequelize-typescript';
import User from './user';
import UserRole from './userrole';

interface RoleAttributes {
    id: number;
    authority: string,
    users: Array<User>
}

interface RoleCreationAttributes {
    authority: string
}

@Table({
    tableName: 'role'
})
class Role extends Model<RoleAttributes, RoleCreationAttributes> {

    @Unique(true)
    @AllowNull(false)
    @Column({
        type: DataType.STRING(30)
    })
    authority!: string

    @BelongsToMany(() => User, () => UserRole)
    users!: Array<User>
}

export default Role;