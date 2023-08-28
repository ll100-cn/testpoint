import { Type } from "class-transformer"
import { Task } from "./Task"
import { TestCase } from "./TestCase"
import { TaskUpshot } from "./TaskUpshot"

export class TaskUpshotInfo extends TaskUpshot {
  @Type(() => TestCase)
  test_case: TestCase

  @Type(() => Task)
  task: Task
}
