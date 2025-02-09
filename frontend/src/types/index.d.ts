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
  dietFilter: string;
  stateFilterOptions: IOptions[];
  stateFilter: string;
  flavorFilterOptions: IOptions[];
  flavourFilter: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setDietFilter: React.Dispatch<React.SetStateAction<string>>;
  setFlavourFilter: React.Dispatch<React.SetStateAction<string>>;
  setStateFilter: React.Dispatch<React.SetStateAction<string>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  dietFilterOptions: IOptions[];
  ingredientOptions: IOptions[];
  ingredientsFilter: string[];
  setIngredientsFilter: React.Dispatch<React.SetStateAction<string[]>>;
}
