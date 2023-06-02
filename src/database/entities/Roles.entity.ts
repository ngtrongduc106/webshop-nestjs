import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UsersEntity } from "./Users.entity";
import { RoleHasPermissionEntity } from "./RoleHasPermission.entity";

@Entity({
    name: "roles"
})
export class RolesEntity {
    @PrimaryGeneratedColumn("uuid")
    roleId: string

    @Column({
        nullable: false
    })
    roleName: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @ManyToMany(() => UsersEntity, usersEntity => usersEntity.roles)
    users: UsersEntity[]

    @OneToMany(() => RoleHasPermissionEntity, x => x.role)
    permissions: RoleHasPermissionEntity[]
}