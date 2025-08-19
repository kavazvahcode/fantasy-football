import { readFileSync } from 'fs'
import { join } from 'path'
import type {
  DfsSlate,
  SlatePlayer,
  FilterOptions,
  ProcessedFantasyData,
} from '@/types/fantasy-football'

export class FantasyDataProcessor {
  private static instance: FantasyDataProcessor
  private data: DfsSlate[] | null = null

  private constructor() {}

  static getInstance(): FantasyDataProcessor {
    if (!FantasyDataProcessor.instance) {
      FantasyDataProcessor.instance = new FantasyDataProcessor()
    }
    return FantasyDataProcessor.instance
  }

  /**
   * Load and parse data.json at build time
   */
  loadData(): DfsSlate[] {
    if (this.data) return this.data

    try {
      const dataPath = join(process.cwd(), 'data.json')
      const fileContent = readFileSync(dataPath, 'utf8')
      this.data = JSON.parse(fileContent)
      console.log(`✅ Loaded ${this.data?.length || 0} DFS slates`)
      return this.data || []
    } catch (error) {
      console.error('❌ Error loading data.json:', error)
      return []
    }
  }

  /**
   * Extract unique filter options from all slates
   */
  getFilterOptions(): FilterOptions {
    const slates = this.loadData()

    const operators = new Set<string>()
    const gameTypes = new Set<string>()
    const slateNames = new Set<string>()

    slates.forEach((slate) => {
      if (slate.operator) operators.add(slate.operator)
      if (slate.operatorGameType) gameTypes.add(slate.operatorGameType)
      if (slate.operatorName) slateNames.add(slate.operatorName)
    })

    return {
      operators: Array.from(operators).sort(),
      gameTypes: Array.from(gameTypes).sort(),
      slateNames: Array.from(slateNames).sort(),
    }
  }

  /**
   * Get processed data optimized for frontend
   */
  getProcessedData(): ProcessedFantasyData {
    const slates = this.loadData()
    const filterOptions = this.getFilterOptions()

    // Extract all unique players with enhanced data
    const playersMap = new Map<string, SlatePlayer & { slateIds: string[] }>()

    slates.forEach((slate) => {
      slate.dfsSlatePlayers?.forEach((player: SlatePlayer) => {
        const key = `${player.operatorPlayerName}_${player.operatorPlayerName}_${player.operatorPosition}`

        if (playersMap.has(key)) {
          const existing = playersMap.get(key)!
          existing.slateIds.push(slate.id)
        } else {
          playersMap.set(key, {
            ...player,
            slateIds: [slate.id],
          })
        }
      })
    })

    const players = Array.from(playersMap.values())

    // Calculate statistics
    const totalPlayers = players.length
    const totalSlates = slates.length
    const averagePlayersPerSlate = Math.round(totalPlayers / totalSlates)

    return {
      slates,
      players,
      filterOptions,
      stats: {
        totalSlates,
        totalPlayers,
        averagePlayersPerSlate,
        operators: filterOptions.operators.length,
        gameTypes: filterOptions.gameTypes.length,
        slateNames: filterOptions.slateNames.length,
      },
    }
  }

  /**
   * Filter slates based on criteria
   */
  filterSlates(filters: {
    operator?: string
    gameType?: string
    slateName?: string
  }): DfsSlate[] {
    const slates = this.loadData()

    return slates.filter((slate) => {
      if (filters.operator && slate.operator !== filters.operator) return false
      if (filters.gameType && slate.operatorGameType !== filters.gameType)
        return false
      if (filters.slateName && slate.operatorName !== filters.slateName)
        return false
      return true
    })
  }
}

// Export singleton instance
export const dataProcessor = FantasyDataProcessor.getInstance()
