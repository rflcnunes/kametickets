import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse } from 'src/common/api-response';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ApiResponse> {
    const createdUser = await this.usersService.create(createUserDto);

    return new ApiResponse(
      true,
      HttpStatus.CREATED,
      'User created successfully',
      createdUser,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<ApiResponse> {
    const users = await this.usersService.findAll();

    return new ApiResponse(
      true,
      HttpStatus.OK,
      'Users fetched successfully',
      users,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse> {
    const user = await this.usersService.findOne(+id);

    return new ApiResponse(true, HttpStatus.OK, 'User fetched successfully', {
      user,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ApiResponse> {
    const updatedUser = await this.usersService.update(+id, updateUserDto);

    return new ApiResponse(
      true,
      HttpStatus.OK,
      'User updated successfully',
      updatedUser,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ApiResponse> {
    await this.usersService.remove(+id);

    return new ApiResponse(
      true,
      HttpStatus.OK,
      'User deleted successfully',
      null,
    );
  }
}
