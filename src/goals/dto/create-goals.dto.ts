import { IsNotEmpty, IsString, IsNumber, Min, IsInt } from 'class-validator';

export class CreateTransactionsDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsNumber()
  @Min(0)
  currentAmount: number;

  @IsInt()
  user_id: number;
}
