'use client'

import React, { useState } from 'react'
import Pagination from '@/components/Pagination'

export interface TableColumn {
  key: string
  title: string
  width?: string
}

export interface TableRow {
  id: string | number
  [key: string]: any
}

interface TableProps {
  columns: TableColumn[]
  data: TableRow[]
  onRowSelect?: (row: TableRow | null) => void
  selectedRowId?: string | number
  pagination?: boolean
  totalRows?: number
  currentPage?: number
  rowsPerPage?: number
  onPageChange?: (page: number) => void
  onRowsPerPageChange?: (rowsPerPage: number) => void
}

const Table = ({
  columns,
  data,
  onRowSelect,
  selectedRowId,
  pagination = false,
  totalRows = 0,
  currentPage = 1,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
}: TableProps) => {
  const [internalSelectedId, setInternalSelectedId] = useState<
    string | number | null
  >(null)

  const handleRowClick = (row: TableRow) => {
    const newSelectedId = internalSelectedId === row.id ? null : row.id
    setInternalSelectedId(newSelectedId)

    if (onRowSelect) {
      onRowSelect(newSelectedId ? row : null)
    }
  }

  const isRowSelected = (rowId: string | number) => {
    return selectedRowId !== undefined
      ? selectedRowId === rowId
      : internalSelectedId === rowId
  }

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead>
            <tr className="bg-dark-charcoal">
              {columns.map((column, index) => (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-left font-normal text-2xl ${
                    column.width ? column.width : ''
                  } ${index === 0 ? 'rounded-tl-lg' : ''} ${
                    index === columns.length - 1 ? 'rounded-tr-lg' : ''
                  }`}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {data.map((row, index) => (
              <tr
                key={row.id}
                onClick={() => handleRowClick(row)}
                className={`cursor-pointer transition-colors duration-75 ${
                  isRowSelected(row.id)
                    ? 'bg-olive-green text-text-primary'
                    : 'bg-slate-gray text-text-primary hover:bg-dark-gray'
                }`}
              >
                {columns.map((column) => (
                  <td
                    key={`${row.id}-${column.key}`}
                    className="px-6 py-3 text-2xl"
                  >
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty state */}
        {data.length === 0 && (
          <div className="text-center py-8 text-text-secondary">
            No data available
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination && onPageChange && onRowsPerPageChange && (
        <Pagination
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          totalRows={totalRows}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      )}
    </div>
  )
}

export default Table
