import { Application } from 'stimulus'
import { registerControllers } from 'stimulus-vite-helpers'

const application = Application.start()
const controllers = import.meta.glob('../../controllers/*.js')
registerControllers(application, controllers)
