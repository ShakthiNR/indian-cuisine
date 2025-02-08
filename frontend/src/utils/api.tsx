import { IFetchParams } from "../types";

export const fetchData = async ({ skip = 10, pageSize = 10, sortColumn, sortDirection, dietFilter, flavourFilter, stateFilter, searchQuery }: IFetchParams) => {
  const params = new URLSearchParams();

  params.append('limit', "" + pageSize);
  params.append('skip', "" + skip);
  sortDirection && params.append('sortBy', sortDirection);
  sortColumn && params.append('orderBy', sortColumn);
  dietFilter && params.append('diet', dietFilter);
  flavourFilter && params.append('flavor', flavourFilter);
  stateFilter && params.append('state', stateFilter);
  searchQuery && params.append('searchText', searchQuery);

  const url = `${process.env.REACT_APP_BACKEND_URL}/api/v1/dishes?${params.toString()}`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
};


export const fetchDataBasedOnId = async (id: string) => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/api/v1/dish/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const fetchFilters = async (option: string) => {
  const url = `${process.env.REACT_APP_BACKEND_URL}/api/v1/dishes/filter-options?option=${option}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}