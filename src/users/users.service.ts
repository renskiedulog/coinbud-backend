import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase.service'; // adjust path if needed

@Injectable()
export class UsersService {
  constructor(private readonly supabase: SupabaseService) {}

  async getSupabaseUsers() {
    const { data, error } = await this.supabase.client
      .from('users')
      .select('*');

    if (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }

    return data;
  }
}
