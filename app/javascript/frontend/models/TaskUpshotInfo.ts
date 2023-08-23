import { Task } from "./Task"
import { TestCase } from "./TestCase"

type TaskUpshotInfoState = "" | "pending" | "pass" | "failure"
type TaskUpshotInfoStateOverride = "" | "pass" | "failure"

export class TaskUpshotInfo {
  id: number
  state: TaskUpshotInfoState
  state_override: TaskUpshotInfoStateOverride
  test_case: TestCase
  task: Task
}
