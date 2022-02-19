import { Controller, Get, Post, Body, Put, Param, Delete, Render} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
//these are requests from the client side
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('create')
  @Render('users/create-user.html')
  createForm() {
  }
  
  @Post()
  create(@Body() createUserDto: CreateUserDto) { //Dto = data transfer object
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
  
}