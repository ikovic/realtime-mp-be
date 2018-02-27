import users from '../models/user';

export const createUser = userData => users.create(userData);

export const findByEmail = email => users.findOne({ email });

export const findById = id => users.findById(id);

export const updateById = (id, params) => users.update({ _id: id }, params);
