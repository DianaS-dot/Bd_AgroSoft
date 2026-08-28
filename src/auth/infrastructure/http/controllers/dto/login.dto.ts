import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  correo_usuario: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}