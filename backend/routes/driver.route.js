import express from "express";
import {
  deleteDriverById,
  deleteDriverInfo,
  getAllDriverDetails,
  getDriverById,
  getOwnData,
  postDriverInfo,
  updateDriverInfo,
  viewDriverInfo,
} from "../controllers/driver.controllers.js";
import upload from "../middlewares/multer.middleware.js";

const driverRouter = express.Router();

driverRouter.post(
  "/postInfo",
  upload.fields([
    { name: "driverImage", maxCount: 1 },
    { name: "driverAdhaar", maxCount: 1 },
    { name: "driverPan", maxCount: 1 },
    { name: "drivingLicence", maxCount: 1 },
]),
  postDriverInfo
);
driverRouter.put(
  "/updateInfo",
  upload.fields([
    { name: "driverImage", maxCount: 1 },
    { name: "driverAdhaar", maxCount: 1 },
    { name: "driverPan", maxCount: 1 },
    { name: "drivingLicence", maxCount: 1 },
  ]),
  updateDriverInfo
);
driverRouter.get("/getInfoById/:id", getDriverById);
driverRouter.get("/getAllDriver", getAllDriverDetails);
driverRouter.get("/viewDriverInfo", viewDriverInfo);
driverRouter.get("/getOwn", getOwnData);
driverRouter.delete("/deleteDriverInfo", deleteDriverInfo);
driverRouter.delete("/deleteDriverById/:id", deleteDriverById);

export default driverRouter;
