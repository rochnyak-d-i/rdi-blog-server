import { MinLength, IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty({
    message: 'Имя пользователя не должно быть пустым'
  })
  readonly username: string;

  @IsString()
  @MinLength(3, {
    message: 'Пароль должен быть от $constraint1 символов'
  })
  readonly password: string;

  @IsOptional()
  @IsInt()
  readonly id: number;
}
