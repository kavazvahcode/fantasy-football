'use client'

import { createContext, useContext, useState, useMemo, ReactNode } from 'react'
import type {
  DfsSlate,
  FilterOptions,
  SlatePlayer,
} from '@/types/fantasy-football'

interface FilterState {
  operator: string
  gameType: string
  slateName: string
}

interface FantasyDataContextType {
  // Static data (from SSG)
  allSlates: DfsSlate[]
  filterOptions: FilterOptions

  // Client state
  filters: FilterState
  setOperator: (operator: string) => void
  setGameType: (gameType: string) => void
  setSlateName: (slateName: string) => void

  // Computed values
  filteredSlates: DfsSlate[]
  availableGameTypes: string[]
  availableSlateNames: string[]
  availablePlayers: SlatePlayer[]
  selectedPlayer: SlatePlayer | null
  setSelectedPlayer: (player: SlatePlayer | null) => void
  clearFilters: () => void
}

const FantasyDataContext = createContext<FantasyDataContextType | null>(null)

interface Props {
  children: ReactNode
  initialData: {
    slates: DfsSlate[]
    filterOptions: FilterOptions
  }
}

export function FantasyDataProvider({ children, initialData }: Props) {
  const [filters, setFilters] = useState<FilterState>({
    operator: '',
    gameType: '',
    slateName: '',
  })

  const [selectedPlayer, setSelectedPlayer] = useState<SlatePlayer | null>(null)

  // Cascade filtering: available options based on selections
  const availableGameTypes = useMemo(() => {
    if (!filters.operator) return []

    const operatorSlates = initialData.slates.filter(
      (slate) => slate.operator === filters.operator
    )

    const gameTypes = new Set<string>()
    operatorSlates.forEach((slate) => {
      if (slate.operatorGameType) gameTypes.add(slate.operatorGameType)
    })

    return Array.from(gameTypes).sort()
  }, [initialData.slates, filters.operator])

  const availableSlateNames = useMemo(() => {
    if (!filters.operator || !filters.gameType) return []

    const filteredSlates = initialData.slates.filter(
      (slate) =>
        slate.operator === filters.operator &&
        slate.operatorGameType === filters.gameType
    )

    const slateNames = new Set<string>()
    filteredSlates.forEach((slate) => {
      if (slate.operatorName) slateNames.add(slate.operatorName)
    })

    return Array.from(slateNames).sort()
  }, [initialData.slates, filters.operator, filters.gameType])

  const availablePlayers = useMemo(() => {
    if (!filters.gameType) return []

    const filteredSlates = initialData.slates.filter((slate) => {
      if (filters.operator && slate.operator !== filters.operator) return false
      if (filters.gameType && slate.operatorGameType !== filters.gameType)
        return false
      if (filters.slateName && slate.operatorName !== filters.slateName)
        return false
      return true
    })

    const playersMap = new Map<string, SlatePlayer>()
    filteredSlates.forEach((slate) => {
      slate.dfsSlatePlayers?.forEach((player) => {
        const key = `${player.operatorPlayerName}_${player.operatorPosition}`
        if (!playersMap.has(key)) {
          playersMap.set(key, player)
        }
      })
    })

    return Array.from(playersMap.values()).sort((a, b) =>
      a.operatorPlayerName.localeCompare(b.operatorPlayerName)
    )
  }, [initialData.slates, filters])

  const filteredSlates = useMemo(() => {
    return initialData.slates.filter((slate) => {
      if (filters.operator && slate.operator !== filters.operator) return false
      if (filters.gameType && slate.operatorGameType !== filters.gameType)
        return false
      if (filters.slateName && slate.operatorName !== filters.slateName)
        return false
      return true
    })
  }, [initialData.slates, filters])

  // Smart setters with cascade logic
  const setOperator = (operator: string) => {
    setFilters((prev) => ({
      operator,
      gameType: '',
      slateName: '',
    }))
    setSelectedPlayer(null)
  }

  const setGameType = (gameType: string) => {
    setFilters((prev) => ({
      ...prev,
      gameType,
      slateName: '',
    }))
    setSelectedPlayer(null)
  }

  const setSlateName = (slateName: string) => {
    setFilters((prev) => ({
      ...prev,
      slateName,
    }))
  }

  const clearFilters = () => {
    setFilters({
      operator: '',
      gameType: '',
      slateName: '',
    })
    setSelectedPlayer(null)
  }

  // Auto-select first player when game type is selected
  useMemo(() => {
    if (filters.gameType && availablePlayers.length > 0 && !selectedPlayer) {
      setSelectedPlayer(availablePlayers[0])
    }
  }, [filters.gameType, availablePlayers, selectedPlayer])

  const value: FantasyDataContextType = {
    allSlates: initialData.slates,
    filterOptions: initialData.filterOptions,
    filters,
    setOperator,
    setGameType,
    setSlateName,
    filteredSlates,
    availableGameTypes,
    availableSlateNames,
    availablePlayers,
    selectedPlayer,
    setSelectedPlayer,
    clearFilters,
  }

  return (
    <FantasyDataContext.Provider value={value}>
      {children}
    </FantasyDataContext.Provider>
  )
}

export function useFantasyData() {
  const context = useContext(FantasyDataContext)
  if (!context) {
    throw new Error('useFantasyData must be used within FantasyDataProvider')
  }
  return context
}
