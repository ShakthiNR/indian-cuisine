import { DefaultButton, Dropdown, Stack, TextField } from '@fluentui/react';
import React, { useCallback } from 'react';
import { IItemFilter } from '../../types';

const ItemFilter = ({
    searchQuery,
    handleSearchChange,
    setPage,
    setSearchQuery,
    filter,
    setFilter,
    filterOptions
}: IItemFilter
) => {

    const handleDietFilterChange = useCallback((event: React.FormEvent<HTMLDivElement>, option: any) => {
        setFilter({ ...filter, diet: option.key })
        setPage(1);
    }, [filter])

    const handleStateFilterChange = useCallback((event: React.FormEvent<HTMLDivElement>, option: any) => {
        setFilter({ ...filter, state: option.key })
        setPage(1);
    }, [filter])

    const handleFlavorFilterChange = useCallback((event: React.FormEvent<HTMLDivElement>, option: any) => {
        setFilter({ ...filter, flavor: option.key })
        setPage(1);
    }, [filter])

    const handleIngredientChange = useCallback((event: React.FormEvent<HTMLDivElement>, option: any) => {
        let selectedKeys = option?.selected
            ? [...filter.ingredients, option.key.toString()]
            : filter.ingredients.filter(x => x !== option?.key);
        // debugger

        if (option.key?.toString() !== "") {
            selectedKeys = selectedKeys.filter(x => x !== "")
        } else {
            selectedKeys = selectedKeys.filter(x => x === "")
        }

        if (selectedKeys.length === 0) return
        setFilter({ ...filter, ingredients: selectedKeys })

        setPage(1);
    }, [filter])



    return (
        <div>
            <Stack
                horizontal
                horizontalAlign="center"
                verticalAlign="center"
                styles={{ root: { columnGap: '2rem' } }}
            >
                <TextField
                    label="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    styles={{ root: { maxWidth: 300, flex: 3 } }}
                    placeholder="Enter name or ingredients or origin..."
                />
                <Dropdown
                    label="Filter by Diet"
                    options={filterOptions.diet}
                    selectedKey={filter.diet}
                    onChange={handleDietFilterChange}
                    styles={{ dropdown: { width: 150 } }}
                />
                <Dropdown
                    label="Filter by State"
                    options={filterOptions.state}
                    selectedKey={filter.state}
                    onChange={handleStateFilterChange}
                    styles={{ dropdown: { width: 150 } }}
                />
                <Dropdown
                    label="Filter by Flavor"
                    options={filterOptions.flavor}
                    selectedKey={filter.flavor}
                    onChange={handleFlavorFilterChange}
                    styles={{ dropdown: { width: 150 } }}
                />

                <Dropdown
                    label="Filter by Ingredients"
                    options={filterOptions.ingredients}
                    selectedKeys={filter.ingredients}
                    onChange={handleIngredientChange}
                    multiSelect
                    styles={{ dropdown: { width: 120 } }}
                />
            </Stack>
            <Stack
                horizontalAlign='center'
                verticalAlign='center'
            >
                <DefaultButton
                    text="Reset Filters"
                    styles={{
                        root: {
                            marginTop: `1.75rem`
                        }
                    }}
                    onClick={() => {
                        setFilter({
                            diet: '',
                            state: '',
                            flavor: '',
                            ingredients: [""]
                        })
                        // setDietFilter('');
                        // setFlavourFilter('');
                        // setStateFilter('');
                        setSearchQuery('');
                        setPage(1);
                        // setIngredientsFilter([""])
                    }}
                />
            </Stack>
        </div>
    )
}

export default React.memo(ItemFilter)