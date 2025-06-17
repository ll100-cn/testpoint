import { Requirement, type RequirementBox, RequirementBoxImpl, RequirementPage } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class ListRequest<Box extends RequirementBox> extends BaseRequest<Box[]> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/storyboards", "/{storyboard_id}", "/requirements" ]
  graph = 'counts'

  processResponse(response: AxiosResponse) {
    return this.responseToObject(RequirementPage<Box>, response).list
  }
}
export const List = () => new ListRequest()


class PageRequest<Box extends RequirementBox> extends BaseRequest<RequirementPage<Box>> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/storyboards", "/{storyboard_id}", "/requirements" ]
  graph = 'counts'

  processResponse(response: AxiosResponse) {
    return this.responseToObject(RequirementPage<Box>, response)
  }
}
export const Page = () => new PageRequest()


class CreateRequest extends BaseRequest<RequirementBox> {
  method = "POST"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/storyboards", "/{storyboard_id}", "/requirements" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(RequirementBoxImpl, response)
  }
}
export const Create = () => new CreateRequest()


class UpdateRequest extends BaseRequest<RequirementBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/storyboards", "/{storyboard_id}", "/requirements", "/{requirement_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(RequirementBoxImpl, response)
  }
}
export const Update = () => new UpdateRequest()


class DestroyRequest extends BaseRequest<RequirementBox> {
  method = "DELETE"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/storyboards", "/{storyboard_id}", "/requirements", "/{requirement_id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(RequirementBoxImpl, response)
  }
}
export const Destroy = () => new DestroyRequest()
