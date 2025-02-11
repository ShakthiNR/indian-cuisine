import { useEffect, useState } from 'react';
import Loader from '../../common/Loader';
import { fetchData, fetchFilters } from '../../utils/api';
import { buildFilter, defaultIngredients } from '../../utils/utils';
import ItemControls from './ItemControls';
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
 

  const [filterOptions, setFilterOptions] = useState({
    state: [ { key: '', text: 'All' }],
    flavor: [ { key: '', text: 'All' }],
    diet: [ { key: '', text: 'All' }]
  })

  const [suggestions] = useState(defaultIngredients)
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])

  const [filter, setFilter] = useState({
    state: '',
    flavor: '',
    diet: ''
  });


  const [totalItems, setTotalItems] = useState(0);


  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem('itemsControlState') as string) || {};
    setPage(savedState.page || 1);
   
    setSearchQuery(savedState.searchQuery || '');
    setSortColumn(savedState.sortColumn || 'name');
    setSortDirection(savedState.sortDirection || 'asc');

    setFilter({
      state: savedState.stateFilter || '',
      flavor: savedState.flavourFilter || '',
      diet: savedState.dietFilter || ''
    })
    setSelectedIngredients(savedState.ingredientsFilter || [''])

    const fetchFilterData = async () => {

      const filterTypes = ["state", "flavor", "diet"];
      const responses = await Promise.all(filterTypes.map(fetchFilters));

      const [stateResponse, flavorResponse, dietResponse] = responses;

      setFilterOptions({
        ...filterOptions,
        state: buildFilter(stateResponse.data),
        flavor: buildFilter(flavorResponse.data),
        diet: buildFilter(dietResponse.data)
      })

      return
    }
    fetchFilterData()

  }, []);


  useEffect(() => {
    const fetchDataFromAPI = async () => {
      const skip = (page - 1) * pageSize;
      const response = await fetchData({ 
        skip, 
        pageSize, 
        sortColumn, 
        sortDirection, 
        dietFilter: filter.diet, 
        flavourFilter: filter.flavor, 
        stateFilter: filter.state, 
        searchQuery, 
       ingredientsFilter: selectedIngredients?.filter(x => x !== "")?.join(',') 
      });

      
      setData(response.data);
      setTotalItems(response.total);
      setIsLoading(false);
    }
    fetchDataFromAPI();

    const itemsControlState = {
      page,
      dietFilter: filter.diet,
      searchQuery,
      sortColumn,
      sortDirection,
      flavourFilter: filter.flavor,
      stateFilter: filter.state,
     // ingredientsFilter: selectedIngredients
    };
    localStorage.setItem('itemsControlState', JSON.stringify(itemsControlState));
  }, [page, pageSize, filter.diet, sortColumn, sortDirection, filter.state, filter.flavor, searchQuery, filter.diet,
    selectedIngredients 
   // filter.ingredients
]);


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
      <ItemControls
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        filter={filter}
        setFilter={setFilter}
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        setPage={setPage}
        setSearchQuery={setSearchQuery}
        suggestions={suggestions}
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={setSelectedIngredients}
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