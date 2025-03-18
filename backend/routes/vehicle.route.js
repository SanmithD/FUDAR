import express from "express";
import {
  assignVehicleToDriver,
  createVehicle,
  deleteVehicleById,
  getAllVehicles,
  getVehicleByDriverId,
  getVehicleById,
  unassignVehicleFromDriver,
  updateVehicleById
} from "../controllers/driver.controllers.js";
import { staffAssignVehicle } from "../controllers/staffAssign.controllers.js";
import upload from "../middlewares/multer.middleware.js";

const vehicleRouter = express.Router();

vehicleRouter.post(
  "/create",
  upload.fields([
    { name: "vehicleImage", maxCount: 1 },
    { name: "emissionTest", maxCount: 1 },
    { name: "vehicleRC", maxCount: 1 },
    { name: "vehicleInsurance", maxCount: 1 },
  ]),
  createVehicle
);

vehicleRouter.get("/all", getAllVehicles);

vehicleRouter.get("/:id", getVehicleById);

vehicleRouter.put(
  "/:id",
  upload.fields([
    { name: "vehicleImage", maxCount: 1 },
    { name: "emissionTest", maxCount: 1 },
    { name: "vehicleRC", maxCount: 1 },
    { name: "vehicleInsurance", maxCount: 1 },
  ]),
  updateVehicleById
);

// Delete vehicle by ID
vehicleRouter.delete("/:id", deleteVehicleById);

// Assign vehicle to driver
vehicleRouter.post("/assign", assignVehicleToDriver);

// Unassign vehicle from driver
vehicleRouter.put("/unassign/:vehicleId/driver/:id", unassignVehicleFromDriver);

// Get vehicle by driver ID
vehicleRouter.get("/driver/:driverId", getVehicleByDriverId);
// vehicle routes

vehicleRouter.post("/staffAssign", staffAssignVehicle);

export default vehicleRouter;