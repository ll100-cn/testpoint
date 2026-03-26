import { BaseRequest, Scheme } from "../BaseRequest"
import { SceneBodySchema, SceneBoxSchema, SceneListSchema, type SceneBoxType, type SceneListType } from '@/schemas/project_misc'

class ListRequest extends BaseRequest<SceneListType> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/storyboards/{storyboard_id}", "/scenes" ],
  })

  schema = SceneListSchema
}
export const List = () => new ListRequest()


class CreateRequest extends BaseRequest<SceneBoxType> {
  scheme = Scheme.post({
    endpoint: "/svc/v2/projects/{project_id}/storyboards/{storyboard_id}/scenes",
    relatedKeys: [ [ "/storyboards", "/{storyboard_id}" ], [ "/scenes" ] ]
  })

  schema = SceneBoxSchema
  bodySchema = SceneBodySchema
}
export const Create = () => new CreateRequest()


class UpdateRequest extends BaseRequest<SceneBoxType> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/storyboards/{storyboard_id}/scenes/{scene_id}",
    relatedKeys: [ [ "/storyboards", "/{storyboard_id}" ], [ "/scenes", "/{scene_id}" ] ]
  })

  schema = SceneBoxSchema
  bodySchema = SceneBodySchema
}
export const Update = () => new UpdateRequest()


class DestroyRequest extends BaseRequest<SceneBoxType> {
  scheme = Scheme.delete({
    endpoint: "/svc/v2/projects/{project_id}/storyboards/{storyboard_id}/scenes/{scene_id}",
    relatedKeys: [ [ "/storyboards", "/{storyboard_id}" ], [ "/scenes" ] ]
  })

  schema = SceneBoxSchema
}
export const Destroy = () => new DestroyRequest()
