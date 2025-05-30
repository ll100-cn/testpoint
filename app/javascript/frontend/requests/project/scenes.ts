import { Scene, SceneBox, ScenePage } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const List = class extends BaseRequest<ScenePage<SceneBox>> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/v2/projects/{project_id}/storyboards/{storyboard_id}/scenes"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(ScenePage<SceneBox>, response)
  }
}

export const Create = class extends BaseRequest<SceneBox> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/v2/projects/{project_id}/storyboards/{storyboard_id}/scenes"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(SceneBox, response)
  }
}

export const Update = class extends BaseRequest<SceneBox> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/v2/projects/{project_id}/storyboards/{storyboard_id}/scenes/{scene_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(SceneBox, response)
  }
}

export const Destroy = class extends BaseRequest<SceneBox> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/v2/projects/{project_id}/storyboards/{storyboard_id}/scenes/{scene_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(SceneBox, response)
  }
}
