import { DefaultButton, Dropdown, Stack, TextField } from '@fluentui/react';
import React from 'react';
import { IItemFilter } from '../../types';

const ItemFilter = ({
    searchQuery,
    handleSearchChange,
    dietFilter,
    stateFilterOptions,
    stateFilter,
    flavorFilterOptions,
    flavourFilter,
    setPage,
    setDietFilter,
    setFlavourFilter,
    setStateFilter,
    setSearchQuery,
    dietFilterOptions
}: IItemFilter
) => {

    const handleDietFilterChange = (event: React.FormEvent<HTMLDivElement>, option: any) => {
        setDietFilter(option.key);
        setPage(1);
    };

    const handleStateFilterChange = (event: React.FormEvent<HTMLDivElement>, option: any) => {
        setStateFilter(option.key);
        setPage(1);
    };
    const handleFlavorFilterChange = (event: React.FormEvent<HTMLDivElement>, option: any) => {
        setFlavourFilter(option.key);
        setPage(1);
    };


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
                    options={dietFilterOptions}
                    selectedKey={dietFilter}
                    onChange={handleDietFilterChange}
                    styles={{ dropdown: { width: 200 } }}
                />
                <Dropdown
                    label="Filter by State"
                    options={stateFilterOptions}
                    selectedKey={stateFilter}
                    onChange={handleStateFilterChange}
                    styles={{ dropdown: { width: 200 } }}
                />
                <Dropdown
                    label="Filter by Flavor"
                    options={flavorFilterOptions}
                    selectedKey={flavourFilter}
                    onChange={handleFlavorFilterChange}
                    styles={{ dropdown: { width: 200 } }}
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
                        setDietFilter('');
                        setFlavourFilter('');
                        setStateFilter('');
                        setSearchQuery('');
                        setPage(1);
                    }}
                />
            </Stack>
        </div>
    )
}

export default ItemFilter