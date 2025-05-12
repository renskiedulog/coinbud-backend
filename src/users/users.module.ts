import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SupabaseModule } from 'src/supabase.module';

@Module({
  imports: [SupabaseModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
