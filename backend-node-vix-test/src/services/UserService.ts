import bcrypt from "bcryptjs";
import { UserModel } from "../models/UserModel";
import { userCreatedSchema } from "../types/validations/User/createUser";

export class UserService {
  constructor() {}

  private userModel = new UserModel();

  async register(data: unknown) {
    const validateData = userCreatedSchema.parse(data);

    const hashedPassword = await bcrypt.hash(validateData.password, 10);

    const createdUser = await this.userModel.createUser({
      ...validateData,
      password: hashedPassword,
    });

    return createdUser;
  }
}
