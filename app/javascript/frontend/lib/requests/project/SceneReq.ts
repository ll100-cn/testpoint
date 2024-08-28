import { Scene } from "@/models"
import BaseObjectRequest from "../BaseObjectRequest"
import BaseArrayRequest from "../BaseArrayRequest"
import BasePaginationRequest from "../BasePaginationRequest"

export default {
  List: class extends BaseArrayRequest<Scene> {
    constructor() {
      super()
      this.method = "GET"
      this.endpoint = "/api/projects/{project_id}/storyboards/{storyboard_id}/scenes"
      this.klass = Scene
    }
  },
  Create: class extends BaseObjectRequest<Scene> {
    constructor() {
      super()
      this.method = "POST"
      this.endpoint = "/api/projects/{project_id}/storyboards/{storyboard_id}/scenes"
      this.klass = Scene
    }
  },
  Update: class extends BaseObjectRequest<Scene> {
    constructor() {
      super()
      this.method = "PATCH"
      this.endpoint = "/api/projects/{project_id}/storyboards/{storyboard_id}/scenes/{scene_id}"
      this.klass = Scene
    }
  },
  Destroy: class extends BaseObjectRequest<Scene> {
    constructor() {
      super()
      this.method = "DELETE"
      this.endpoint = "/api/projects/{project_id}/storyboards/{storyboard_id}/scenes/{scene_id}"
      this.klass = Scene
    }
  },
}
