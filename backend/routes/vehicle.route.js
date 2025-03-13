import express from "express";
import {
    assignVehicleToDriver,
    createVehicle,
    deleteVehicleById,
    getAllVehicles,
    getVehicleByDriverId,
    getVehicleById,
    unassignVehicleFromDriver,
    updateVehicleById,
} from "../controllers/driver.controllers.js";
import upload from "../middlewares/multer.middleware.js";

const vehicleRouter = express.Router();

// Create a new vehicle
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

// Get all vehicles
vehicleRouter.get("/all", getAllVehicles);

// Get vehicle by ID
vehicleRouter.get("/:id", getVehicleById);

// Update vehicle by ID
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
vehicleRouter.post("/unassign", unassignVehicleFromDriver);

// Get vehicle by driver ID
vehicleRouter.get("/driver/:driverId", getVehicleByDriverId);

export default vehicleRouter;