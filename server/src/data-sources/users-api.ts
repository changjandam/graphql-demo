import { RESTDataSource } from '@apollo/datasource-rest';
import type { UserModel } from '../models.js';
import type { CreateUserInput } from '../generated/types.js';

export class UsersAPI extends RESTDataSource {
  baseURL?: string = 'http://localhost:4321';

  getUsers() {
    return this.get<UserModel[]>('/users');
  }

  getUserById(id: number) {
    return this.get<UserModel>(`/users/${id}`);
  }

  createUser(input: CreateUserInput) {
    return this.post<UserModel>('/users', { body: input });
  }
}
