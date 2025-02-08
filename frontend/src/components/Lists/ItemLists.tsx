import { DetailsList, DetailsListLayoutMode, IColumn, PrimaryButton, Stack, Text } from '@fluentui/react';
import { useHistory } from 'react-router-dom';
import { IItemLists } from '../../types';

const ItemLists = ({
    data,
    totalItems,
    setPage,
    pageSize,
    setSortColumn,
    setSortDirection,
    sortColumn,
    sortDirection,
    debounceTimeout,
    setDebounceTimeout,
    page
}: IItemLists) => {

    const history = useHistory();


    const columns: IColumn[] = [
        {
            key: 'column1',
            name: 'Name',
            fieldName: 'name',
            minWidth: 100,
            maxWidth: 200,
            onColumnClick: (ev, column) => handleSort(column),
            onRenderHeader: (column) => renderHeader(column),
        },
        {
            key: 'column2',
            name: 'Diet',
            fieldName: 'diet',
            minWidth: 100,
            maxWidth: 200,
            onColumnClick: (ev, column) => handleSort(column),
            onRenderHeader: (column) => renderHeader(column),
            onRender: (item) => item.diet || -1
        },
        {
            key: 'column3',
            name: 'Preparation timing',
            fieldName: 'prep_time',
            minWidth: 100,
            maxWidth: 150,
            onColumnClick: (ev, column) => handleSort(column),
            onRenderHeader: (column) => renderHeader(column),
            onRender: (item) => item.prep_time || -1

        },
        {
            key: 'column4',
            name: 'Cooking timing',
            fieldName: 'cook_time',
            minWidth: 100,
            maxWidth: 150,
            onColumnClick: (ev, column) => handleSort(column),
            onRenderHeader: (column) => renderHeader(column),
            onRender: (item) => item.cook_time || -1
        },
        {
            key: 'column5',
            name: 'Action',
            fieldName: 'action',
            minWidth: 100,
            maxWidth: 200,
            onRender: (item) => (
                <PrimaryButton text="View More" onClick={() => handleAddMore(item._id)} />
            ),
        }
    ];


    const handleSort = (column: IColumn) => {
        if (column.fieldName === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column.fieldName as string);
            setSortDirection('asc');
        }
        setPage(1)
    };

    const handleAddMore = (id: string) => {
        history.push(`/dish/${id}`);
    };


    const renderHeader = (column: any) => {
        const isSortedColumn = column?.column?.fieldName === sortColumn;
        const order = isSortedColumn
            ? sortDirection === 'asc'
                ? "asc"
                : "desc"
            : "";


        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {column?.column?.name} {order ? "(" + order + ")" : ""}
            </div>
        );
    };



    const totalPages = Math.ceil(totalItems / pageSize);

    const debouncePagination = (newPage: number) => {
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        const timeoutId = setTimeout(() => {
            setPage(newPage);
        }, 300);

        setDebounceTimeout(timeoutId);
    };

    return (
        <div style={{ margin: '20px' }}>
            {
                totalItems === 0 ? (

                    <Stack
                        horizontalAlign='center'
                        styles={{ root: { margin: '2rem' } }}
                    >
                        <Text variant='mediumPlus'>No data found</Text>
                    </Stack>
                ) : <>

                    <Text variant='medium' styles={{ root: { marginTop: "1rem" } }}>Total <strong>{totalItems} </strong> </Text>
                    <DetailsList
                        items={data}
                        columns={columns}
                        setKey="set"
                        layoutMode={DetailsListLayoutMode.fixedColumns}
                        isHeaderVisible={true}
                    />
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <PrimaryButton
                            onClick={() => debouncePagination(page > 1 ? page - 1 : page)}
                            disabled={page === 1}
                        >
                            Previous
                        </PrimaryButton>
                        <Stack
                            horizontalAlign='center'
                            verticalAlign='center'
                            styles={{ root: { margin: '0 10px' } }}
                        >
                            <Text variant="medium"> Page {page} of {totalPages} </Text>
                        </Stack>
                        <PrimaryButton
                            onClick={() => debouncePagination(page < totalPages ? page + 1 : page)}
                            disabled={page === totalPages}
                        >
                            Next
                        </PrimaryButton>
                    </div>
                </>
            }
        </div>
    )
}

export default ItemLists