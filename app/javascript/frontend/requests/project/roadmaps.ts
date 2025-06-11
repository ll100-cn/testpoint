import { Roadmap, RoadmapBox, RoadmapPage } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const List = class extends BaseRequest<RoadmapPage<RoadmapBox>> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/roadmaps" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(RoadmapPage<RoadmapBox>, response)
  }
}

export const Create = class extends BaseRequest<RoadmapBox> {
  method = "POST"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/roadmaps" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(RoadmapBox, response)
  }
}

export const Update = class extends BaseRequest<RoadmapBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/roadmaps", "/{roadmap_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(RoadmapBox, response)
  }
}

export const Destroy = class extends BaseRequest<RoadmapBox> {
  method = "DELETE"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/roadmaps", "/{roadmap_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(RoadmapBox, response)
  }
}
