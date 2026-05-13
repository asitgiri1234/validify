import { Router } from 'express';
import {
  deploy,
  listRules,
  toggleAll,
  toggleRule,
} from '../controllers/validationController.js';

const router = Router();

router.get('/validation-rules', listRules);
router.post('/toggle-rule', toggleRule);
router.post('/toggle-all', toggleAll);
router.post('/deploy', deploy);

export default router;
