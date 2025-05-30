import { CommentBox, CommentPage } from "@/models"
import type { AxiosResponse } from "axios"
import { BaseRequest } from "../BaseRequest"

export const Create = class extends BaseRequest<CommentBox> {
  constructor() {
    super()
    this.method = "POST"
    this.endpoint = "/api/v2/projects/{project_id}/issues/{issue_id}/comments"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CommentBox, response)
  }
}

export const List = class extends BaseRequest<CommentPage<CommentBox>> {
  constructor() {
    super()
    this.method = "GET"
    this.endpoint = "/api/v2/projects/{project_id}/issues/{issue_id}/comments"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CommentPage<CommentBox>, response)
  }
}

export const Update = class extends BaseRequest<CommentBox> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/v2/projects/{project_id}/issues/{issue_id}/comments/{comment_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CommentBox, response)
  }
}

export const Convert = class extends BaseRequest<CommentBox> {
  constructor() {
    super()
    this.method = "PATCH"
    this.endpoint = "/api/v2/projects/{project_id}/issues/{issue_id}/comments/{comment_id}/convert"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CommentBox, response)
  }
}

export const Destroy = class extends BaseRequest<CommentBox> {
  constructor() {
    super()
    this.method = "DELETE"
    this.endpoint = "/api/v2/projects/{project_id}/issues/{issue_id}/comments/{comment_id}"
  }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CommentBox, response)
  }
}
