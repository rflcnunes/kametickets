import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { CreateUserDto } from 'src/app/users/dto/create-user.dto';

export class RegisterDto extends PartialType(CreateUserDto) {
  @IsNotEmpty({ message: 'The name cannot be empty' })
  name: string;

  @IsEmail(undefined, { message: 'The informed email is invalid' })
  email: string;

  @MinLength(6, { message: 'The password must be at least 6 characters' })
  @IsNotEmpty({ message: 'The password cannot be empty' })
  password: string;

  @IsNotEmpty()
  city: string;
}
