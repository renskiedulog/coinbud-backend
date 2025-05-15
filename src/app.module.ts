import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { SupabaseModule } from './supabase.module';
import { GoalsModule } from './goals/goals.module';
import { RemindersModule } from './reminders/reminders.module';

@Module({
  imports: [UsersModule, TransactionsModule, SupabaseModule, GoalsModule, RemindersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
