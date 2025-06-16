import { type ProfileBox, ProfileBoxImpl } from "@/models"
import { BaseRequest } from "../BaseRequest"
import type { AxiosResponse } from "axios"

class GetRequest extends BaseRequest<ProfileBox> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/profile" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(ProfileBoxImpl, response)
  }
}
export const Get = () => new GetRequest()

class UpdateRequest extends BaseRequest<ProfileBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/profile" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(ProfileBoxImpl, response)
  }
}
export const Update = () => new UpdateRequest()
