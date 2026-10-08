export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  year: string;
  summary: string;
  challenge: string;
  approach: string[];
  outcomes: string[];
  technologies: string[];
  dataset: string;
  /** Wide image for the project page (paths are relative to `public/`). */
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  /** Image for the homepage card; falls back to `image`. */
  cardImage?: string;
  /** Main link (live app or site), shown on the card and the project page. */
  demo?: ProjectLink;
  /** Code link, shown on the project page. */
  repository?: ProjectLink;
};

// Projects appear on the homepage in this order (up to six).
export const projects: Project[] = [
  {
    slug: 'liga-f-2023-24',
    title: 'Liga F 2023/24 in Data',
    eyebrow: "Event data · xG modelling · Women's football",
    year: '2026',
    summary:
      'A full-season analysis of Liga F 2023/24: how the best teams create chances, a league-specific xG model showing that StatsBomb xG undersells the league by 15%, and expected threat to find the creators that assists miss.',
    challenge:
      "Are the league's strongest attacks simply creating more chances, or creating them differently? Answering that credibly required reconciled data, transparent chance definitions, and a test of whether the standard xG model fits this league at all.",
    approach: [
      'Built a reproducible pipeline over all 240 matches of StatsBomb event data that reconciles goals, shots and player minutes with official match records, and stops if they disagree.',
      'Classified every shot with transparent chance-type rules (a 10-second set-piece window and StatsBomb pass qualifiers), and compared teams with standardised PCA and K-means, including a sensitivity model without Barcelona.',
      "Tested the league's goals-above-xG gap for significance, then trained a Liga F xG model with freeze-frame features, evaluated with match-grouped cross-validation against StatsBomb xG and a recalibrated version of it.",
      'Fitted an expected-threat (xT) model to credit every pass and carry, and built a player-similarity search on standardised per-90 profiles.',
    ],
    outcomes: [
      'The top four took 58% more shots, each worth 33% more xG, with almost the same chance mix. One component explains about 90% of the variation between teams: Liga F is a ladder of control rather than a set of styles.',
      'Liga F outscored StatsBomb xG by 89 non-penalty goals (z = 4.2), almost all on shots with no defender in the way. StatsBomb still ranks chances best, but needs recalibrating to the league, which shrinks most teams’ apparent finishing edge.',
      'Expected threat surfaced eight “hidden creators” who rank in the top 25 for threat but outside the top 40 for assists, mostly defenders and ball-carriers.',
      'Published as a written analysis with an interactive dashboard, including a team explorer, shot maps and player similarity.',
    ],
    technologies: ['Python', 'scikit-learn', 'xG modelling', 'Expected threat', 'Pandas', 'PCA', 'Plotly', 'StatsBomb data'],
    dataset:
      'StatsBomb open event data for all 240 Liga F 2023/24 matches: about 835,000 events and 6,166 shots, including the freeze frame recorded for each shot.',
    image: 'images/liga-f-2023-24.png',
    imageAlt: 'Every shot of the Liga F 2023/24 season on a half pitch, sized by expected goals, with goals in gold.',
    imageCaption: 'Every shot of the season, sized by StatsBomb xG; goals in gold.',
    cardImage: 'images/liga-f-2023-24-card.png',
    demo: { label: 'Read the analysis', url: 'https://juls1609.github.io/womens-football-analytics/' },
    repository: { label: 'View the code', url: 'https://github.com/Juls1609/womens-football-analytics' },
  },
  {
    slug: 'world-cup-2026-predictor',
    title: 'World Cup 2026 Predictor',
    eyebrow: 'Tournament simulation · Football analytics',
    year: '2026',
    summary:
      'A 48-team tournament simulator and Streamlit dashboard that turns uncertainty in group-stage and knockout results into an explorable World Cup forecast.',
    challenge:
      'The expanded 2026 format introduces 12 groups, eight best third-place qualifiers, and 495 official third-place allocation combinations. The objective was to produce a coherent, transparent bracket rather than independent match predictions that cannot coexist in a real tournament path.',
    approach: [
      'Simulate group-stage fixtures with an Elo-informed Poisson goals model.',
      'Run 20,000 Monte Carlo tournaments to estimate advancement and title probabilities.',
      'Apply FIFA\'s official Round-of-32 progression and its complete Annex-C matrix for third-place allocation.',
      'Generate a consensus bracket and a responsive Streamlit dashboard for group, ranking, and knockout exploration.',
    ],
    outcomes: [
      'A validated 32-match knockout tree with correct winner carry-over and third-place playoff.',
      'Team-level probabilities for reaching each knockout stage and becoming champion.',
      'A visual dashboard designed to make the model and tournament path easy to inspect.',
    ],
    technologies: ['Python', 'Pandas', 'Streamlit', 'Plotly', 'Monte Carlo', 'Poisson model', 'Elo ratings'],
    dataset: 'Historical match and shootout results, team Elo ratings, and the published FIFA World Cup 2026 competition format.',
    image: 'images/world-cup-2026-bracket.png',
    imageAlt: 'World Cup 2026 predictor consensus knockout bracket, showing the round of 32 through the final.',
    imageCaption: 'Consensus knockout bracket from the World Cup 2026 Predictor.',
    demo: { label: 'Open live Streamlit app', url: 'https://worldcuppredictor2026.streamlit.app' },
    repository: { label: 'GitHub profile', url: 'https://github.com/Juls1609?tab=repositories' },
  },
];
