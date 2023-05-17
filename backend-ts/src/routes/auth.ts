import express from 'express';
import { body } from 'express-validator';
import { register, login, logout } from '../controllers/auth';

const router = express.Router();

// validator
const checkLogin = [
  body('email', 'password')
    .notEmpty()
    .withMessage('Please provide email and password'),
  body('email')
    .isEmail()
    .withMessage('Not a valid e-mail address'),
  body('password')
    .isLength({ min: 6, max: 1024 })
    .withMessage('Password: Please enter 6~1024 characters'),
];
const checkRegister = [
  ...checkLogin,
  body('username')
    .notEmpty()
    .withMessage('username is required')
    .isLength({ min: 3, max: 10 })
    .withMessage('Username: Please enter 3~10 characters'),
];

router.post('/register', checkRegister, register);
router.post('/login', checkLogin, login);
router.get('/logout', logout);

export default router;
