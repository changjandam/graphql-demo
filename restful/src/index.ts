import { Elysia } from 'elysia';
import * as db from './database';
import { UserSchema, VehicleSchema } from './schemas';

const port = 3210;

new Elysia()
  .get('/', () => {
    return 'Hello, World!';
  })
  .get('/users', () => {
    return db.getUsers();
  })
  .get('/users/:id', ({ params: { id } }) => {
    return db.getUserById(Number(id));
  })
  .get('/users/:id/vehicles', ({ params: { id } }) => {
    return db.getVehicleByUserId(Number(id));
  })
  .post('/users', (req) => {
    const user = UserSchema.parse(req.body);
    return db.createUser(user.name);
  })
  .get('/vehicles', () => {
    return db.getVehicles();
  })
  .post('/vehicles', (req) => {
    const vehicle = VehicleSchema.parse(req.body);
    return db.createVehicle(vehicle.type, vehicle.model, vehicle.userId);
  })
  .listen(port);

console.log(`Server running at http://localhost:${port}`);
