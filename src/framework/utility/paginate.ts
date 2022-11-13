import { Pagination } from '@business/dto/paginationDto'

export function transformPagination(pagination: Pagination<any>) {
  // eslint-disable-next-line no-prototype-builtins
  if (!pagination || !pagination.hasOwnProperty('totalRecords') || !pagination.hasOwnProperty('totalPages')) {
    return pagination
  }
  return {
    data: pagination.data,
    meta: {
      totalRecords: pagination.totalRecords,
      totalPages: pagination.totalPages,
      prevPage: pagination.prevPage,
      nextPage: pagination.nextPage,
      page: pagination.page,
      limit: pagination.limit,
    },
  }
}
