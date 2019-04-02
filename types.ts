export interface Handler {
  name: string
  description: string
  usage?: string
  allowedChannels: string[]
  hasArgs: boolean
  execute: Function
}
