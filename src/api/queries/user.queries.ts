import { Service } from "typedi";
import userModel, { IUserModel } from "../../models/user.model";

@Service()
class UserQueries {
  public create = async (payload: Partial<IUserModel>): Promise<IUserModel> => {
    return userModel.create(payload);
  };

  public findByEmail = async (email: string): Promise<IUserModel | null> => {
    return userModel.findOne({ email }).exec();
  };

  public findById = async (id: string): Promise<IUserModel | null> => {
    return userModel.findById(id).exec();
  };
  public getAll = async (): Promise<IUserModel[] | null> => {
    return userModel.find().exec();
  };
}

export default UserQueries;
