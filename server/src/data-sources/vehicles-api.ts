import { RESTDataSource } from '@apollo/datasource-rest';
import { VehicleModel } from '../models.js';

export class VehiclesAPI extends RESTDataSource {
  baseURL?: string = 'http://localhost:3210';

  getVehicles() {
    return this.get<VehicleModel[]>('/vehicles');
  }

  getUserVehicles(userId: number) {
    return this.get<VehicleModel[]>(`/users/${userId}/vehicles`);
  }

  createVehicle(type: string, model: string, userId: number) {
    return this.post<VehicleModel>('/vehicles', {
      body: { type, model, userId },
    });
  }
}
