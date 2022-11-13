import { Either } from '@shared/either'
import { IError } from '@shared/iError'

export interface Pagination<T> {
  data: T[]
  totalRecords?: number
  totalPages?: number
  limit?: number
  page?: number
  hasPrevPage?: boolean
  hasNextPage?: boolean
  prevPage?: number | null
  nextPage?: number | null
}

export type OutputPaginationDto<T> = Either<IError, Pagination<T>>
