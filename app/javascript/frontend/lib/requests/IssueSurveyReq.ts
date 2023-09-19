import { BaseArrayRequest } from "."
import BaseObjectRequest from "./BaseObjectRequest"
import { IssueSurvey } from "@/models"

export default {
  Create: class extends BaseObjectRequest<IssueSurvey> {
    constructor() {
      super()
      this.method = "POST"
      this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/issue_surveys"
      this.klass = IssueSurvey
    }
  },

  Destroy: class extends BaseObjectRequest<IssueSurvey> {
    constructor() {
      super()
      this.method = "DELETE"
      this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/issue_surveys/{issue_survey_id}"
      this.klass = IssueSurvey
    }
  },

  List: class extends BaseArrayRequest<IssueSurvey> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/issue_surveys"
      this.klass = IssueSurvey
    }
  },

  Update: class extends BaseObjectRequest<IssueSurvey> {
    constructor() {
      super()
      this.method = "PATCH"
      this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/issue_surveys/{issue_survey_id}"
      this.klass = IssueSurvey
    }
  }
}
