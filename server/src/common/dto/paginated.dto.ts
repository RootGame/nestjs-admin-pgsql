export class PaginatedDto<T> {
  /* 总条数 */
  total: number;

  rows: T[];
}
