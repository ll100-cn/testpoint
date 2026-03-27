import { BaseRequest, Scheme } from "../BaseRequest"
import {
  CommentBodySchema,
  CommentBoxSchema,
  CommentConvertBodySchema,
  CommentListSchema,
  type CommentBoxType,
  type CommentListType,
} from '@/schemas/comment'

class CreateRequest extends BaseRequest<CommentBoxType> {
  scheme = Scheme.post({
    endpoint: "/svc/v2/projects/{project_id}/issues/{issue_id}/comments",
    relatedKeys: [ [ "/issues", "/{issue_id}" ], [ "/comments" ] ]
  })

  schema = CommentBoxSchema
  bodySchema = CommentBodySchema
}
export const Create = () => new CreateRequest()


class ListRequest extends BaseRequest<CommentListType> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/issues/{issue_id}", "/comments" ],
  })

  schema = CommentListSchema
}
export const List = () => new ListRequest()


class UpdateRequest extends BaseRequest<CommentBoxType> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/issues/{issue_id}/comments/{comment_id}",
    relatedKeys: [ [ "/issues", "/{issue_id}" ], [ "/comments", "/{comment_id}" ] ]
  })

  schema = CommentBoxSchema
  bodySchema = CommentBodySchema
}
export const Update = () => new UpdateRequest()


class ConvertRequest extends BaseRequest<CommentBoxType> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/issues/{issue_id}/comments/{comment_id}/convert",
    relatedKeys: [ [ "/issues", "/{issue_id}" ], [ "/comments", "/{comment_id}" ] ]
  })

  schema = CommentBoxSchema
  bodySchema = CommentConvertBodySchema
}
export const Convert = () => new ConvertRequest()


class DestroyRequest extends BaseRequest<CommentBoxType> {
  scheme = Scheme.delete({
    endpoint: "/svc/v2/projects/{project_id}/issues/{issue_id}/comments/{comment_id}",
    relatedKeys: [ [ "/issues", "/{issue_id}"], [ "/comments" ] ]
  })

  schema = CommentBoxSchema
}
export const Destroy = () => new DestroyRequest()
