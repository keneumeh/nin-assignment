import { ModeOfReg } from "../../../nin-registration/ninRegistration.types";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/nin-registration/users/entities/user.entity";

@Entity()
export class LinkedIdentity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    banVerNum: string;

    @Column({nullable: true})
    mobileNumber: number;

    @Column({type: 'enum', enum: ModeOfReg, default: ModeOfReg.MOBILE})
    modeOfReg: ModeOfReg;

    @Column()
    nationalIdNum: number;

    @Column({default: new Date().getFullYear()})
    date: number;

    @JoinColumn()
    @OneToOne(type => User, user => user.linkedidentity, {cascade:true})
    user: User;
}
