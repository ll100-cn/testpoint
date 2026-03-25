import { type CommentBox, CommentBoxImpl, CommentPage } from "@/models"
import type { AxiosResponse } from "axios"
import { BaseRequest, Scheme } from "../BaseRequest"

class CreateRequest extends BaseRequest<CommentBox> {
  scheme = Scheme.post({
    endpoint: "/svc/v2/projects/{project_id}/issues/{issue_id}/comments",
    relatedKeys: [ [ "/issues", "/{issue_id}" ], [ "/comments" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CommentBoxImpl, response)
  }
}
export const Create = () => new CreateRequest()


class ListRequest extends BaseRequest<CommentPage<CommentBox>> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/issues/{issue_id}", "/comments" ],
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CommentPage<CommentBoxImpl>, response)
  }
}
export const List = () => new ListRequest()


class UpdateRequest extends BaseRequest<CommentBox> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/issues/{issue_id}/comments/{comment_id}",
    relatedKeys: [ [ "/issues", "/{issue_id}" ], [ "/comments", "/{comment_id}" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CommentBoxImpl, response)
  }
}
export const Update = () => new UpdateRequest()


class ConvertRequest extends BaseRequest<CommentBox> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/issues/{issue_id}/comments/{comment_id}/convert",
    relatedKeys: [ [ "/issues", "/{issue_id}" ], [ "/comments", "/{comment_id}" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CommentBoxImpl, response)
  }
}
export const Convert = () => new ConvertRequest()


class DestroyRequest extends BaseRequest<CommentBox> {
  scheme = Scheme.delete({
    endpoint: "/svc/v2/projects/{project_id}/issues/{issue_id}/comments/{comment_id}",
    relatedKeys: [ [ "/issues", "/{issue_id}"], [ "/comments" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(CommentBoxImpl, response)
  }
}
export const Destroy = () => new DestroyRequest()
