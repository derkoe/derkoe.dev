import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  author: "Christian Köberl",
  desc: "Personal website of Christian Köberl (derkoe).",
  title: "derkoe.dev",
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/derkoe",
    linkTitle: ` ${SITE.author} on Github`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/derkoe/",
    linkTitle: `${SITE.author} on LinkedIn`,
    active: true,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/derkoe",
    linkTitle: `${SITE.author} on Twitter`,
    active: false,
  },
  {
    name: "Twitch",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Twitch`,
    active: false,
  },
  {
    name: "YouTube",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on YouTube`,
    active: false,
  },
  {
    name: "GitLab",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on GitLab`,
    active: false,
  },
  {
    name: "Mastodon",
    href: "https://mastodon.social/@derkoe",
    linkTitle: `${SITE.author} on Mastodon`,
    active: true,
  },
];
