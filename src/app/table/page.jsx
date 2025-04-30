"use client"
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table'
import { useState, useMemo, useEffect } from 'react'

export default function Tntbl(){
    const [data ,setData] = useState([])
    useEffect(() => {
        fetch('/data.json')
        .then(res => res.json())
        .then(json => setData(json))
    },[])
    const columns = useMemo(() => [
        {header: 'First Name',accessorKey:'firstName'},
        {header: 'Middle Name',accessorKey:'middleName'},
        {header: 'Last Name',accessorKey:'lastName'},
        {header: 'Email',accessorKey:'email'},
        {header: 'Phone',accessorKey:'phone', enableResizing: true},
        {header: 'Username',accessorKey:'username'},
        {header: 'Password',accessorKey:'password'},
    ],[])

    const [sorting, setSorting] = useState([])

    const table = useReactTable({
        data,
        columns,
        state:{
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return(
        <div>
            <h1 className='font-bold text-2xl'>A Simple Table</h1>
            <table className='border'>
                <thead className='border border-amber-800 bg-sky-900 text-white'>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className='border py-1.5 px-2'>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
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