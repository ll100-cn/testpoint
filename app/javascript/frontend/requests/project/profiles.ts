import { ProfileBox } from "@/models"
import type { AxiosResponse } from "axios"
import { BaseRequest } from "../BaseRequest"

class GetRequest extends BaseRequest<ProfileBox> {
  method = "GET"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/profile" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(ProfileBox, response)
  }
}
export const Get = () => new GetRequest()


class UpdateRequest extends BaseRequest<ProfileBox> {
  method = "PATCH"
  endpoint = [ "/api/v2/projects", "/{project_id}", "/profile" ]

  processResponse(response: AxiosResponse) {
    return this.responseToObject(ProfileBox, response)
  }
}
export const Update = () => new UpdateRequest()
