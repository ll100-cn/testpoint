import { CommentBox, CommentPage } from "@/models"
import type { AxiosResponse } from "axios"
import { BaseRequest } from "../BaseRequest"

class CreateRequest extends BaseRequest<CommentBox> {
  method = "POST"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issues", "/{issue_id}", "/comments" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CommentBox, response)
  }
}
export const Create = () => new CreateRequest()


class ListRequest extends BaseRequest<CommentPage<CommentBox>> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issues", "/{issue_id}", "/comments" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CommentPage<CommentBox>, response)
  }
}
export const List = () => new ListRequest()


class UpdateRequest extends BaseRequest<CommentBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issues", "/{issue_id}", "/comments", "/{comment_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CommentBox, response)
  }
}
export const Update = () => new UpdateRequest()


class ConvertRequest extends BaseRequest<CommentBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issues", "/{issue_id}", "/comments", "/{comment_id}", "/convert" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CommentBox, response)
  }
}
export const Convert = () => new ConvertRequest()


class DestroyRequest extends BaseRequest<CommentBox> {
  method = "DELETE"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/issues", "/{issue_id}", "/comments", "/{comment_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CommentBox, response)
  }
}
export const Destroy = () => new DestroyRequest()
