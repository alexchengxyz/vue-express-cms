import { Request } from 'express';
import { Users } from '../models';
import tryCatch from '../utils/tryCatch';
import CustomError from '../customError';

// 取得列表
const getList = tryCatch(async (req, res) => {
  const { order = 'desc' } = req.query;

  const sort: string = (typeof req.query.sort === 'string')
    ? req.query.sort
    : 'created_at';
  const firstResult = Number(req.query?.first_result) || 0;
  const maxResult = Number(req.query?.max_result) || 20;

  const ret = await Users
    .find({})
    .sort({ [sort]: order === 'desc' ? -1 : 1 })
    .skip(firstResult)
    .limit(maxResult);

  const total = await Users.countDocuments({});

  res.status(200).json({
    result: 'ok',
    ret,
    pagination: {
      first_result: firstResult,
      max_result: maxResult,
      total: total || 0,
    },
  });
});

// 取得單筆資料
const getData = tryCatch(async (req, res) => {
  const { id } = req.params;

  const ret = await Users.findOne({ _id: id });

  if (!ret) {
    throw new CustomError(`ID not found : ${id}`, 404);
  }

  res.status(200).json({ result: 'ok', ret });
});

interface DataReq extends Request {
  body: {
    name: string;
    username: string;
    enable: boolean;
  };
}

// 新增資料
const addData = tryCatch(async (req: DataReq, res) => {
  const {
    name,
    username,
    enable,
  } = req.body;

  const ret = new Users({ name, username, enable });

  await ret.save();

  res.status(200).json({ result: 'ok', ret });
});

// 更新單筆資料
const updateData = tryCatch(async (req: DataReq, res) => {
  const { id } = req.params;

  const ret = await Users.findOneAndUpdate({ _id: id.trim() }, req.body, {
    new: true, // 返回結果
    runValidators: true, // 驗證格式
  });

  if (!ret) {
    throw new CustomError(`ID not found : ${id}`, 404);
  }

  res.status(200).json({ result: 'ok', ret });
});

// 移除單筆資料
const deleteData = tryCatch(async (req, res) => {
  const { id } = req.params;

  const ret = await Users.findOneAndDelete({ _id: id });

  if (!ret) {
    throw new CustomError(`ID not found : ${id}`, 404);
  }

  res.status(200).json({ result: 'ok' });
});

export {
  getList,
  getData,
  addData,
  updateData,
  deleteData,
};
