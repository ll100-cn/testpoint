import { type ProfileBox, ProfileBoxImpl } from "@/models"
import { BaseRequest, Scheme } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class GetRequest extends BaseRequest<ProfileBox> {
  scheme = Scheme.get({
    endpoint: [ "/svc/v2", "/projects/{project_id}", "/profile" ],
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(ProfileBoxImpl, response)
  }
}
export const Get = () => new GetRequest()


class UpdateRequest extends BaseRequest<ProfileBox> {
  scheme = Scheme.patch({
    endpoint: "/svc/v2/projects/{project_id}/profile",
    relatedKeys: [ [ "/projects", "/{project_id}" ], [ "/profile" ] ]
  })

  processResponse(response: AxiosResponse) {
    return this.responseToObject(ProfileBoxImpl, response)
  }
}
export const Update = () => new UpdateRequest()