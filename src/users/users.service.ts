import { UpdateUserDto } from './dto/update-user.dto';
import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase.service';
import { CreateUserDto } from './dto/create-user.dto';
import { createResponse, ResponsePayload } from 'src/_lib/utils';

@Injectable()
export class UsersService {
  constructor(private readonly supabase: SupabaseService) {}

  async getUserById(id: string) {
    const { data, error } = await this.supabase.client
      .from('users')
      .select('first_name, last_name, balance, monthly_budget')
      .eq('id', id)
      .single();

    if (error)
      return createResponse({
        status: 400,
        error: `Fetching Failed: ${error.message}`,
      });

    return data;
  }

  async createUser(userDto: CreateUserDto): Promise<ResponsePayload> {
    const { data: signUpData, error: signUpError } =
      await this.supabase.client.auth.signUp({
        email: userDto.email,
        password: userDto.password,
      });

    if (signUpError) {
      return createResponse({
        status: 400,
        error: `Signup failed: ${signUpError.message}`,
      });
    }

    const userId = signUpData.user?.id;

    if (!userId) {
      return createResponse({
        status: 500,
        error: 'Signup succeeded but no user ID returned',
      });
    }

    const { data, error } = await this.supabase.client
      .from('users')
      .insert({
        id: userId,
        firstName: userDto.firstName,
        lastName: userDto.lastName,
      })
      .select()
      .single();

    if (error) {
      return createResponse({
        status: 500,
        error: `Failed to create user profile: ${error.message}`,
      });
    }

    return createResponse({
      status: 201,
      data,
    });
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponsePayload> {
    const { data, error } = await this.supabase.client
      .from('users')
      .update(updateUserDto)
      .eq('id', id)
      .select()
      .single();

    if (error)
      return createResponse({
        status: 404,
        error: `User Not Found: ${error}`,
      });

    return createResponse({
      status: 200,
      data,
    });
  }
}
