import { IsString, IsNotEmpty, MaxLength, ArrayMaxSize, ArrayUnique } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty({
    message: 'Заголовок не должен быть пустым'
  })
  readonly title: string;

  @IsString()
  readonly text: string;

  @IsString({each: true})
  @ArrayMaxSize(20, {
    message: 'Тегов должно быть не больше $constraint1'
  })
  @ArrayUnique({
    message: 'Теги не должны дублироваться'
  })
  readonly tags: string[];
}
