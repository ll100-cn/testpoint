import { Type } from "class-transformer"
import { Issue } from "./Issue"
import { Task } from "./Task"
import { TaskUpshot } from "./TaskUpshot"

export class TaskInfo extends Task {
  @Type(() => TaskUpshot)
  task_upshots: TaskUpshot[]

  @Type(() => Issue)
  issues: Issue[]
}
