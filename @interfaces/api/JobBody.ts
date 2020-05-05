export interface JobBody {
  title: string
  location: string
  price: number
  currency: string
  priceType: 'hourly' | 'fixed'
  description: string
}
