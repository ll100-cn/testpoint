import { Category } from "./Category"
import { Member } from "./Member"
import { Milestone } from "./Milestone"

export class IssueSummaryBox {
  by_category: { category: Category, count: number }[] = []
  by_milestone: { milestone: Milestone, count: number }[] = []
  by_assignee: { assignee: Member, count: number }[] = []
  by_creator: { creator: Member, count: number }[] = []
}
