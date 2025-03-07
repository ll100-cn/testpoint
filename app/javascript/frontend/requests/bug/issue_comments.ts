import { Comment } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const Create = class extends BaseRequest<Comment> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/comments"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Comment, response)
  }
}

export const List = class extends BaseRequest<Array<Comment>> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/comments"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToArray(Comment, response)
  }
}

export const Update = class extends BaseRequest<Comment> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/comments/{comment_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Comment, response)
  }
}

export const Convert = class extends BaseRequest<Comment> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/comments/{comment_id}/convert"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Comment, response)
  }
}

export const Destroy = class extends BaseRequest<Comment> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/projects/{project_id}/issues/{issue_id}/comments/{comment_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(Comment, response)
  }
}
