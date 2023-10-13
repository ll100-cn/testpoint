import 'reflect-metadata'
import buffer from "buffer"
declare module globalThis {
  let Buffer: typeof buffer.Buffer
}
globalThis.Buffer = buffer.Buffer

import '../bootstrap-ext'
import '../widgets/fontawesome'
import '../widgets/treeview'
import '../widgets/fancybox'
import '../widgets/stimulus'
import '../widgets/old'
import '../widgets/styles'
import '../widgets/bootstrap-select'

import '../frontend/main'
