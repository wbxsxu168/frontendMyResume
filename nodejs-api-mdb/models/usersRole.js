import { model, Schema } from "mongoose";

const usersRoleSchema = new Schema({ 
  roleID: {
    type: String,
    enum: ["1", "2", "3", "4"],  //   ADMIN(1); USERADMIN(2); USER(3); GUEST(4)
    default: "3",
    required: true,
  },
  roleName: {
    type: String,
    trim: true,
    required: true,
  },
}, 
{ timestamps: true }
);

const UsersRoleModel = model("UserRoles", usersRoleSchema);
export default UsersRoleModel;