import { BaseRequest, Scheme } from "../BaseRequest"
import { RoadmapBodySchema, RoadmapBoxSchema, RoadmapListSchema, type RoadmapBoxType, type RoadmapListType } from '@/schemas/project_misc'

class ListRequest extends BaseRequest<RoadmapListType> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/roadmaps" ],
  })

  schema = RoadmapListSchema
}
export const List = () => new ListRequest()


class CreateRequest extends BaseRequest<RoadmapBoxType> {
  scheme = Scheme.post({
    endpoint: "/svc/v2/projects/{project_id}/roadmaps",
    relatedKeys: [ [ "/roadmaps" ] ]
  })

  schema = RoadmapBoxSchema
  bodySchema = RoadmapBodySchema
}
export const Create = () => new CreateRequest()


class UpdateRequest extends BaseRequest<RoadmapBoxType> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/roadmaps/{roadmap_id}",
    relatedKeys: [ [ "/roadmaps", "/{roadmap_id}" ] ]
  })

  schema = RoadmapBoxSchema
  bodySchema = RoadmapBodySchema
}
export const Update = () => new UpdateRequest()


class DestroyRequest extends BaseRequest<RoadmapBoxType> {
  scheme = Scheme.delete({
    endpoint: "/svc/v2/projects/{project_id}/roadmaps/{roadmap_id}",
    relatedKeys: [ [ "/roadmaps" ] ]
  })

  schema = RoadmapBoxSchema
}
export const Destroy = () => new DestroyRequest()
