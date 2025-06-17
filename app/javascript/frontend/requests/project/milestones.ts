import { Milestone, type MilestoneBox, MilestoneBoxImpl, MilestonePage } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class CreateRequest extends BaseRequest<MilestoneBox> {
  method = "POST"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/milestones" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MilestoneBoxImpl, response)
  }
}
export const Create = () => new CreateRequest()


class GetRequest extends BaseRequest<MilestoneBox> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/milestones", "/{id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MilestoneBoxImpl, response)
  }
}
export const Get = () => new GetRequest()


class ListRequest<Box extends MilestoneBox> extends BaseRequest<Box[]> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/milestones" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MilestonePage<Box>, response).list
  }
}
export const List = () => new ListRequest()


class UpdateRequest extends BaseRequest<MilestoneBox> {
  method = "PUT"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/milestones", "/{id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MilestoneBoxImpl, response)
  }
}
export const Update = () => new UpdateRequest()


class DestroyRequest extends BaseRequest<MilestoneBox> {
  method = "DELETE"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/milestones", "/{id}" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MilestoneBoxImpl, response)
  }
}
export const Destroy = () => new DestroyRequest()


class ArchiveRequest extends BaseRequest<MilestoneBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/milestones", "/{id}", "/archive" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MilestoneBoxImpl, response)
  }
}
export const Archive = () => new ArchiveRequest()


class ActiveRequest extends BaseRequest<MilestoneBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/milestones", "/{id}", "/active" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MilestoneBoxImpl, response)
  }
}
export const Active = () => new ActiveRequest()
