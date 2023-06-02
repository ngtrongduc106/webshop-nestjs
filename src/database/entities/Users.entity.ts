import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RolesEntity } from "./Roles.entity";
import { UserAddressEntity } from "./UserAddress.entity";

@Entity({
    name: "users"
})
export class UsersEntity {
    @PrimaryGeneratedColumn('uuid')
    userId: string

    @Column({
        unique: true,
        nullable: false
    })
    userEmail: string

    @Column({
        nullable: false
    })
    userPassword: string

    @Column()
    userFirstName: string

    @Column()
    userLastName: string

    @Column()
    userPhone: string

    @Column({
        default: true
    })
    isActive: boolean

    @Column({
        default: false
    })
    isAdmin: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @ManyToMany(() => RolesEntity, rolesEntity => rolesEntity.users)
    @JoinTable({
        name: "userHasRole",
        joinColumn: {
            name: "userId",
        },
        inverseJoinColumn: {
            name: "roleId"
        }
    })
    roles: RolesEntity[]

    @OneToMany(() => UserAddressEntity, userAddress => userAddress.user)
    userAddress: UserAddressEntity[]
}