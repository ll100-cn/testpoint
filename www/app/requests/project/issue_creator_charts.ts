import { BaseRequest, Scheme } from "../BaseRequest"
import { IssueCreatorChartSchema, type IssueCreatorChartType } from '@/schemas/project_misc'

class GetRequest extends BaseRequest<IssueCreatorChartType> {
  scheme = Scheme.get({
    endpoint: [ "/svc", "/projects/{project_id}", "/analytics/issue_creator_chart" ],
  })
  schema = IssueCreatorChartSchema
}
export const Get = () => new GetRequest()
