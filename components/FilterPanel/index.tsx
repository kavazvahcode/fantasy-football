'use client'

import React from 'react'
import Select from '@/components/Select'
import { useFantasyData } from '@/providers/FantasyDataProvider'

interface FilterPanelProps {
  className?: string
}

const FilterPanel = ({ className }: FilterPanelProps) => {
  const {
    filters,
    setOperator,
    setGameType,
    setSlateName,
    filterOptions,
    availableGameTypes,
    availableSlateNames,
    availablePlayers,
  } = useFantasyData()

  // Convert arrays to Select options format
  const operatorOptions = filterOptions.operators.map((op) => ({
    value: op,
    label: op,
  }))

  const gameTypeOptions = availableGameTypes.map((gt) => ({
    value: gt,
    label: gt,
  }))

  const slateNameOptions = availableSlateNames.map((sn) => ({
    value: sn,
    label: sn,
  }))

  return (
    <div
      className={`container mx-auto  w-full bg-medium-gray rounded-lg px-6 py-10 ${
        className || ''
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
        {/* Operator Select */}

        <Select
          options={operatorOptions}
          value={filters.operator}
          onChange={setOperator}
          placeholder="Select operator"
          size="regular"
        />

        {/* Game Type Select */}
        <Select
          options={gameTypeOptions}
          value={filters.gameType}
          onChange={setGameType}
          placeholder="Select game type"
          size="regular"
        />

        {/* Slate Name Select */}

        <Select
          options={slateNameOptions}
          value={filters.slateName}
          onChange={setSlateName}
          placeholder="Select slate name"
          size="regular"
        />
      </div>
    </div>
  )
}

export default FilterPanel
