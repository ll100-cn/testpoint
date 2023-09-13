import 'reflect-metadata'
import buffer from "buffer"
declare module globalThis {
  let Buffer: typeof buffer.Buffer
}
globalThis.Buffer = buffer.Buffer

import '../bootstrap-ext'
import '../components/fontawesome'
import '../components/bootstrap-select'
import '../components/treeview'
import '../components/fancybox'
import '../components/stimulus'
import '../frontend/vendor/old'

import '../frontend/main'
