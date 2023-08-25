import { Type } from "class-transformer"
import { Task } from "./Task"
import { TaskUpshotInfo } from "./TaskUpshotInfo"
import { Issue } from "./Issue"

export class TaskInfo extends Task {
  @Type(() => TaskUpshotInfo)
  task_upshots: TaskUpshotInfo[]

  @Type(() => Issue)
  issues: Issue[]
}
