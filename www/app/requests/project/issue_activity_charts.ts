import { BaseRequest, Scheme } from "../BaseRequest"
import { IssueActivityChartSchema, type IssueActivityChartType } from '@/schemas/project_misc'

class GetRequest extends BaseRequest<IssueActivityChartType> {
  scheme = Scheme.get({
    endpoint: [ "/svc", "/projects/{project_id}", "/analytics/issue_activity_chart" ],
  })
  schema = IssueActivityChartSchema
}
export const Get = () => new GetRequest()
