import { Scene } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const List = class extends BaseRequest<Array<Scene>> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/storyboards/{storyboard_id}/scenes"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToArray(Scene, response)
  }
}

export const Create = class extends BaseRequest<Scene> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/projects/{project_id}/storyboards/{storyboard_id}/scenes"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Scene, response)
  }
}

export const Update = class extends BaseRequest<Scene> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/storyboards/{storyboard_id}/scenes/{scene_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Scene, response)
  }
}

export const Destroy = class extends BaseRequest<Scene> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/projects/{project_id}/storyboards/{storyboard_id}/scenes/{scene_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Scene, response)
  }
}
