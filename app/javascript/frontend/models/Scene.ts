import { EntityRepo } from "./EntityRepo"
import * as t from '@/lib/transforms'
import { Pagination } from './Pagination'
import type { OmitByValue } from "utility-types"

export class Scene {
	id!: number
	name!: string
}

export class SceneBoxImpl {
	@t.Klass(Scene) scene!: Scene
}

export type SceneBox = OmitByValue<SceneBoxImpl, Function>

export class ScenePage<Box extends SceneBox> extends Pagination<Box> {
	@t.Klass(SceneBoxImpl) list: Box[] = []
}

export class SceneRepo extends EntityRepo<Scene> {
}