import { IsNotEmpty, IsString, IsInt, IsEnum } from 'class-validator';
import { Category } from 'src/_lib/types';

export class CreateTransactionsDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsEnum(Category)
  @IsNotEmpty()
  category: Category;

  @IsInt()
  user_id: number;
}
