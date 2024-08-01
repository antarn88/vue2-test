import { OrderType } from "../enums/OrderType";
import { SortType } from "../enums/SortType";

export interface PagingOptions {
  _page?: number;
  _per_page?: number;
  _sort?: SortType;
  _order?: OrderType;
}
