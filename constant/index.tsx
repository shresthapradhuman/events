import {
  BookIcon,
  BriefcaseBusinessIcon,
  FacebookIcon,
  GamepadIcon,
  GlobeIcon,
  HeartPulseIcon,
  InstagramIcon,
  MonitorIcon,
  MusicIcon,
  PlaneTakeoffIcon,
  TwitterIcon,
} from "lucide-react";

export const navigationItems = [
  {
    label: "Browse Events",
    path: "/events",
  },
  {
    label: "How It Works",
    path: "/how-it-works",
  },
  {
    label: "Help Center",
    path: "/help-center",
  },
  {
    label: "My Tickets",
    path: "/dashboard/tickets",
  },
];

export const categoriesIcon = [
  {
    icon: MusicIcon,
    name: "Music",
  },
  {
    icon: BriefcaseBusinessIcon,
    name: "Business",
  },
  {
    icon: GlobeIcon,
    name: "Cultural",
  },
  {
    icon: BookIcon,
    name: "education",
  },
  {
    icon: MonitorIcon,
    name: "Technology",
  },
  {
    icon: GamepadIcon,
    name: "Gaming",
  },
  {
    icon: HeartPulseIcon,
    name: "Health & Wellness",
  },
  {
    icon: PlaneTakeoffIcon,
    name: "Travel",
  },
];

export const footerNavigationItems = [
  {
    label: "Quick Links",
    items: [
      {
        label: "Who We Are?",
        url: "/who-we-are",
      },
      {
        label: "How It Works?",
        url: "/how-it-works",
      },
      {
        label: "Blog & News",
        url: "/blog&news",
      },
    ],
  },
  {
    label: "Resources",
    items: [
      {
        label: "Help center",
        url: "/help-center",
      },
      {
        label: "Organizers",
        url: "/help-center",
      },
      {
        label: "Users",
        url: "/help-center",
      },
    ],
  },
  {
    label: "Company",
    items: [
      {
        label: "Terms of Service",
        url: "/term-of-service",
      },
      {
        label: "Privacy Policy",
        url: "/privacy-policy",
      },
      {
        label: "Cookie Policy",
        url: "/cookie-policy",
      },
    ],
  },
];

export const socialLinksItems = [
  {
    label: "facebook",
    icon: FacebookIcon,
    url: "https://facebook.com",
  },
  {
    label: "instagram",
    icon: InstagramIcon,
    url: "https://instagram.com",
  },
  {
    label: "twitter",
    icon: TwitterIcon,
    url: "https://twitter.com",
  },
];
