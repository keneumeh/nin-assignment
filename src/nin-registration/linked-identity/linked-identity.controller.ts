import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LinkedIdentityService } from './linked-identity.service';
import { CreateLinkedIdentityDto } from './dto/create-linked-identity.dto';
import { UpdateLinkedIdentityDto } from './dto/update-linked-identity.dto';

@Controller('linked-identity')
export class LinkedIdentityController {
  constructor(private readonly linkedIdentityService: LinkedIdentityService) {}

  @Post()
  create(@Body() createLinkedIdentityDto: CreateLinkedIdentityDto) {
    return this.linkedIdentityService.create(createLinkedIdentityDto);
  }

  @Get()
  findAll() {
    return this.linkedIdentityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.linkedIdentityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLinkedIdentityDto: UpdateLinkedIdentityDto) {
    return this.linkedIdentityService.update(+id, updateLinkedIdentityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linkedIdentityService.remove(+id);
  }
//this code is to control the relationship between the user and the linked identity created in the LI service.ts
  @Patch(':linkedidentityId/user/userId')
  setUserById(@Param('linkedidentityId') linkedidentityId: string, @Param('userId') userId: string) {
    return this.linkedIdentityService.setUserById(+linkedidentityId, +userId);
  }

  @Delete(':linkedidentityId/user')
  unsetUserById(@Param('linkedidentityId') linkedidentityId: string) {
    return this.linkedIdentityService.unsetUserById(+linkedidentityId);
  }

}




