import { Subscription } from "@/models"
import BaseObjectRequest from "./BaseObjectRequest"

export class SubscriptionDestroy extends BaseObjectRequest<Subscription> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/subscription"
    this.klass = Subscription
  }
}
