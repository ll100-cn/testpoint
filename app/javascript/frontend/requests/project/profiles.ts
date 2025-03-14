import { Profile } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Get = class extends BaseRequest<Profile> {
  constructor(project_id: number) {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/profile"
    this.interpolations.project_id = project_id
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Profile, response)
  }
}

export const Update = class extends BaseRequest<Profile> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/profile"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Profile, response)
  }
}
