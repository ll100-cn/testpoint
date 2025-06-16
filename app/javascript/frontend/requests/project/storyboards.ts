import { Storyboard, type StoryboardBox, StoryboardBoxImpl, StoryboardPage } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class ListRequest<Box extends StoryboardBox> extends BaseRequest<Box[]> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/storyboards" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(StoryboardPage<Box>, response).list
  }
}
export const List = () => new ListRequest()


class GetRequest extends BaseRequest<StoryboardBox> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/storyboards", "/{storyboard_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(StoryboardBoxImpl, response)
  }
}
export const Get = () => new GetRequest()


class CreateRequest extends BaseRequest<StoryboardBox> {
  method = "POST"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/storyboards" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(StoryboardBoxImpl, response)
  }
}
export const Create = () => new CreateRequest()


class UpdateRequest extends BaseRequest<StoryboardBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/storyboards", "/{storyboard_id}" ]
  headers = { 'Content-Type': 'application/json' }

  processResponse(response: AxiosResponse) {
    return this.responseToObject(StoryboardBoxImpl, response)
  }
}
export const Update = () => new UpdateRequest()


class DestroyRequest extends BaseRequest<StoryboardBox> {
  method = "DELETE"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/storyboards", "/{storyboard_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(StoryboardBoxImpl, response)
  }
}
export const Destroy = () => new DestroyRequest()
