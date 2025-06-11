import { Milestone, MilestoneBox, MilestonePage } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Create = class extends BaseRequest<MilestoneBox> {
  method = "POST"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/milestones" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MilestoneBox, response)
  }
}

export const Get = class extends BaseRequest<MilestoneBox> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/milestones", "/{id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MilestoneBox, response)
  }
}

export const List = class extends BaseRequest<MilestonePage<MilestoneBox>> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/milestones" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MilestonePage<MilestoneBox>, response)
  }
}

export const Update = class extends BaseRequest<MilestoneBox> {
  method = "PUT"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/milestones", "/{id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MilestoneBox, response)
  }
}

export const Destroy = class extends BaseRequest<MilestoneBox> {
  method = "DELETE"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/milestones", "/{id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MilestoneBox, response)
  }
}

export const Archive = class extends BaseRequest<MilestoneBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/milestones", "/{id}", "/archive" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MilestoneBox, response)
  }
}

export const Active = class extends BaseRequest<MilestoneBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/milestones", "/{id}", "/active" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MilestoneBox, response)
  }
}
