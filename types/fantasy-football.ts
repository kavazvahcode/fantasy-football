// Fantasy Football Data Types

// ================================
// CORE ENTITIES
// ================================

export interface Team {
  teamId: number
  team: string // Team abbreviation (e.g., "KC", "GB")
}

export interface Player {
  playerId: number
  name: string
  position: string
  team: string
  teamId: number
}

// ================================
// GAME RELATED TYPES
// ================================

export interface Stadium {
  stadiumId: number
  name: string
  city: string
  state: string
  country: string
  capacity: number
  playingSurface: 'Artificial' | 'Grass'
  geoLat: number
  geoLong: number
  type: 'Outdoor' | 'Dome' | 'RetractableDome'
}

export interface Game {
  gameKey: string
  seasonType: number
  season: number
  week: number
  date: string
  awayTeam: string
  homeTeam: string
  channel: string
  pointSpread: number
  overUnder: number
  stadiumId: number
  canceled: boolean
  geoLat: number | null
  geoLong: number | null
  forecastTempLow: number
  forecastTempHigh: number
  forecastDescription: string
  forecastWindChill: number
  forecastWindSpeed: number
  awayTeamMoneyLine: number
  homeTeamMoneyLine: number
  day: string
  dateTime: string
  globalGameId: number
  globalAwayTeamId: number
  globalHomeTeamId: number
  scoreId: number
  status: 'Scheduled' | 'InProgress' | 'Final' | 'Canceled'
  stadiumDetails: Stadium
}

export interface SlateGame {
  slateGameId: number
  slateId: number
  gameId: number
  operatorGameId: number
  removedByOperator: boolean
  scoreId: number
  game: Game
}

// ================================
// PLAYER PROJECTIONS & STATS
// ================================

export interface SlatePlayer {
  slatePlayerId: number
  slateId: number
  slateGameId: number | null
  playerId: number
  playerGameProjectionStatId: number | null
  fantasyDefenseProjectionStatId: number | null
  operatorPlayerId: string
  operatorSlatePlayerId: string
  operatorPlayerName: string
  operatorPosition: string
  operatorSalary: number
  team: string | null
  teamId: number | null
  removedByOperator: boolean
  operatorRosterSlots: string[]
  fantasyPoints?: number
  fantasyPointsPerDollar?: number
  projectedOwnership?: number
}

// ================================
// SLATE (CONTEST) TYPES
// ================================

export type OperatorGameType =
  | 'Snake Draft'
  | 'Classic'
  | 'Showdown'
  | 'Tournament'
  | 'GPP'
  | 'Cash Game'

export type RosterSlot =
  | 'QB'
  | 'RB'
  | 'WR'
  | 'TE'
  | 'FLEX'
  | 'WR/TE'
  | 'K'
  | 'DST'

export interface DfsSlate {
  _id: string
  season: number
  seasonType: number
  slateId: number
  week: number
  _lastUpdatedDate: string
  dfsSlateGames: SlateGame[]
  dfsSlatePlayers: SlatePlayer[]
  isMultiDaySlate: boolean
  numberOfGames: number
  operator: 'FanDuel' | 'DraftKings' | 'SuperDraft' | string
  operatorDay: string
  operatorGameType: OperatorGameType
  operatorName: string
  operatorSlateId: number
  operatorStartTime: string
  removedByOperator: boolean
  salaryCap: number
  slateRosterSlots: RosterSlot[]
  id: string
}

// ================================
// UTILITY TYPES
// ================================

export interface PlayerWithGame extends SlatePlayer {
  game?: Game
}

export interface TeamStats {
  teamId: number
  team: string
  totalSalary: number
  averagePoints: number
  playerCount: number
}

export interface PositionGroup {
  position: string
  players: SlatePlayer[]
  averageSalary: number
  averagePoints: number
}

// ================================
// FILTER & SEARCH TYPES
// ================================

export interface PlayerFilters {
  teams?: string[]
  positions?: string[]
  salaryMin?: number
  salaryMax?: number
  projectedPointsMin?: number
  projectedPointsMax?: number
  games?: number[]
}

export interface SlateFilters {
  season?: number
  week?: number
  operator?: string
  gameType?: OperatorGameType
  dateRange?: {
    start: string
    end: string
  }
}

// ================================
// COMPONENT PROP TYPES
// ================================

export interface PlayerCardData {
  id: string | number
  name: string
  team: string
  position: string
  salary: string
  points: number
  image?: string
  projectedOwnership?: number
}

export interface TablePlayerData {
  id: string | number
  name: string
  team: string
  position: string
  salary: string
  points: number
  projectedOwnership?: number
  fantasyPointsPerDollar?: number
}

// ================================
// SSG SUPPORT TYPES
// ================================

export interface FilterOptions {
  operators: string[]
  gameTypes: string[]
  slateNames: string[]
}

export interface ProcessedFantasyData {
  slates: DfsSlate[]
  filterOptions: FilterOptions
}

// ================================
// SSG SUPPORT TYPES
// ================================

export interface FilterOptions {
  operators: string[]
  gameTypes: string[]
  slateNames: string[]
}

export interface ProcessedFantasyData {
  slates: DfsSlate[]
  players: (SlatePlayer & { slateIds: string[] })[]
  filterOptions: FilterOptions
  stats: {
    totalSlates: number
    totalPlayers: number
    averagePlayersPerSlate: number
    operators: number
    gameTypes: number
    slateNames: number
  }
}

// ================================
// EXPORT MAIN DATA TYPE
// ================================

export type FantasyFootballData = DfsSlate[]

// ================================
// TYPE GUARDS
// ================================

export const isValidPlayer = (player: any): player is SlatePlayer => {
  return (
    typeof player.slatePlayerId === 'number' &&
    typeof player.operatorPlayerName === 'string' &&
    typeof player.operatorPosition === 'string' &&
    typeof player.operatorSalary === 'number'
  )
}

export const isValidSlate = (slate: any): slate is DfsSlate => {
  return (
    typeof slate.slateId === 'number' &&
    typeof slate.season === 'number' &&
    typeof slate.week === 'number' &&
    Array.isArray(slate.dfsSlatePlayers) &&
    Array.isArray(slate.dfsSlateGames)
  )
}
