import {
  FileText,
  FolderOpen,
  Images,
  Inbox,
  LayoutDashboard,
  MessageSquare,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type AdminNavItem = {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
  exact?: boolean;
};

/** Every admin section, in sidebar order. Each is its own route, loaded only when opened. */
export const ADMIN_NAV: AdminNavItem[] = [
  { href: "/admin", label: "Dashboard", description: "Overview of all sections.", icon: LayoutDashboard, exact: true },
  {
    href: "/admin/chats",
    label: "Chats",
    description: "Read website chat conversations and reply to visitors directly.",
    icon: MessageSquare,
  },
  {
    href: "/admin/leads",
    label: "Leads & messages",
    description: "Read contact form messages and reply by email, WhatsApp or phone.",
    icon: Inbox,
  },
  {
    href: "/admin/blogs",
    label: "Blogs",
    description: "Write, edit and publish blog posts with the rich text editor.",
    icon: FileText,
  },
  {
    href: "/admin/projects",
    label: "Projects",
    description: "Add or replace project images (1587 × 2245 px) in the PROJECTS section.",
    icon: Images,
  },
  {
    href: "/admin/media",
    label: "Media library",
    description: "Upload images and videos to Bunny by section. URLs saved in Supabase.",
    icon: FolderOpen,
  },
  {
    href: "/admin/settings",
    label: "Hours & replies",
    description: "Edit public business hours, timezone, and offline reply promise.",
    icon: Settings,
  },
];

export function isAdminNavActive(pathname: string, item: AdminNavItem): boolean {
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}
