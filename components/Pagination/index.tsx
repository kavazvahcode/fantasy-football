import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Select from '@/components/Select'

interface PaginationProps {
  currentPage: number
  rowsPerPage: number
  totalRows: number
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rowsPerPage: number) => void
}

const Pagination = ({
  currentPage,
  rowsPerPage,
  totalRows,
  onPageChange,
  onRowsPerPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage)
  const startRow = (currentPage - 1) * rowsPerPage + 1
  const endRow = Math.min(currentPage * rowsPerPage, totalRows)

  // Navigation handlers
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  // Page options
  const pageOptions = Array.from({ length: totalPages }, (_, i) => ({
    value: (i + 1).toString(),
    label: (i + 1).toString(),
  }))

  // Rows per page options
  const rowsPerPageOptions = [
    // { value: '5', label: '5' },
    { value: '8', label: '8' },
    { value: '10', label: '10' },
    { value: '15', label: '15' },
    { value: '25', label: '25' },
    { value: '50', label: '50' },
  ]

  return (
    <div className="bg-bg-dark rounded-b-lg w-full px-4 py-3">
      {/* Mobile Layout - Stack vertically */}
      <div className="block md:hidden space-y-4">
        {/* Mobile - Navigation arrows at top */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage <= 1}
            className={`p-2 rounded transition-colors duration-150 ${
              currentPage <= 1
                ? 'cursor-not-allowed opacity-50'
                : 'text-text-primary hover:bg-medium-gray hover:text-accent'
            }`}
            aria-label="Previous page"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="text-base text-center">
            {totalRows > 0 ? (
              <span>
                {startRow} - {endRow} of {totalRows}
              </span>
            ) : (
              <span>No data</span>
            )}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className={`p-2 rounded transition-colors duration-150 ${
              currentPage >= totalPages
                ? 'cursor-not-allowed opacity-50'
                : 'text-text-primary hover:bg-medium-gray hover:text-accent'
            }`}
            aria-label="Next page"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Mobile - Page and rows selectors */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-1">
            <span className="text-sm whitespace-nowrap">Page</span>
            <div className="w-16">
              <Select
                options={pageOptions}
                value={currentPage.toString()}
                onChange={(value) => onPageChange(parseInt(value))}
                placeholder="1"
                size="small"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 flex-1">
            <span className="text-sm whitespace-nowrap">Per page</span>
            <div className="w-16">
              <Select
                options={rowsPerPageOptions}
                value={rowsPerPage.toString()}
                onChange={(value) => onRowsPerPageChange(parseInt(value))}
                placeholder="1"
                size="small"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Grid layout */}
      <div className="hidden md:grid md:grid-cols-4 items-center gap-4">
        {/* First section - Page selector */}
        <div className="flex items-center justify-start">
          <div className="flex items-center gap-2">
            <span className="text-base lg:text-lg whitespace-nowrap">Page</span>
            <div className="w-20">
              <Select
                options={pageOptions}
                value={currentPage.toString()}
                onChange={(value) => onPageChange(parseInt(value))}
                placeholder="1"
                size="small"
              />
            </div>
          </div>
        </div>

        {/* Second section - Rows per page selector */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2">
            <span className="text-base lg:text-lg whitespace-nowrap">
              Rows per page
            </span>
            <div className="w-20">
              <Select
                options={rowsPerPageOptions}
                value={rowsPerPage.toString()}
                onChange={(value) => onRowsPerPageChange(parseInt(value))}
                placeholder="1"
                size="small"
              />
            </div>
          </div>
        </div>

        {/* Third section - Status info */}
        <div className="flex items-center justify-center">
          <div className="text-base lg:text-lg text-center">
            {totalRows > 0 ? (
              <span>
                {startRow} - {endRow} of {totalRows}
              </span>
            ) : (
              <span>No data</span>
            )}
          </div>
        </div>

        {/* Fourth section - Navigation arrows */}
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-1">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage <= 1}
              className={`p-1 rounded transition-colors duration-150 ${
                currentPage <= 1
                  ? 'cursor-not-allowed opacity-50'
                  : 'text-text-primary hover:bg-medium-gray hover:text-accent'
              }`}
              aria-label="Previous page"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className={`p-1 rounded transition-colors duration-150 ${
                currentPage >= totalPages
                  ? 'cursor-not-allowed opacity-50'
                  : 'text-text-primary hover:bg-medium-gray hover:text-accent'
              }`}
              aria-label="Next page"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pagination
