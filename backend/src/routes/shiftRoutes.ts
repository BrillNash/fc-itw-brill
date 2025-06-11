import express from 'express';
import { createShiftHandler, deleteShiftHandler, getShiftsHandler, updateShiftHandler } from '../controllers/ShiftController';

const router = express.Router();

router.get('/', getShiftsHandler);
router.post('/', createShiftHandler);
router.put('/:id', updateShiftHandler);
router.delete('/', deleteShiftHandler);

export default router;
