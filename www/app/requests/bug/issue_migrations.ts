import { BaseRequest, Scheme } from "../BaseRequest"
import { IssueMigrationBodySchema, IssueMigrationResponseSchema, type IssueMigrationResponseType } from '@/schemas/issue_extra'

class CreateRequest extends BaseRequest<IssueMigrationResponseType> {
  scheme = Scheme.post({
    endpoint: "/svc/v2/projects/{project_id}/issue_migrations",
    relatedKeys: []
  })

  schema = IssueMigrationResponseSchema
  bodySchema = IssueMigrationBodySchema
}
export const Create = () => new CreateRequest()
