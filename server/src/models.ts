export type UserModel = {
  id: number;
  name: string;
};

export type VehicleModel = {
  id: number;
  type: string;
  model: string;
  user_id: number;
};
