import { model, Schema } from "mongoose";

const usersSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true, 
    },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  roleIDs: {
    type: String,
    enum: ["1", "2", "3", "4"],  //   ADMIN(1); USERADMIN(2); USER(3); GUEST(4)
    default: "3",
  },
  refresh_token: {
    type: String,  
  },
  firstname: {
    type: String,
    trim: true,
    required: true,
  },
  lastname: {
    type: String,
    trim: true,
    required: true,
  },
  isAccountLocked: {
    type: Boolean,
    default: false,
  },
  isAccountActive: {
    type: Boolean,
    default: true,
  },
}, 
{ timestamps: true },
//{ autoCreate: false, autoIndex: false }
);

const Users = model("Users", usersSchema);

export default Users;