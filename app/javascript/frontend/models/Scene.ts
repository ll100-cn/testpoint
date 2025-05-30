import { EntityRepo } from "./EntityRepo"
import * as t from '@/lib/transforms'
import { Pagination } from './Pagination'

export class Scene {
	id!: number
	name!: string
}

export class SceneBox {
	@t.Klass(Scene) scene!: Scene
}

export class ScenePage<Box extends SceneBox> extends Pagination<Box> {
	@t.Klass(SceneBox) list: Box[] = []
}

export class SceneRepo extends EntityRepo<Scene> {
}