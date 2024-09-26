import express from 'express'
import { verifyAdmin } from '../utils/verifyToken.js';
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from '../controllers/room.js';

const router = express.Router();

// create Room
router.post("/:hotelid", verifyAdmin, createRoom);

// update Room
router.put("/:id", verifyAdmin, updateRoom);
router.put("/availability/:id", updateRoomAvailability);

// Delete Room
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

// get Room
router.get("/:id", getRoom);

// get Rooms
router.get("/", getRooms);

export default router;