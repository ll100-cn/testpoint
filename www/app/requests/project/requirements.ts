import { BaseRequest, Scheme } from "../BaseRequest"
import {
  RequirementBodySchema,
  RequirementBoxSchema,
  RequirementListSchema,
  RequirementPageSchema,
  type RequirementBoxType,
  type RequirementListType,
  type RequirementPageType,
} from '@/schemas/project_misc'

class ListRequest extends BaseRequest<RequirementListType> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/storyboards/{storyboard_id}", "/requirements" ],
  })
  graph = 'counts'

  schema = RequirementListSchema
}
export const List = () => new ListRequest()


class PageRequest extends BaseRequest<RequirementPageType> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/storyboards/{storyboard_id}", "/requirements" ],
  })
  graph = 'counts'

  schema = RequirementPageSchema
}
export const Page = () => new PageRequest()


class CreateRequest extends BaseRequest<RequirementBoxType> {
  scheme = Scheme.post({
    endpoint: "/svc/v2/projects/{project_id}/storyboards/{storyboard_id}/requirements",
    relatedKeys: [ [ "/storyboards", "/{storyboard_id}" ], [ "/requirements" ] ]
  })

  schema = RequirementBoxSchema
  bodySchema = RequirementBodySchema
}
export const Create = () => new CreateRequest()


class UpdateRequest extends BaseRequest<RequirementBoxType> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/storyboards/{storyboard_id}/requirements/{requirement_id}",
    relatedKeys: [ [ "/storyboards", "/{storyboard_id}" ], [ "/requirements", "/{requirement_id}" ] ]
  })

  schema = RequirementBoxSchema
  bodySchema = RequirementBodySchema
}
export const Update = () => new UpdateRequest()


class DestroyRequest extends BaseRequest<RequirementBoxType> {
  scheme = Scheme.delete({
    endpoint: "/svc/v2/projects/{project_id}/storyboards/{storyboard_id}/requirements/{requirement_id}",
    relatedKeys: [ [ "/storyboards", "/{storyboard_id}" ], [ "/requirements" ] ]
  })

  schema = RequirementBoxSchema
}
export const Destroy = () => new DestroyRequest()
