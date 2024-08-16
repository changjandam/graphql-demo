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
  .post('/users', (req) => {
    const user = UserSchema.parse(req.body);
    return db.createUser(user.name);
  })
  .get('/vehicles', () => {
    return db.getVehicles();
  })
  .get('/vehicles/:id', ({ params: { id } }) => {
    return db.getVehicleById(Number(id));
  })
  .post('/vehicles', (req) => {
    const vehicle = VehicleSchema.parse(req.body);
    return db.createVehicle(vehicle.type, vehicle.model, vehicle.userId);
  })
  .listen(port);

console.log(`Server running at http://localhost:${port}`);
