import { ProfileBox } from "@/models"
import type { AxiosResponse } from "axios"
import { BaseRequest } from "../BaseRequest"

export const Get = class extends BaseRequest<ProfileBox> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/profile" ]

  constructor(project_id: number) {
    super()
    this.interpolations.project_id = project_id
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(ProfileBox, response)
  }
}

export const Update = class extends BaseRequest<ProfileBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/profile" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(ProfileBox, response)
  }
}
