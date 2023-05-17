import { tryCatch, signToken, jwtToCookies } from '../utils';
import CustomError from '../customError';
import { Users } from '../models';

const register = tryCatch(async (req, res) => {
  const { username, email, password } = req.body;

  // 檢驗mail是否重複
  const emailExists = await Users.findOne({ email });

  if (emailExists) {
    throw new CustomError('Email already exists', 400);
  }

  const isFirstAccount = (await Users.countDocuments({})) === 0;

  const ret = await Users.create({
    username,
    email,
    password,
    role: isFirstAccount ? 'admin' : 'user',
  });

  const token = signToken(ret._id, ret.email);

  jwtToCookies(token, res);

  res.status(200).json({ result: 'ok', ret });
});

const login = tryCatch(async (req, res) => {
  const { email, password } = req.body;

  // 檢驗mail是否存在
  const user = await Users.findOne({ email });

  if (!user) {
    throw new CustomError('Invalid Credentials', 400);
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new CustomError('Invalid Credentials', 400);
  }

  const token = signToken(user._id, user.email);

  jwtToCookies(token, res);

  res.status(200).json({
    result: 'ok',
    ret: {
      email: user.email,
      username: user.username,
    },
  });
});

const logout = tryCatch(async (req, res) => {
  res
    .clearCookie('token')
    .status(200)
    .json({ result: 'ok' });
});

export {
  register,
  login,
  logout,
};
