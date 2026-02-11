import { Service } from "typedi";
import { Types } from "mongoose";
import taskModel, { ITaskModel, TaskStatus } from "../../models/task.model";

@Service()
class TaskQueries {
  public create = async (payload: {
    title: string;
    description?: string;
    dueTime: Date;
    student: Types.ObjectId;
  }): Promise<ITaskModel> => {
    return taskModel.create({
      ...payload,
      status: TaskStatus.PENDING,
    });
  };

  public findByStudent = async (studentId: string): Promise<ITaskModel[]> => {
    return taskModel
      .find({
        student: new Types.ObjectId(studentId),
      })
      .lean()
      .exec();
  };

  public updateStatus = async (
    taskId: string,
    status: TaskStatus
  ): Promise<ITaskModel | null> => {
    return taskModel
      .findByIdAndUpdate(taskId, { status }, { new: true })
      .exec();
  };
}

export default TaskQueries;
