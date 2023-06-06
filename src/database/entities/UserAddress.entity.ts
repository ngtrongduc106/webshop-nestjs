import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./User.entity";

@Entity({
    name: "userAddress"
})
export class UserAddressEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({
        nullable: false
    })
    userId: string;

    @Column({
        nullable: false
    })
    country: string;

    @Column({
        nullable: false
    })
    cityId: string;

    @Column({
        nullable: false
    })
    districtId: string;

    @Column({
        nullable: false
    })
    homeAddress: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => UserEntity, userEntity => userEntity.userAddress)
    @JoinColumn({
        name: "FK_userId"
    })
    user: UserEntity;
}