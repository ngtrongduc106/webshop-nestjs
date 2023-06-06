import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./User.entity";
import { RolePermission } from "./RolePermission.entity";

@Entity({
    name: "roles"
})
export class RoleEntity {
    @PrimaryGeneratedColumn("uuid")
    roleId: string;

    @Column({
        nullable: false
    })
    roleName: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToMany(() => UserEntity, userEntity => userEntity.roles)
    users: UserEntity[];

    @OneToMany(() => RolePermission, rolePermission => rolePermission.role)
    permissions: RolePermission[]
}