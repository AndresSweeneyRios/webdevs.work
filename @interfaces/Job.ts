import { User } from './User'

export interface Job {
  title: string
  location: string
  price: number
  currency: string
  priceType: 'hourly' | 'fixed'
  description: string
  createdAt: number
  id: number
  author: User
}
