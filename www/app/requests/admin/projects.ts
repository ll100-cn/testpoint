import { BaseRequest, Scheme } from "../BaseRequest"
import { ProjectBodySchema, ProjectBoxSchema, ProjectPageSchema, type ProjectBoxType, type ProjectPageType } from "@/schemas/project"

class UpdateRequest extends BaseRequest<ProjectBoxType> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/admin/projects/{id}",
    relatedKeys: [ [ "/projects", "/{id}" ], "/projects" ]
  })
  schema = ProjectBoxSchema
  bodySchema = ProjectBodySchema
}
export const Update = () => new UpdateRequest()


class GetRequest extends BaseRequest<ProjectBoxType> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2/admin", "/projects/{project_id}" ],
  })
  schema = ProjectBoxSchema
}
export const Get = () => new GetRequest()


class DestroyRequest extends BaseRequest<ProjectBoxType> {
  scheme = Scheme.delete({
    endpoint: "/svc/v2/admin/projects/{id}",
    relatedKeys: [ "/projects" ]
  })
  schema = ProjectBoxSchema
}
export const Destroy = () => new DestroyRequest()


class CreateRequest extends BaseRequest<ProjectBoxType> {
  scheme = Scheme.post({
    endpoint: "/svc/v2/admin/projects",
    relatedKeys: [ "/projects" ]
  })
  schema = ProjectBoxSchema
  bodySchema = ProjectBodySchema
}
export const Create = () => new CreateRequest()


class PageRequest extends BaseRequest<ProjectPageType> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2/admin", "/projects" ],
  })
  schema = ProjectPageSchema
}
export const Page = () => new PageRequest()
