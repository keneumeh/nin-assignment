import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
//import { StudentsModule } from './students/students.module';
import { LinkedIdentityModule } from './linked-identity/linked-identity.module';

@Module({
  imports: [UsersModule, LinkedIdentityModule, /*StudentsModule*/]
})
export class StudentRegistrationModule {}
