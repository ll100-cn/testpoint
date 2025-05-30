import * as t from "@/lib/transforms"
import { TaskUpshot } from "./TaskUpshot"
import { Issue } from "./Issue"
import { Task } from "./Task"

export class TaskBox {
  @t.Klass(Task) task!: Task

  @t.Klass(TaskUpshot) task_upshots: TaskUpshot[] | null = null
  @t.Klass(Issue) issues: Issue[] | null = null
}