import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RoleEntity } from "./Role.entity";
import { UserAddressEntity } from "./UserAddress.entity";

@Entity({
    name: "users"
})
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    userId: string;

    @Column({
        nullable: false,
        unique: true
    })
    userEmail: string;

    @Column({
        nullable: false
    })
    userPassword: string;

    @Column({
        nullable: false
    })
    userPhone: string;

    @Column({
        default: true
    })
    isActive: boolean;

    @Column({
        default: false
    })
    isAdmin: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToMany(() => RoleEntity, roleEntity => roleEntity.users)
    @JoinTable({
        name: "userHasRole",
        joinColumn: { name: "userId" },
        inverseJoinColumn: { name: "roleId" }
    })
    roles: RoleEntity[]

    @OneToMany(() => UserAddressEntity, userAddressEntity => userAddressEntity.user)
    userAddress: UserAddressEntity[]
}