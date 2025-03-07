import { Roadmap } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const List = class extends BaseRequest<Array<Roadmap>> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/roadmaps"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToArray(Roadmap, response)
  }
}

export const Create = class extends BaseRequest<Roadmap> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/projects/{project_id}/roadmaps"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Roadmap, response)
  }
}

export const Update = class extends BaseRequest<Roadmap> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/roadmaps/{roadmap_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Roadmap, response)
  }
}

export const Destroy = class extends BaseRequest<Roadmap> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/projects/{project_id}/roadmaps/{roadmap_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Roadmap, response)
  }
}
