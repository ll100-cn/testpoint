import { Roadmap, RoadmapBox, RoadmapPage } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class ListRequest extends BaseRequest<RoadmapPage<RoadmapBox>> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/roadmaps" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(RoadmapPage<RoadmapBox>, response)
  }
}
export const List = () => new ListRequest()


class CreateRequest extends BaseRequest<RoadmapBox> {
  method = "POST"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/roadmaps" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(RoadmapBox, response)
  }
}
export const Create = () => new CreateRequest()


class UpdateRequest extends BaseRequest<RoadmapBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/roadmaps", "/{roadmap_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(RoadmapBox, response)
  }
}
export const Update = () => new UpdateRequest()


class DestroyRequest extends BaseRequest<RoadmapBox> {
  method = "DELETE"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/roadmaps", "/{roadmap_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(RoadmapBox, response)
  }
}
export const Destroy = () => new DestroyRequest()
