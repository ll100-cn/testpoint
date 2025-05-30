import { Milestone, MilestoneBox, MilestonePage } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Create = class extends BaseRequest<MilestoneBox> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/v2/projects/{project_id}/milestones"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MilestoneBox, response)
  }
}

export const Get = class extends BaseRequest<MilestoneBox> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/v2/projects/{project_id}/milestones/{id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MilestoneBox, response)
  }
}

export const List = class extends BaseRequest<MilestonePage<MilestoneBox>> {
  constructor(project_id: number) {
    super()
    this.method = "GET"
    this.endpoint = "/api/v2/projects/{project_id}/milestones"
    this.interpolations.project_id = project_id
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MilestonePage<MilestoneBox>, response)
  }
}

export const Update = class extends BaseRequest<MilestoneBox> {
  constructor() {
    super()
    this.method = "PUT"
    this.endpoint = "/api/v2/projects/{project_id}/milestones/{id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MilestoneBox, response)
  }
}

export const Destroy = class extends BaseRequest<MilestoneBox> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/v2/projects/{project_id}/milestones/{id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MilestoneBox, response)
  }
}

export const Archive = class extends BaseRequest<MilestoneBox> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/v2/projects/{project_id}/milestones/{id}/archive"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MilestoneBox, response)
  }
}

export const Active = class extends BaseRequest<MilestoneBox> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/v2/projects/{project_id}/milestones/{id}/active"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MilestoneBox, response)
  }
}
