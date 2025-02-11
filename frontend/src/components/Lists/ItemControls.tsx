import { DefaultButton, Dropdown, Stack, TextField } from '@fluentui/react';
import React, { useCallback } from 'react';
import { IItemFilter } from '../../types';
import InfoButton from '../../common/InfoButton';

const ItemControls = ({
    searchQuery,
    handleSearchChange,
    setPage,
    setSearchQuery,
    filter,
    setFilter,
    filterOptions,
    suggestions,
    selectedIngredients,
    setSelectedIngredients
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
            ? [...selectedIngredients, option.key.toString()]
            : selectedIngredients.filter(x => x !== option?.key);
        // debugger

        if (option.key?.toString() !== "") {
            selectedKeys = selectedKeys.filter(x => x !== "")
        } else {
            selectedKeys = selectedKeys.filter(x => x === "")
        }

        if (selectedKeys.length === 0) return

        setSelectedIngredients(()=> selectedKeys)
        setFilter({
            state: '',
            flavor: '',
            diet: '',
            // ingredients:['']
        })
        setSearchQuery("")

        setPage(1);
    }, [selectedIngredients])


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
                            //  ingredients: [""]
                        })
                        setSearchQuery('');
                        setPage(1);
                    }}
                />
            </Stack>


            <Stack
                horizontal
                horizontalAlign="center"
            >


                <Stack
                    styles={{ root: { marginTop: '1rem' } }}
                    horizontal
                    verticalAlign="center"
                >
                    <Dropdown
                        label="Choose Ingredients (dish suggestions)"
                        // options={filterOptions.ingredients}
                        // selectedKeys={filter.ingredients}
                        // onChange={handleIngredientChange}
                        placeholder="Select ingredients"
                        options={suggestions}
                        onChange={handleIngredientChange}
                        selectedKeys={selectedIngredients}
                        multiSelect
                        styles={{ dropdown: { width: 300 } }}
                    />

                    <InfoButton />
                </Stack>
            </Stack>

        </div>
    )
}

export default React.memo(ItemControls)