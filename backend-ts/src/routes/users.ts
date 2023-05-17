import express from 'express';
import {
  getList,
  getData,
  addData,
  deleteData,
  updateData,
} from '../controllers/users';

const router = express.Router();

router.route('/list').get(getList);
router.route('/').post(addData);
router.route('/:id').get(getData).put(updateData).delete(deleteData);

export default router;
