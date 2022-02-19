import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateLinkedIdentityDto } from './dto/create-linked-identity.dto';
import { UpdateLinkedIdentityDto } from './dto/update-linked-identity.dto';
import { LinkedIdentity } from './entities/linked-identity.entity';

@Injectable()
export class LinkedIdentityService {

  constructor(
    @InjectRepository(LinkedIdentity)
    private linkedidentityRepository: Repository<LinkedIdentity>,

    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async create(createLinkedIdentityDto: CreateLinkedIdentityDto) {
    //return 'This action adds a new LinkedIdentity';
    const newLinkedIdentity = this.linkedidentityRepository.create(createLinkedIdentityDto);
    //ideally, below should be wrapped in a transaction so that it can roll back if there is error in any of the stages.
    if (createLinkedIdentityDto.user) {
      const newUser = this.userRepository.create(createLinkedIdentityDto.user);
      const user: User = await this.userRepository.save(newUser);
      newLinkedIdentity.user = user;
    }
    return this.linkedidentityRepository.save(newLinkedIdentity)
  }

   async findAll() {
    //return `This action returns all linkedidentitys`;
    return await this.linkedidentityRepository.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    //return `This action returns a #${id} linkedidentity`;
    return await this.linkedidentityRepository.findOne(id);
  }

  async update(id: number, updateLinkedIdentityDto: UpdateLinkedIdentityDto) {
    //return `This action updates a #${id} linkedidentity`;
    return await this.linkedidentityRepository.update(id, updateLinkedIdentityDto);
  }

  async remove(id: number) {
    //return `This action removes a #${id} linkedidentity`;
    return await this.linkedidentityRepository.delete(id);
  }

  /* Work on relationships */
  async setUserById(linkedidentityId: number, userId: number) {
    try {
      return await this.linkedidentityRepository.createQueryBuilder()
        .relation(LinkedIdentity, "user")
        .of(linkedidentityId)
        .set(userId)
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem setting user for linkedidentity: ${error.message}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async unsetUserById(linkedidentityId: number) {
    try {
      return await this.linkedidentityRepository.createQueryBuilder()
        .relation(LinkedIdentity, "user")
        .of(linkedidentityId)
        .set(null)
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `There was a problem unsetting user for linkedidentity: ${error.message}`,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
