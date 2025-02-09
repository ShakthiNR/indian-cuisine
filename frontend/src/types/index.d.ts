export interface IFetchParams {
  skip: number;
  pageSize: number;
  sortColumn: string;
  sortDirection: string;
  dietFilter: string;
  flavourFilter: string;
  stateFilter: string;
  searchQuery: string;
  ingredientsFilter: string;
}

export interface IRecipe {
  cook_time: number;
  course: string;
  createdAt: Date;
  diet: string;
  flavor_profile: string;
  ingredients: string[];
  name: string;
  prep_time: number;
  region: string;
  state: string;
  updatedAt: Date;
}

export interface IOptions {
  key: string;
  text: string;
}

export interface IItemLists {
  data: IRecipe[];
  totalItems: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setSortColumn: React.Dispatch<React.SetStateAction<string>>;
  setSortDirection: React.Dispatch<React.SetStateAction<string>>;
  sortColumn: string;
  sortDirection: string;
  debounceTimeout: NodeJS.Timeout | null;
  setDebounceTimeout: React.Dispatch<
    React.SetStateAction<NodeJS.Timeout | null>
  >;
  page: number;
}

export interface IItemFilter {
  searchQuery: string;
  handleSearchChange: (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  filter: IFilter;
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
  filterOptions: IFilterOptions;
  setFilterOptions:React.Dispatch<React.SetStateAction<IFilterOptions>>;
}


interface IFilter {
  state: string;
  flavor: string;
  diet: string;
  ingredients: string[];
}

interface IFilterOptions {
  state: IOptions[];
  flavor: IOptions[];
  diet: IOptions[];
  ingredients: IOptions[];
}