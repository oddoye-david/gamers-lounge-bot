export interface Handler {
  name: string
  description: string
  usage?: string
  hasArgs: boolean
  execute: Function
}
