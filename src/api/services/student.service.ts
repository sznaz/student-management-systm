import { Service } from "typedi";
import Responses from "../../config/responses";
import { ITaskModel, TaskStatus } from "../../models/task.model";
import { IResponse } from "../../types";
import TaskQueries from "../queries/task.queries";

interface ITaskResponse {
  _id: string;
  title: string;
  description?: string;
  dueTime: Date;
  status: string;
}

@Service()
class StudentService {
  constructor(private readonly _taskQueries: TaskQueries) {}

  public getTasks = async (
    studentId: string
  ): Promise<IResponse<ITaskResponse[]>> => {
    const tasks: ITaskModel[] = await this._taskQueries.findByStudent(
      studentId
    );

    const formattedTasks: ITaskResponse[] = tasks.map((task) => {
      let computedStatus: string = task.status;

      if (
        task.status === TaskStatus.PENDING &&
        new Date(task.dueTime) < new Date()
      ) {
        computedStatus = "overdue";
      }

      return {
        _id: task._id.toString(),
        title: task.title,
        description: task.description as string,
        dueTime: task.dueTime,
        status: computedStatus,
      };
    });

    return Responses.ok(formattedTasks);
  };

  public markCompleted = async (
    taskId: string
  ): Promise<IResponse<ITaskModel | null>> => {
    const updated: ITaskModel | null = await this._taskQueries.updateStatus(
      taskId,
      TaskStatus.COMPLETED
    );

    if (!updated) {
      return Responses.notFound("Task not found");
    }

    return Responses.ok(updated);
  };
}

export default StudentService;
