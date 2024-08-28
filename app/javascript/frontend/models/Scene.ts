import { EntityRepo } from "./EntityRepo"

export class Scene {
	id!: number
	name!: string 
}

export class SceneRepo extends EntityRepo<Scene> {
}