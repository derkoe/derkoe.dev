export type Site = {
  author: string;
  desc: string;
  title: string;
  ogImage?: string;
};

export type SocialObjects = {
  name: SocialMedia;
  href: string;
  active: boolean;
  linkTitle: string;
}[];

export type SocialMedia =
  | "Github"
  | "Facebook"
  | "Instagram"
  | "LinkedIn"
  | "Twitter"
  | "YouTube"
  | "CodePen"
  | "Discord"
  | "GitLab"
  | "Mastodon";

export type SocialIcons = {
  [social in SocialMedia]: string;
};
