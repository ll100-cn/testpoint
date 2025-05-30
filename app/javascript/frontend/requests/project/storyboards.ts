import { Storyboard, StoryboardBox, StoryboardPage } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const List = class extends BaseRequest<StoryboardPage<StoryboardBox>> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/v2/projects/{project_id}/storyboards"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(StoryboardPage<StoryboardBox>, response)
  }
}

export const Get = class extends BaseRequest<StoryboardBox> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/v2/projects/{project_id}/storyboards/{storyboard_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(StoryboardBox, response)
  }
}

export const Create = class extends BaseRequest<StoryboardBox> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/v2/projects/{project_id}/storyboards"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(StoryboardBox, response)
  }
}

export const Update = class extends BaseRequest<StoryboardBox> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/v2/projects/{project_id}/storyboards/{storyboard_id}"
    this.headers = { 'Content-Type': 'application/json' }
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(StoryboardBox, response)
  }
}

export const Destroy = class extends BaseRequest<StoryboardBox> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/v2/projects/{project_id}/storyboards/{storyboard_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(StoryboardBox, response)
  }
}
