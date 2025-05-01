"use client"
import { useReactTable, getCoreRowModel, getSortedRowModel,getFilteredRowModel, flexRender } from '@tanstack/react-table'
import { useState, useMemo, useEffect } from 'react'

export default function Tntbl(){
    const [data ,setData] = useState([])
    useEffect(() => {
        fetch('/data.json')
        .then(res => res.json())
        .then(json => setData(json))
    },[])
    const columns = useMemo(() => [
        // {header: 'First Name',accessorKey:'firstName'},
        // {header: 'Middle Name',accessorKey:'middleName'},
        // {header: 'Last Name',accessorKey:'lastName'},
        {
            header: 'Name',
            accessorKey: 'firstName',
            cell: info => {
                const row = info.row.original
                return `${row.firstName} ${row.middleName} ${row.lastName}`
            },
            meta: {
                filterVariant: 'text',
            },
            sortingFn: (rowA, rowB) => {
                const nameA = `${rowA.original.firstName} ${rowA.original.middleName} ${rowA.original.lastName}`.toLowerCase();
                const nameB = `${rowB.original.firstName} ${rowB.original.middleName} ${rowB.original.lastName}`.toLowerCase();
                return nameA.localeCompare(nameB);
            },
            filterFn: (row, filterValue, columnId) => {
                const firstName = `${row.firstName} ${row.middleName} ${row.lastName}`
                return firstName.includes(filterValue.toLowerCase())
            }
        },
        {header: 'Email',
            accessorKey:'email',
            meta: {
                filterVariant: 'text',
            },
            sortingFn: (rowA, rowB) => {
                const nameA = `${rowA.original.email}`.toLowerCase();
                const nameB = `${rowB.original.email}`.toLowerCase();
                return nameA.localeCompare(nameB);
            }
        },
        {header: 'Phone',
            accessorKey:'phone',
            meta: {
                filterVariant: 'number',
            },
            sortingFn: (rowA, rowB) => {
                const nameA = `${rowA.original.phone}`.toLowerCase();
                const nameB = `${rowB.original.phone}`.toLowerCase();
                return nameA.localeCompare(nameB);
            }
        },
        {header: 'Username',
            accessorKey:'username',
            meta: {
                filterVariant: 'text',
            },
            sortingFn: (rowA, rowB) => {
                const nameA = `${rowA.original.username}`.toLowerCase();
                const nameB = `${rowB.original.username}`.toLowerCase();
                return nameA.localeCompare(nameB);
            }
        },
        {header: 'Password',
            accessorKey:'password',
            meta: {
                filterVariant: 'text',
            },
            sortingFn: (rowA, rowB) => {
                const nameA = `${rowA.original.password}`.toLowerCase();
                console.log(nameA)
                const nameB = `${rowB.original.password}`.toLowerCase();
                return nameA.localeCompare(nameB);
            }
        },
    ],[])

    const [sorting, setSorting] = useState([])

    const table = useReactTable({
        data,
        columns,
        filterFns: {},
        state:{
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel()
    })

    return(
        <div>
            <h1 className='font-bold text-2xl'>A Simple Table</h1>
            <table className='border'>
                <thead className='border border-amber-800 bg-sky-900 text-white'>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id} >
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className='border py-1.5 px-2' onClick={header.column.getToggleSortingHandler()}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {header.column.getIsSorted() === 'asc' ? '🔼' : header.column.getIsSorted() === 'desc' ? '🔽' : ''}
                                    <div>
                                        <input 
                                            type="text"
                                            placeholder='Search...'
                                            value={table.getColumn('firstName')?.getFilterValue() ?? ''}
                                            onChange={e => table.getColumn('firstName')?.setFilterValue(e.target.value)}
                                        />
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td className='border py-1.5 px-2' key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
// function Filter({ column }) {
//     const columnFilterValue = column.getFilterValue();
//     const filterVariant = column.columnDef.meta?.filterVariant;
//         return filterVariant === 'range' ? (
//             <div>
//                 <div className="flex space-x-2">
//                     {/* See faceted column filters example for min max values functionality */}
//                     <DebouncedInput
//                         type="number"
//                         value={(columnFilterValue?.[0]) ?? ''}
//                         onChange={value =>
//                         column.setFilterValue(old => [value, old?.[1]])
//                         }
//                         placeholder={`Min`}
//                         className="w-24 border shadow rounded"
//                     />
//                     <DebouncedInput
//                         type="number"
//                         value={(columnFilterValue?.[1]) ?? ''}
//                         onChange={value =>
//                         column.setFilterValue(old => [old?.[0], value])
//                         }
//                         placeholder={`Max`}
//                         className="w-24 border shadow rounded"
//                     />
//                 </div>
//         <div className="h-1" />
//             </div>
//     ) : (
//         <DebouncedInput
//         className="w-36 border shadow rounded"
//         onChange={value => column.setFilterValue(value)}
//         placeholder={`Search...`}
//         type="text"
//         value={columnFilterValue || ''}
//         />
//       // See faceted column filters example for datalist search suggestions
//     );
// }

// function DebouncedInput({ value: initialValue, onChange, debounce = 500, ...props }) {
//     const [value, setValue] = useState(initialValue);

//     useEffect(() => {
//         setValue(initialValue);
//     }, [initialValue]);

//     useEffect(() => {
//         const timeout = setTimeout(() => {
//             onChange(value);
//         }, debounce);

//         return () => clearTimeout(timeout);
//     }, [value, debounce, onChange]);

//     return (
//         <input
//             {...props}
//             value={value}
//             onChange={e => setValue(e.target.value)}
//         />
//     );
// }