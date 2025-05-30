import { Requirement, RequirementBox, RequirementPage } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const List = class extends BaseRequest<RequirementPage<RequirementBox>> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/v2/projects/{project_id}/storyboards/{storyboard_id}/requirements"
    this.graph = 'counts'
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(RequirementPage<RequirementBox>, response)
  }
}

export const Create = class extends BaseRequest<RequirementBox> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/v2/projects/{project_id}/storyboards/{storyboard_id}/requirements"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(RequirementBox, response)
  }
}

export const Update = class extends BaseRequest<RequirementBox> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/v2/projects/{project_id}/storyboards/{storyboard_id}/requirements/{requirement_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(RequirementBox, response)
  }
}

export const Destroy = class extends BaseRequest<RequirementBox> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/v2/projects/{project_id}/storyboards/{storyboard_id}/requirements/{requirement_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(RequirementBox, response)
  }
}
