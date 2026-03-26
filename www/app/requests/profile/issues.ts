import { BaseRequest, Scheme } from "../BaseRequest"
import { IssuePageWithCountsSchema, ProfileIssueQuerySchema, type IssuePageWithCountsType } from '@/schemas/issue'

class PageRequest extends BaseRequest<IssuePageWithCountsType> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2/profile", "/issues" ],
  })
  graph = "counts"
  schema = IssuePageWithCountsSchema
  querySchema = ProfileIssueQuerySchema
}
export const Page = () => new PageRequest()
