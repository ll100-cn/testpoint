import { Roadmap, type RoadmapBox, RoadmapBoxImpl, RoadmapPage } from "@/models"
import { BaseRequest, Scheme } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class ListRequest<Box extends RoadmapBox> extends BaseRequest<Box[]> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/roadmaps" ],
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(RoadmapPage<Box>, response).list
  }
}
export const List = () => new ListRequest()


class CreateRequest extends BaseRequest<RoadmapBox> {
  scheme = Scheme.post({
    endpoint: "/svc/v2/projects/{project_id}/roadmaps",
    relatedKeys: [ [ "/roadmaps" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(RoadmapBoxImpl, response)
  }
}
export const Create = () => new CreateRequest()


class UpdateRequest extends BaseRequest<RoadmapBox> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/roadmaps/{roadmap_id}",
    relatedKeys: [ [ "/roadmaps", "/{roadmap_id}" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(RoadmapBoxImpl, response)
  }
}
export const Update = () => new UpdateRequest()


class DestroyRequest extends BaseRequest<RoadmapBox> {
  scheme = Scheme.delete({
    endpoint: "/svc/v2/projects/{project_id}/roadmaps/{roadmap_id}",
    relatedKeys: [ [ "/roadmaps" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(RoadmapBoxImpl, response)
  }
}
export const Destroy = () => new DestroyRequest()
