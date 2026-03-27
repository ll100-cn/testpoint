import * as t from '@/lib/transforms'
import { Task } from './Task'
import { TaskUpshot } from './TaskUpshot'
import { TestCase } from './TestCase'
import { Pagination } from './Pagination'
import type { OmitByValue } from 'utility-types'

export class TaskUpshotBoxImpl {
  @t.Klass(TaskUpshot) task_upshot!: TaskUpshot

  @t.Klass(Task) task: Task | null = null
  @t.Klass(TestCase) test_case: TestCase | null = null
}

export type TaskUpshotBox = OmitByValue<TaskUpshotBoxImpl, Function>

export class TaskUpshotPage<Box extends TaskUpshotBox> extends Pagination<Box> {
  @t.Klass(TaskUpshotBoxImpl) list: Box[] = []
}