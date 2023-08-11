import { ApiNotFoundError, ApiValidationError } from "../../errors/api-errors";
import {
  ErrorFormatter,
  createErrorMessage,
} from "../../helpers/error-helpers";
import { User } from "../../models/user";
import {
  ICreateUserParams,
  IUpdateUserParams,
  IUserRepository,
} from "../../repositories/user-repository/protocols";
import { userSchema } from "../../validators/schemas/user-schema";
import { IUserService } from "./protocols";

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async getAll(): Promise<User[]> {
    return await this.userRepository.getAll();
  }

  async getById(id: number): Promise<User> {
    const user = await this.userRepository.getById(id);

    if (!user) {
      const msg = ErrorFormatter.notFound("user");
      throw new ApiNotFoundError(createErrorMessage(msg));
    }

    return user;
  }

  async create(params: ICreateUserParams): Promise<User> {
    if (Object.keys(params as object).length === 0) {
      const msg = ErrorFormatter.missingArg("params");
      throw new ApiValidationError({ message: msg });
    }

    await userSchema.validate(params, { abortEarly: false }).catch((err) => {
      throw new ApiValidationError(err);
    });

    return this.userRepository.create(params);
  }

  async update(params: IUpdateUserParams, id: number): Promise<User> {
    const userExists = this.userRepository.getById(id);
    if (!userExists) {
      const msg = ErrorFormatter.notFound("user");
      throw new ApiNotFoundError(createErrorMessage(msg));
    }

    if (Object.keys(params as object).length === 0) {
      const msg = ErrorFormatter.missingArg("params");
      throw new ApiValidationError(createErrorMessage(msg));
    }

    for (const key in params) {
      await userSchema.validateAt(key, params).catch((err) => {
        throw new ApiValidationError(createErrorMessage(err));
      });
    }

    await this.getById(id);

    return await this.userRepository.update(params, id);
  }

  async delete(id: number): Promise<User> {
    const user = await this.userRepository.getById(id);

    if (!user) {
      const msg = ErrorFormatter.notFound("user");
      throw new ApiNotFoundError(createErrorMessage(msg));
    }

    await this.userRepository.delete(id);

    return user;
  }
}
