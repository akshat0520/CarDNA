import { type Archetype, type DimensionKey, type DimensionScores } from "@/types";

type ArchetypeDefinition = Archetype & {
  threshold: Partial<Record<DimensionKey, number>>;
};

const ARCHETYPES: ArchetypeDefinition[] = [
  {
    id: "the_driver",
    name: "The Driver",
    tagline: "You drive cars. Others just operate them.",
    description:
      "You seek feel, feedback, and control. Every gear change is deliberate. You buy cars, not appliances.",
    emoji: "🏎️",
    primaryDimensions: ["control", "risk"],
    threshold: { control: 6, risk: 5 },
  },
  {
    id: "the_technologist",
    name: "The Technologist",
    tagline: "Your car is an extension of your phone.",
    description:
      "You want OTA updates, ADAS, and seamless integration. If it does not have a 12-inch screen and software updates, you are not interested.",
    emoji: "🤖",
    primaryDimensions: ["tech", "future"],
    threshold: { tech: 6, future: 5 },
  },
  {
    id: "the_curator",
    name: "The Curator",
    tagline: "Your car says something. You chose it carefully.",
    description:
      "Identity and image matter to you. You want a car that is rare, beautiful, and uniquely you.",
    emoji: "🎨",
    primaryDimensions: ["signal", "status"],
    threshold: { signal: 6, status: 5 },
  },
  {
    id: "the_pioneer",
    name: "The Pioneer",
    tagline: "You bought an EV before your friends knew what kWh meant.",
    description:
      "You adopt early. You believe in where the world is going and you want to be there first.",
    emoji: "⚡",
    primaryDimensions: ["future", "tech"],
    threshold: { future: 7, tech: 5 },
  },
  {
    id: "the_pragmatist",
    name: "The Pragmatist",
    tagline: "You optimise for value, reliability, and sanity.",
    description:
      "A car is a tool. A good tool. You want low TCO, high reliability, and zero drama.",
    emoji: "🔧",
    primaryDimensions: ["control", "tech"],
    threshold: { control: 4, tech: 4 },
  },
  {
    id: "the_commander",
    name: "The Commander",
    tagline: "You sit high. You arrive loud. You do not explain yourself.",
    description:
      "Presence, power, and authority. You want people to move out of the way and know why.",
    emoji: "👑",
    primaryDimensions: ["status", "signal"],
    threshold: { status: 6, signal: 6 },
  },
];

function euclideanDistance(
  scores: DimensionScores,
  profile: ArchetypeDefinition,
): number {
  return Math.sqrt(
    profile.primaryDimensions.reduce((acc, dimension) => {
      const target = profile.threshold[dimension] ?? 5;
      const diff = scores[dimension] - target;
      return acc + diff * diff;
    }, 0),
  );
}

export function assignArchetype(scores: DimensionScores): Archetype {
  const best = ARCHETYPES.reduce(
    (closest, current) => {
      const distance = euclideanDistance(scores, current);
      if (distance < closest.distance) {
        return { archetype: current, distance };
      }
      return closest;
    },
    { archetype: ARCHETYPES[0], distance: Number.POSITIVE_INFINITY },
  );

  const { threshold: _threshold, ...archetype } = best.archetype;
  return archetype;
}

export function getArchetypeTeasers(): Pick<Archetype, "id" | "name" | "emoji">[] {
  return ARCHETYPES.map(({ id, name, emoji }) => ({ id, name, emoji }));
}
