import { BaseRequest, Scheme } from "../BaseRequest"
import {
  StoryboardBodySchema,
  StoryboardBoxSchema,
  StoryboardListSchema,
  type StoryboardBoxType,
  type StoryboardListType,
} from '@/schemas/project_misc'

class ListRequest extends BaseRequest<StoryboardListType> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/storyboards" ],
  })

  schema = StoryboardListSchema
}
export const List = () => new ListRequest()


class GetRequest extends BaseRequest<StoryboardBoxType> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/storyboards/{storyboard_id}" ],
  })

  schema = StoryboardBoxSchema
}
export const Get = () => new GetRequest()


class CreateRequest extends BaseRequest<StoryboardBoxType> {
  scheme = Scheme.post({
    endpoint: "/svc/v2/projects/{project_id}/storyboards",
    relatedKeys: [ [ "/storyboards" ] ]
  })

  schema = StoryboardBoxSchema
  bodySchema = StoryboardBodySchema
}
export const Create = () => new CreateRequest()


class UpdateRequest extends BaseRequest<StoryboardBoxType> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/storyboards/{storyboard_id}",
    relatedKeys: [ [ "/storyboards", "/{storyboard_id}" ] ]
  })
  headers = { 'Content-Type': 'application/json' }
  schema = StoryboardBoxSchema
  bodySchema = StoryboardBodySchema
}
export const Update = () => new UpdateRequest()


class DestroyRequest extends BaseRequest<StoryboardBoxType> {
  scheme = Scheme.delete({
    endpoint: "/svc/v2/projects/{project_id}/storyboards/{storyboard_id}",
    relatedKeys: [ [ "/storyboards" ] ]
  })

  schema = StoryboardBoxSchema
}
export const Destroy = () => new DestroyRequest()
