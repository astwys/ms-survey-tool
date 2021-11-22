import type { Mongoose } from 'mongoose'

export type MongooseConnect = {
  conn: Mongoose | null
  promise: Promise<Mongoose> | null
}
