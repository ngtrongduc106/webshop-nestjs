import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RoleEntity } from "./Role.entity";

@Entity({
    name: "roleHasPermission"
})
export class RolePermission {
    @PrimaryGeneratedColumn("increment")
    id: number;

    roleId: string;

    permissionId: string;

    @ManyToOne(() => RoleEntity, roleEntity => roleEntity.permissions)
    @JoinColumn({
        name: "roleId"
    })
    role: RoleEntity
}