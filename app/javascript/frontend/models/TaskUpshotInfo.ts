import { Task } from "./Task"
import { TestCase } from "./TestCase"

export class TaskUpshotInfo {
  id: number
  state: string
  state_override: string | null
  test_case: TestCase
  task: Task
}