import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly adminClient: SupabaseClient;

  constructor() {
    this.adminClient = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
  }

  get admin(): SupabaseClient {
    return this.adminClient;
  }

  getUserClient(accessToken: string): SupabaseClient {
    return createClient(
      process.env.SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      },
    );
  }

  async getUserFromToken(token: string) {
    const { data, error } = await this.adminClient.auth.getUser(token);
    if (error || !data?.user) {
      throw new UnauthorizedException('Invalid token');
    }
    return data.user;
  }
}
