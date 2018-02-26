import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  google: {
    id: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
  },
});

export default mongoose.model('User', UserSchema);
