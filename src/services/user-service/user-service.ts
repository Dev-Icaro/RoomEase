import { ApiValidationError } from "../../errors/api-errors";
import { ErrorFormatter } from "../../helpers/error-formatter";
import { User } from "../../models/user";
import {
  ICreateUserParams,
  IUpdateUserParams,
  IUserRepository,
} from "../../repositories/user-repository/protocols";
import { ErrorMessage } from "../../types/error-message";
import { userSchema } from "../../validators/schemas/user-schema";
import { IUserService } from "./protocols";

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async getAll(): Promise<User[]> {
    return await this.userRepository.getAll();
  }

  async getById(id: number): Promise<User> {
    return await this.userRepository.getById(id);
  }

  async create(params: ICreateUserParams): Promise<User> {
    if (Object.keys(params as object).length === 0) {
      throw new Error(ErrorFormatter.missingArg("params"));
    }

    await userSchema.validate(params, { abortEarly: false }).catch((err) => {
      throw new Error(err);
    });

    return this.userRepository.create(params);
  }

  async update(params: IUpdateUserParams, id: number): Promise<User> {
    if (Object.keys(params as object).length === 0) {
      throw new Error(ErrorFormatter.missingArg("params"));
    }

    for (const key in params) {
      await userSchema.validateAt(key, params).catch((err) => {
        throw new ApiValidationError({ message: err.message });
      });
    }

    return await this.userRepository.update(params, id);
  }

  async delete(id: number): Promise<User> {
    return await this.userRepository.delete(id);
  }
}
