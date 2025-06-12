import { Scene, SceneBox, ScenePage } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class ListRequest<Box extends SceneBox> extends BaseRequest<Box[]> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/storyboards", "/{storyboard_id}", "/scenes" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(ScenePage<Box>, response).list
  }
}
export const List = () => new ListRequest()


class CreateRequest extends BaseRequest<SceneBox> {
  method = "POST"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/storyboards", "/{storyboard_id}", "/scenes" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(SceneBox, response)
  }
}
export const Create = () => new CreateRequest()


class UpdateRequest extends BaseRequest<SceneBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/storyboards", "/{storyboard_id}", "/scenes", "/{scene_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(SceneBox, response)
  }
}
export const Update = () => new UpdateRequest()


class DestroyRequest extends BaseRequest<SceneBox> {
  method = "DELETE"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/storyboards", "/{storyboard_id}", "/scenes", "/{scene_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(SceneBox, response)
  }
}
export const Destroy = () => new DestroyRequest()
