const PINNED_ICON_SLUGS = new Set(["amazonaws", "microsoftazure", "openai"]);
const SIMPLE_ICONS_VERSION = "11.14.0";

export function techIconUrl(tech: { slug: string; color: string }) {
  if (PINNED_ICON_SLUGS.has(tech.slug)) {
    return `https://cdn.jsdelivr.net/npm/simple-icons@${SIMPLE_ICONS_VERSION}/icons/${tech.slug}.svg`;
  }

  return `https://cdn.simpleicons.org/${tech.slug}/${tech.color}`;
}
