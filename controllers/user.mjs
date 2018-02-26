import users from '../models/user';

export const createUser = userData => users.create(userData);

export const findByGoogleId = googleId => users.findOne({ 'google.id': googleId });

export const findById = id => users.findById(id);
