import { Scene, type SceneBox, SceneBoxImpl, ScenePage } from "@/models"
import { BaseRequest, Scheme } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class ListRequest<Box extends SceneBox> extends BaseRequest<Box[]> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/storyboards/{storyboard_id}", "/scenes" ],
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(ScenePage<Box>, response).list
  }
}
export const List = () => new ListRequest()


class CreateRequest extends BaseRequest<SceneBox> {
  scheme = Scheme.post({
    endpoint: "/svc/v2/projects/{project_id}/storyboards/{storyboard_id}/scenes",
    relatedKeys: [ [ "/storyboards", "/{storyboard_id}" ], [ "/scenes" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(SceneBoxImpl, response)
  }
}
export const Create = () => new CreateRequest()


class UpdateRequest extends BaseRequest<SceneBox> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/storyboards/{storyboard_id}/scenes/{scene_id}",
    relatedKeys: [ [ "/storyboards", "/{storyboard_id}" ], [ "/scenes", "/{scene_id}" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(SceneBoxImpl, response)
  }
}
export const Update = () => new UpdateRequest()


class DestroyRequest extends BaseRequest<SceneBox> {
  scheme = Scheme.delete({
    endpoint: "/svc/v2/projects/{project_id}/storyboards/{storyboard_id}/scenes/{scene_id}",
    relatedKeys: [ [ "/storyboards", "/{storyboard_id}" ], [ "/scenes" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(SceneBoxImpl, response)
  }
}
export const Destroy = () => new DestroyRequest()
