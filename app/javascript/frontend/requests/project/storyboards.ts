import { Storyboard, type StoryboardBox, StoryboardBoxImpl, StoryboardPage } from "@/models"
import { BaseRequest, Scheme } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class ListRequest<Box extends StoryboardBox> extends BaseRequest<Box[]> {
  scheme = Scheme.get({
    endpoint: [ "/api/v2", "/projects/{project_id}", "/storyboards" ],
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(StoryboardPage<Box>, response).list
  }
}
export const List = () => new ListRequest()


class GetRequest extends BaseRequest<StoryboardBox> {
  scheme = Scheme.get({
    endpoint: [ "/api/v2", "/projects/{project_id}", "/storyboards/{storyboard_id}" ],
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(StoryboardBoxImpl, response)
  }
}
export const Get = () => new GetRequest()


class CreateRequest extends BaseRequest<StoryboardBox> {
  scheme = Scheme.post({
    endpoint: "/api/v2/projects/{project_id}/storyboards",
    relatedKeys: [ [ "/storyboards" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(StoryboardBoxImpl, response)
  }
}
export const Create = () => new CreateRequest()


class UpdateRequest extends BaseRequest<StoryboardBox> {
  scheme = Scheme.patch({
    endpoint: "/api/v2/projects/{project_id}/storyboards/{storyboard_id}",
    relatedKeys: [ [ "/storyboards", "/{storyboard_id}" ] ]
  })
  headers = { 'Content-Type': 'application/json' }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(StoryboardBoxImpl, response)
  }
}
export const Update = () => new UpdateRequest()


class DestroyRequest extends BaseRequest<StoryboardBox> {
  scheme = Scheme.delete({
    endpoint: "/api/v2/projects/{project_id}/storyboards/{storyboard_id}",
    relatedKeys: [ [ "/storyboards" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(StoryboardBoxImpl, response)
  }
}
export const Destroy = () => new DestroyRequest()
