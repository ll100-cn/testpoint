import { CommentBox, CommentPage } from "@/models"
import type { AxiosResponse } from "axios"
import { BaseRequest } from "../BaseRequest"

export const Create = class extends BaseRequest<CommentBox> {
  method = "POST"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issues", "/{issue_id}", "/comments" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CommentBox, response)
  }
}

export const List = class extends BaseRequest<CommentPage<CommentBox>> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issues", "/{issue_id}", "/comments" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CommentPage<CommentBox>, response)
  }
}

export const Update = class extends BaseRequest<CommentBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issues", "/{issue_id}", "/comments", "/{comment_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CommentBox, response)
  }
}

export const Convert = class extends BaseRequest<CommentBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issues", "/{issue_id}", "/comments", "/{comment_id}", "/convert" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CommentBox, response)
  }
}

export const Destroy = class extends BaseRequest<CommentBox> {
  method = "DELETE"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issues", "/{issue_id}", "/comments", "/{comment_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CommentBox, response)
  }
}
