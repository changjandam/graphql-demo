import express from 'express';
import * as db from './db.js';
import { UserSchema, VehicleSchema } from './schema.js';

const app = express();
app.use(express.json());

app.get('/', (_, res) => {
  res.send('Hello, World!');
});

app.get('/users', (_, res) => {
  db.getUsers((users) => {
    res.json(users);
  });
});

app.get('/users/:id', (req, res) => {
  // const user = db.getUserById(Number(req.params.id));
  // res.json(user);
  db.getUserById(Number(req.params.id), (user) => {
    res.json(user);
  });
});

app.get('/users/:id/vehicles', (req, res) => {
  // const vehicles = db.getVehicleByUserId(Number(req.params.id));
  // res.json(vehicles);
  db.getVehicleByUserId(Number(req.params.id), (vehicles) => {
    res.json(vehicles);
  });
});

app.post('/users', (req, res) => {
  // const user = UserSchema.parse(req.body);
  // const newUser = db.createUser(user.name);
  // res.json(newUser);
  const user = UserSchema.parse(req.body);
  db.createUser(user.name, (newUser) => {
    res.json(newUser);
  });
});

app.get('/vehicles', (_, res) => {
  // res.json(db.getVehicles());
  db.getVehicles((vehicles) => {
    res.json(vehicles);
  });
});

app.post('/vehicles', (req, res) => {
  // const vehicle = VehicleSchema.parse(req.body);
  // const newVehicle = db.createVehicle(
  //   vehicle.type,
  //   vehicle.model,
  //   vehicle.userId
  // );
  // res.json(newVehicle);
  const vehicle = VehicleSchema.parse(req.body);
  db.createVehicle(vehicle, (newVehicle) => {
    res.json(newVehicle);
  });
});

const PORT = 4321;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
