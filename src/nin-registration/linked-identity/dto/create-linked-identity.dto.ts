import { CreateUserDto } from "src/nin-registration/users/dto/create-user.dto";
import { ModeOfReg } from "../../../nin-registration/ninRegistration.types";
export class CreateLinkedIdentityDto {
 
readonly bankVerNum: string;
readonly mobileNumber: number;
readonly ModeOfReg: ModeOfReg;
readonly nationalIdNum: number;
readonly date: number
readonly user: CreateUserDto; 
}