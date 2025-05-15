import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEnum,
  IsPositive,
  IsInt,
  IsDefined,
} from 'class-validator';

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

import { Category } from 'src/_lib/types';

export class CreateTransactionsDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;

  @IsEnum(Category)
  @IsNotEmpty()
  category: Category;

  @IsInt()
  @IsDefined()
  user_id: number;
}
