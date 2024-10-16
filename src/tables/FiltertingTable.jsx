import React, { useMemo } from 'react';
import { useTable, useGlobalFilter } from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS } from './Columns';
import './basicTable.css';  
import { GlobalFilter } from './GlobalFilter';

function FiltertingTable() {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);
    
    const tableInstance = useTable(
        { columns,data },
     useGlobalFilter);

    const { getTableProps, getTableBodyProps, footerGroups, headerGroups, rows, prepareRow, state, setGlobalFilter } = tableInstance;

    const { globalFilter } = state

     return (
        <>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <table {...getTableProps()}>
            <thead>
                {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))
                            }
                        </tr>
                    ))
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                    })
                                }
                            </tr>
                        );
                    })
                }
            </tbody>
            <tfoot>
            {
                    footerGroups.map(footerGroup => (
                        <tr {...footerGroup.getFooterGroupProps()}>
                            {
                                footerGroup.headers.map(column => (
                                    <td {...column.getFooterProps()}>{column.render('Footer')}</td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tfoot>
        </table>
        </>
    );
}

export default FiltertingTable;
