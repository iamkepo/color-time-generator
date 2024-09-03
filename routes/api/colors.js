import express from 'express';
import ColorsController from '../../controllers/colorsController.js';

const router = express.Router();
const colorsController = new ColorsController();

/**
 * @swagger
 * tags:
 *   name: Colors
 *   description: API for managing colors
 */


export default router;
