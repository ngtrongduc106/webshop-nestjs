import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsersEntity } from "./Users.entity";

@Entity({
    name: "userAddress"
})
export class UserAddressEntity {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({
        nullable: false
    })
    userId: string

    @Column({
        nullable: false
    })
    countryName: string

    @Column({
        nullable: false
    })
    cityId: string

    @Column({
        nullable: false
    })
    districtId: string

    @Column({
        nullable: false
    })
    addressHome: string

    @ManyToOne(() => UsersEntity, userEntity => userEntity.userAddress)
    @JoinColumn({
        name: "userId"
    })
    user: UsersEntity
}