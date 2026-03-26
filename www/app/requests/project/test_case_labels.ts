import { BaseRequest, Scheme } from "../BaseRequest"
import {
  TestCaseLabelBodySchema,
  TestCaseLabelBoxSchema,
  TestCaseLabelListSchema,
  TestCaseLabelPageSchema,
  type TestCaseLabelBoxType,
  type TestCaseLabelListType,
  type TestCaseLabelPageType,
} from '@/schemas/project_misc'

class ListRequest extends BaseRequest<TestCaseLabelListType> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/test_case_labels" ],
  })

  schema = TestCaseLabelListSchema
}
export const List = () => new ListRequest()


class PageRequest extends BaseRequest<TestCaseLabelPageType> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/test_case_labels" ],
  })
  graph = "counts"

  schema = TestCaseLabelPageSchema
}
export const Page = () => new PageRequest()


class CreateRequest extends BaseRequest<TestCaseLabelBoxType> {
  scheme = Scheme.post({
    endpoint: "/svc/v2/projects/{project_id}/test_case_labels",
    relatedKeys: [ [ "/test_case_labels" ] ]
  })

  schema = TestCaseLabelBoxSchema
  bodySchema = TestCaseLabelBodySchema
}
export const Create = () => new CreateRequest()


class UpdateRequest extends BaseRequest<TestCaseLabelBoxType> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/test_case_labels/{test_case_label_id}",
    relatedKeys: [ [ "/test_case_labels", "/{test_case_label_id}" ] ]
  })

  schema = TestCaseLabelBoxSchema
  bodySchema = TestCaseLabelBodySchema
}
export const Update = () => new UpdateRequest()


class DestroyRequest extends BaseRequest<TestCaseLabelBoxType> {
  scheme = Scheme.delete({
    endpoint: "/svc/v2/projects/{project_id}/test_case_labels/{test_case_label_id}",
    relatedKeys: [ [ "/test_case_labels" ] ]
  })

  schema = TestCaseLabelBoxSchema
}
export const Destroy = () => new DestroyRequest()


class GetRequest extends BaseRequest<TestCaseLabelBoxType> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/test_case_labels/{test_case_label_id}" ],
  })

  schema = TestCaseLabelBoxSchema
}
export const Get = () => new GetRequest()
