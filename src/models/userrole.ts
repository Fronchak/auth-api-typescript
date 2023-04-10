import { ForeignKey, Table, Model, Column } from 'sequelize-typescript';
import User from './user';
import Role from './role';

interface UserRoleAttributes {
    userId: number;
    roleId: number;
}

@Table({
    tableName: 'user_role'
})
class UserRole extends Model<UserRoleAttributes, UserRoleAttributes> {

    @ForeignKey(() => User)
    @Column
    userId!: number;

    @ForeignKey(() => Role)
    @Column 
    roleId!: number;
}

export default UserRole;