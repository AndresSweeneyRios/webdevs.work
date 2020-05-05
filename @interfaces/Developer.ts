import { User } from './User'

export interface Developer {
  name: string
  location: string
  bio: string
  createdAt: number
  id: string
  author: User
}
