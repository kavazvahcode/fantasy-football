'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { useFantasyData } from '@/providers/FantasyDataProvider'

import Table from '@/components/Table'
import type { TableColumn, TableRow } from '@/components/Table'
import PlayerCard from '@/components/PlayerCard'

const FilteredPlayersInfo = () => {
  const { availablePlayers, selectedPlayer, setSelectedPlayer, filters } =
    useFantasyData()
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(8)

  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 'w-1/3' },
    { key: 'team', title: 'Team', width: 'w-1/6' },
    { key: 'position', title: 'Position', width: 'w-1/6' },
    { key: 'salary', title: 'Salary', width: 'w-1/6' },
    { key: 'points', title: 'Points', width: 'w-1/6' },
  ]

  // Convert SlatePlayer[] to TableRow[] format
  const tableData: TableRow[] = useMemo(() => {
    return availablePlayers.map((player) => ({
      id: player.slatePlayerId,
      name: player.operatorPlayerName,
      team: player.team || 'N/A',
      position: player.operatorPosition,
      salary: `$${player.operatorSalary?.toLocaleString() || '0'}`,
      points: player.fantasyPoints || 0,
    }))
  }, [availablePlayers])

  // Auto-select first player when list changes or no player is selected
  useEffect(() => {
    if (availablePlayers.length > 0) {
      // Always select first player when data changes, or if no player is selected
      if (!selectedPlayer || !availablePlayers.find(p => p.slatePlayerId === selectedPlayer.slatePlayerId)) {
        setSelectedPlayer(availablePlayers[0])
      }
    } else {
      // Clear selection if no players available
      setSelectedPlayer(null)
    }
  }, [availablePlayers, selectedPlayer, setSelectedPlayer])

  // Reset pagination when data changes (filters applied)
  useEffect(() => {
    setCurrentPage(1) // Always reset to first page when data changes
  }, [availablePlayers])

  // Calculate pagination
  const totalRows = tableData.length
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentData = tableData.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage)
    setCurrentPage(1) // Reset to first page
  }

  const handleRowSelect = (row: TableRow | null) => {
    if (row) {
      const player = availablePlayers.find((p) => p.slatePlayerId === row.id)
      setSelectedPlayer(player || null)
    } else {
      setSelectedPlayer(null)
    }
  }

  // Show message when no filters are applied
  if (!filters.gameType) {
    return (
      <div className="w-full bg-medium-gray rounded-lg p-8 text-center">
        <h3 className="text-xl font-medium text-text-primary mb-2">
          Select Game Type to View Players
        </h3>
        <p className="text-text-secondary">
          Use the filters above to narrow down players by operator and game
          type.
        </p>
      </div>
    )
  }

  // Show message when no players found for current filters
  if (availablePlayers.length === 0) {
    return (
      <div className="w-full bg-medium-gray rounded-lg p-8 text-center">
        <h3 className="text-xl font-medium text-text-primary mb-2">
          No Players Found
        </h3>
        <p className="text-text-secondary">
          No players available for the selected filters. Try different filter
          combinations.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col xl:flex-row gap-6">
      {/* Table Section - Takes 2/3 of width on large screens */}
      <div className="xl:w-2/3">
        <Table
          columns={columns}
          data={currentData}
          onRowSelect={handleRowSelect}
          selectedRowId={selectedPlayer?.slatePlayerId}
          pagination={true}
          totalRows={totalRows}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </div>

      {/* Player Card Section - Takes 1/3 of width on large screens */}
      <div className="xl:w-1/3">
        <div className="xl:sticky xl:top-4">
          <div className="h-full flex flex-col">
            <PlayerCard player={selectedPlayer} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilteredPlayersInfo
