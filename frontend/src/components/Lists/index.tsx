import { useEffect, useState } from 'react';
import Loader from '../../common/Loader';
import { fetchData, fetchFilters } from '../../utils/api';
import { buildFilter, defaultIngredients } from '../../utils/utils';
import ItemFilter from './ItemFilter';
import ItemLists from './ItemLists';

const Lists = () => {

  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const [searchQuery, setSearchQuery] = useState('');
 

  const [stateFilterOptions, setStateFilterOptions] = useState([{ key: '', text: 'All' }]);
  const [flavorFilterOptions, setFlavorFilterOptions] = useState([{ key: '', text: 'All' }]);
  const [dietFilterOptions, setDietFilterOptions] = useState([{ key: '', text: 'All' }]);
  const [ingredientsFilterOptions] = useState(defaultIngredients);

  const [flavourFilter, setFlavourFilter] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [dietFilter, setDietFilter] = useState('');
  const [ingredientsFilter, setIngredientsFilter] = useState(['']);


  const [totalItems, setTotalItems] = useState(0);


  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem('filterState') as string) || {};
    setPage(savedState.page || 1);
    setDietFilter(savedState.dietFilter || '');
    setSearchQuery(savedState.searchQuery || '');
    setSortColumn(savedState.sortColumn || 'name');
    setSortDirection(savedState.sortDirection || 'asc');
    setFlavourFilter(savedState.flavourFilter || '');
    setStateFilter(savedState.stateFilter || '');
    setIngredientsFilter(savedState.ingredientsFilter || ['']);


    const fetchFilterData = async () => {

      const filterTypes = ["state", "flavor", "diet"];
      const responses = await Promise.all(filterTypes.map(fetchFilters));

      const [stateResponse, flavorResponse, dietResponse] = responses;


      if (stateResponse.data) {
        setStateFilterOptions(buildFilter(stateResponse.data))
      }
      if (flavorResponse.data) {
        setFlavorFilterOptions(buildFilter(flavorResponse.data))
      }
      if (dietResponse.data) {
        setDietFilterOptions(buildFilter(dietResponse.data))
      }
    }
    fetchFilterData()

  }, []);


  useEffect(() => {
    const fetchDataFromAPI = async () => {
      const skip = (page - 1) * pageSize;
      const response = await fetchData({ skip, pageSize, sortColumn, sortDirection, dietFilter, flavourFilter, stateFilter, searchQuery, ingredientsFilter: ingredientsFilter.join(',') });
      setData(response.data);
      setTotalItems(response.total);
      setIsLoading(false);
    }
    fetchDataFromAPI();


    const filterState = {
      page,
      dietFilter,
      searchQuery,
      sortColumn,
      sortDirection,
      flavourFilter,
      stateFilter,
      ingredientsFilter
    };
    localStorage.setItem('filterState', JSON.stringify(filterState));
  }, [page, pageSize, dietFilter, sortColumn, sortDirection, stateFilter, flavourFilter, searchQuery, dietFilter, ingredientsFilter]);





  const handleSearchChange = (event: any) => {
    const value = event.target?.value;
    setSearchQuery(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeoutId = setTimeout(() => {
      setSearchQuery(value);
    }, 500);

    setDebounceTimeout(timeoutId);
    setPage(1);
  };


  if (isLoading) {
    return <Loader />
  }


  return (
    <div>
      <ItemFilter
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        dietFilter={dietFilter}
        stateFilterOptions={stateFilterOptions}
        dietFilterOptions={dietFilterOptions}
        stateFilter={stateFilter}
        flavorFilterOptions={flavorFilterOptions}
        flavourFilter={flavourFilter}
        setPage={setPage}
        setDietFilter={setDietFilter}
        setFlavourFilter={setFlavourFilter}
        setStateFilter={setStateFilter}
        setSearchQuery={setSearchQuery}
        ingredientOptions={ingredientsFilterOptions}
        ingredientsFilter={ingredientsFilter}
        setIngredientsFilter={setIngredientsFilter}
      />
      <ItemLists
        data={data}
        totalItems={totalItems}
        setPage={setPage}
        pageSize={pageSize}
        setSortColumn={setSortColumn}
        setSortDirection={setSortDirection}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        debounceTimeout={debounceTimeout}
        setDebounceTimeout={setDebounceTimeout}
        page={page}
      />
    </div>
  )
}

export default Lists