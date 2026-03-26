import { BaseRequest, Scheme } from "../BaseRequest"
import {
  MilestoneBodySchema,
  MilestoneBoxSchema,
  MilestoneListSchema,
  type MilestoneBoxType,
  type MilestoneListType,
} from '@/schemas/milestone'

class CreateRequest extends BaseRequest<MilestoneBoxType> {
  scheme = Scheme.post({
    endpoint: "/svc/v2/projects/{project_id}/milestones",
    relatedKeys: [ [ "/milestones" ] ]
  })

  schema = MilestoneBoxSchema
  bodySchema = MilestoneBodySchema
}
export const Create = () => new CreateRequest()


class GetRequest extends BaseRequest<MilestoneBoxType> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/milestones/{id}" ],
  })

  schema = MilestoneBoxSchema
}
export const Get = () => new GetRequest()


class ListRequest extends BaseRequest<MilestoneListType> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/milestones" ],
  })

  schema = MilestoneListSchema
}
export const List = () => new ListRequest()


class UpdateRequest extends BaseRequest<MilestoneBoxType> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/milestones/{id}",
    relatedKeys: [ [ "/milestones", "/{id}" ] ]
  })

  schema = MilestoneBoxSchema
  bodySchema = MilestoneBodySchema
}
export const Update = () => new UpdateRequest()


class DestroyRequest extends BaseRequest<MilestoneBoxType> {
  scheme = Scheme.delete({
    endpoint: "/svc/v2/projects/{project_id}/milestones/{id}",
    relatedKeys: [ [ "/milestones" ] ]
  })

  schema = MilestoneBoxSchema
}
export const Destroy = () => new DestroyRequest()


class ArchiveRequest extends BaseRequest<MilestoneBoxType> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/milestones/{id}/archive",
    relatedKeys: [ [ "/milestones" ] ]
  })

  schema = MilestoneBoxSchema
}
export const Archive = () => new ArchiveRequest()


class ActiveRequest extends BaseRequest<MilestoneBoxType> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/milestones/{id}/active",
    relatedKeys: [ [ "/milestones" ] ]
  })

  schema = MilestoneBoxSchema
}
export const Active = () => new ActiveRequest()
