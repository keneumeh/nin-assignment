// these reppresent the relationship
//import { Student } from "src/student-registration/students/entities/student.entity";
import { LinkedIdentity } from "src/nin-registration/linked-identity/entities/linked-identity.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

//@Entity  instructs nest to make the class a database table model
@Entity()           
export class User {
    //these represent the columns 
    @PrimaryGeneratedColumn() //@PrimaryGeneratedColumn is used to indicate a column that should be primary key and also autogenerated.
    id: number;
  //@Column is used to indicate columns in the table.
    @Column()
    firstName: string;

    @Column({nullable: true})
    middleName: string;
  
    @Column()
    lastName: string;

    @Column()
    dateOfBirth: Date;

    @Column({nullable: true})
    nationality: string

    @Column({nullable: true})
    countryOfBirth: string

    @Column({nullable: true})
    stateOfBirth: string

    @Column({nullable: true})
    townOfBirth: string

    @Column({nullable: true})
    profession: string

    @Column({nullable: true})
    address: string
  
    @Column({ default: true })
    isActive: boolean;

    @OneToOne(type => LinkedIdentity, linkedidentity => linkedidentity.user)
    linkedidentity: LinkedIdentity;
}

