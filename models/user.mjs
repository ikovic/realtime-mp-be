import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  google: {
    required: false,
    id: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  facebook: {
    required: false,
    id: {
      type: String,
    },
    name: {
      type: String,
    },
  },
});

export default mongoose.model('User', UserSchema);
