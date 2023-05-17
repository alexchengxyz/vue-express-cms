import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

interface UserType {
  username: string;
  email: string;
  password: string;
  created_at: Date;
  enable: boolean;
  role: string;
}

export interface UserDocumentType extends UserType, Document {
  comparePassword(password: string): Promise<boolean>;
}

/**
 * username: 帳號
 * email: 信箱
 * password: 密碼
 * created_at: 建立時間
 * enable: 是否啟用
 * role: 角色
 */
const UsersSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minLength: 6,
    maxlength: 100,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  enable: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    require: true,
  },
}, { toJSON: { virtuals: true } });

// 定義虛擬 id，不影響 mongodb _id屬性
UsersSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// mongoose schema middLeware
UsersSchema.pre<UserDocumentType>('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

UsersSchema.methods.comparePassword = async function (candidatePw: string): Promise<boolean> {
  const isMatch = await bcrypt.compare(candidatePw, this.password);

  return isMatch;
};

export default model<UserDocumentType>('Users', UsersSchema);
