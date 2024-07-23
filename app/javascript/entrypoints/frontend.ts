import 'reflect-metadata'
import buffer from "buffer"
declare module globalThis {
  let Buffer: typeof buffer.Buffer
}
globalThis.Buffer = buffer.Buffer


import '../frontend/main'
