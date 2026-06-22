import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useFavoritesStore = create(
  persist(
    (set, get) => ({
      players:     [],
      teams:       [],
      matches:     [],
      tournaments: [],

      togglePlayer: (player) => {
        const { players } = get()
        const exists = players.find((p) => p.id === player.id)
        set({ players: exists ? players.filter((p) => p.id !== player.id) : [...players, player] })
      },

      toggleTeam: (team) => {
        const { teams } = get()
        const exists = teams.find((t) => t.id === team.id)
        set({ teams: exists ? teams.filter((t) => t.id !== team.id) : [...teams, team] })
      },

      toggleMatch: (match) => {
        const { matches } = get()
        const exists = matches.find((m) => m.id === match.id)
        set({ matches: exists ? matches.filter((m) => m.id !== match.id) : [...matches, match] })
      },

      toggleTournament: (tournament) => {
        const { tournaments } = get()
        const exists = tournaments.find((t) => t.id === tournament.id)
        set({ tournaments: exists ? tournaments.filter((t) => t.id !== tournament.id) : [...tournaments, tournament] })
      },

      isPlayerFavorite:     (id) => get().players.some((p) => p.id === id),
      isTeamFavorite:       (id) => get().teams.some((t) => t.id === id),
      isMatchFavorite:      (id) => get().matches.some((m) => m.id === id),
      isTournamentFavorite: (id) => get().tournaments.some((t) => t.id === id),
    }),
    { name: 'favorites-storage' }
  )
)

export default useFavoritesStore