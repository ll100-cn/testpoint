import { Milestone, type MilestoneBox, MilestoneBoxImpl, MilestonePage } from "@/models"
import { BaseRequest, Scheme } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class CreateRequest extends BaseRequest<MilestoneBox> {
  scheme = Scheme.post({
    endpoint: "/svc/v2/projects/{project_id}/milestones",
    relatedKeys: [ [ "/milestones" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MilestoneBoxImpl, response)
  }
}
export const Create = () => new CreateRequest()


class GetRequest extends BaseRequest<MilestoneBox> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/milestones/{id}" ],
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MilestoneBoxImpl, response)
  }
}
export const Get = () => new GetRequest()


class ListRequest<Box extends MilestoneBox> extends BaseRequest<Box[]> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/milestones" ],
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MilestonePage<Box>, response).list
  }
}
export const List = () => new ListRequest()


class UpdateRequest extends BaseRequest<MilestoneBox> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/milestones/{id}",
    relatedKeys: [ [ "/milestones", "/{id}" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MilestoneBoxImpl, response)
  }
}
export const Update = () => new UpdateRequest()


class DestroyRequest extends BaseRequest<MilestoneBox> {
  scheme = Scheme.delete({
    endpoint: "/svc/v2/projects/{project_id}/milestones/{id}",
    relatedKeys: [ [ "/milestones" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MilestoneBoxImpl, response)
  }
}
export const Destroy = () => new DestroyRequest()


class ArchiveRequest extends BaseRequest<MilestoneBox> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/milestones/{id}/archive",
    relatedKeys: [ [ "/milestones" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MilestoneBoxImpl, response)
  }
}
export const Archive = () => new ArchiveRequest()


class ActiveRequest extends BaseRequest<MilestoneBox> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/milestones/{id}/active",
    relatedKeys: [ [ "/milestones" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(MilestoneBoxImpl, response)
  }
}
export const Active = () => new ActiveRequest()