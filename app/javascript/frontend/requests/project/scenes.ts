import { Scene, SceneBox, ScenePage } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

export const List = class extends BaseRequest<ScenePage<SceneBox>> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/storyboards", "/{storyboard_id}", "/scenes" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(ScenePage<SceneBox>, response)
  }
}

export const Create = class extends BaseRequest<SceneBox> {
  method = "POST"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/storyboards", "/{storyboard_id}", "/scenes" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(SceneBox, response)
  }
}

export const Update = class extends BaseRequest<SceneBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/storyboards", "/{storyboard_id}", "/scenes", "/{scene_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(SceneBox, response)
  }
}

export const Destroy = class extends BaseRequest<SceneBox> {
  method = "DELETE"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/storyboards", "/{storyboard_id}", "/scenes", "/{scene_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(SceneBox, response)
  }
}
