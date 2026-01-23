import bcrypt from "bcryptjs";
import { UserModel } from "../models/UserModel";
import { loginSchema } from "../types/validations/User/loginUser";
import { AppError } from "../errors/AppError";
import { STATUS_CODE } from "../constants/statusCode";
import { genToken } from "../utils/jwt";

export class LoginService {
  private userModel = new UserModel();

  async login(data: unknown) {
    const validateData = loginSchema.parse(data);

    const user = await this.userModel.findByEmail(validateData.email);
    if (!user) {
      throw new AppError("Invalid email or password", STATUS_CODE.UNAUTHORIZED);
    }

    const passwordMatch = await bcrypt.compare(
      validateData.password,
      user.password,
    );
    if (!passwordMatch) {
      throw new AppError("Invalid email or password", STATUS_CODE.UNAUTHORIZED);
    }

    const token = genToken({
      idUser: user.idUser,
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user: {
        idUser: user.idUser,
        username: user.username,
        email: user.email,
        role: user.role,
        profileImgUrl: user.profileImgUrl,
        isActive: user.isActive,
        idBrandMaster: user.idBrandMaster,
      },
    };
  }
}
