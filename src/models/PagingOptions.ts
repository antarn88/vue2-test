import { OrderType } from "../enums/OrderType";
import { SortType } from "../enums/SortType";

export interface PagingOptions {
  _page?: number;
  _limit?: number;
  _sort?: SortType;
  _order?: OrderType;
}
