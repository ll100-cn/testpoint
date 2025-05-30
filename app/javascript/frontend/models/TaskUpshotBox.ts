import * as t from '@/lib/transforms'
import { Task } from './Task'
import { TaskUpshot } from './TaskUpshot'
import { TestCase } from './TestCase'
import { Pagination } from './Pagination'

export class TaskUpshotBox {
  @t.Klass(TaskUpshot) task_upshot!: TaskUpshot

  @t.Klass(Task) task: Task | null = null
  @t.Klass(TestCase) test_case: TestCase | null = null

  is_ignored(): boolean {
    return this.task?.ignore_at != null
  }
}

export class TaskUpshotPage<Box extends TaskUpshotBox> extends Pagination<Box> {
  @t.Klass(TaskUpshotBox) list: Box[] = []
}