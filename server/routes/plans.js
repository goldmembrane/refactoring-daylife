const express = require('express');
const router = express.Router();

const { plansController } = require('../controller');

router.get('/goals/get',plansController.goals.get);
router.post('/goals/post', plansController.goals.post);
router.put('/goals/put', plansController.goals.put);
router.delete('/goals/delete', plansController.goals.delete);

router.get('/schedules/get',plansController.schedules.get);
router.post('/schedules/post', plansController.schedules.post);
router.put('/schedules/put', plansController.schedules.put);
router.delete('/schedules/delete', plansController.schedules.delete);


module.exports = router;
