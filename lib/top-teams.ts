/**
 * Top teams for quick navigation on the home page.
 * Used by TopTeamsSection to filter or navigate to team jerseys.
 */

export interface TopTeam {
  id: string;
  label: string;
  /** Exact club name for filtering jerseys (must match Jersey.club) */
  clubName: string;
}

export const TOP_TEAMS: TopTeam[] = [
  { id: "barcelona", label: "Barcelona", clubName: "FC Barcelona" },
  { id: "real-madrid", label: "Real Madrid", clubName: "Real Madrid" },
  { id: "man-city", label: "Man City", clubName: "Manchester City" },
  { id: "ac-milan", label: "AC Milan", clubName: "AC Milan" },
  { id: "liverpool", label: "Liverpool", clubName: "Liverpool" },
  { id: "juventus", label: "Juventus", clubName: "Juventus" },
];
