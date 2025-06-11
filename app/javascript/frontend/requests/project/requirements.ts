import { Requirement, RequirementBox, RequirementPage } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const List = class extends BaseRequest<RequirementPage<RequirementBox>> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/storyboards", "/{storyboard_id}", "/requirements" ]
  graph = 'counts'

  processResponse(response: AxiosResponse) {
    return this.responseToObject(RequirementPage<RequirementBox>, response)
  }
}

export const Create = class extends BaseRequest<RequirementBox> {
  method = "POST"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/storyboards", "/{storyboard_id}", "/requirements" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(RequirementBox, response)
  }
}

export const Update = class extends BaseRequest<RequirementBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/storyboards", "/{storyboard_id}", "/requirements", "/{requirement_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(RequirementBox, response)
  }
}

export const Destroy = class extends BaseRequest<RequirementBox> {
  method = "DELETE"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/storyboards", "/{storyboard_id}", "/requirements", "/{requirement_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(RequirementBox, response)
  }
}
