import mongoose, { mongo } from "mongoose";

//Propriedades requeridas
interface UserAttrs {
  email: string;
  password: string;
}

//Propriedades com mongoose
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

//User Document
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

export { User };
