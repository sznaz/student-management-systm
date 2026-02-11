import { Service } from "typedi";
import bcrypt from "bcryptjs";
import Responses from "../../config/responses";
import { ITaskModel } from "../../models/task.model";
import { IUserModel, UserRole } from "../../models/user.model";
import { IResponse } from "../../types";
import TaskQueries from "../queries/task.queries";
import UserQueries from "../queries/user.queries";

@Service()
class AdminService {
  constructor(
    private readonly _userQueries: UserQueries,
    private readonly _taskQueries: TaskQueries
  ) {}

  public addStudent = async (payload: {
    name: string;
    email: string;
    department: string;
    password: string;
  }): Promise<IResponse<IUserModel | null>> => {
    const existing = await this._userQueries.findByEmail(payload.email);

    if (existing) {
      return Responses.badRequest("Email already exists");
    }

    const hashedPassword: string = await bcrypt.hash(payload.password, 10);

    const student: IUserModel = await this._userQueries.create({
      ...payload,
      password: hashedPassword,
      role: UserRole.STUDENT,
    });

    return Responses.ok(student);
  };

  public assignTask = async (payload: {
    studentId: string;
    title: string;
    description?: string;
    dueTime: Date;
  }): Promise<IResponse<ITaskModel | null>> => {
    const student = await this._userQueries.findById(payload.studentId);

    if (!student || student.role !== UserRole.STUDENT) {
      return Responses.badRequest("Invalid student");
    }

    const task: ITaskModel = await this._taskQueries.create({
      title: payload?.title,
      description: payload?.description as string,
      dueTime: payload?.dueTime,
      student: student?._id,
    });

    return Responses.ok(task);
  };
  public getAllUsers = async (): Promise<IResponse<IUserModel[] | null>> => {
    const users = await this._userQueries.getAll();
    return Responses.ok(users);
  };
}

export default AdminService;
