import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RolesEntity } from "./Roles.entity";
import { UsersEntity } from "./Users.entity";

@Entity({
    name: "roleHasPermission"
})
export class RoleHasPermissionEntity {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({
        nullable: false
    })
    roleId: string

    @Column({
        nullable: false
    })
    permissionId: string

    @ManyToOne(() => RolesEntity, x => x.permissions)
    @JoinColumn({
        name: "roleId"
    })
    role: RolesEntity
}