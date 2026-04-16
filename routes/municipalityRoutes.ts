import express from 'express';
import * as controller from '../controllers/municipalityController.js';

const router = express.Router();

router.get('/', controller.browse);
router.get('/:id', controller.read);
router.post('/', controller.add);
router.put('/:id', controller.edit);
router.delete('/:id', controller.remove);

export default router;
