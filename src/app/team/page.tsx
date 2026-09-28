import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Linkedin, UserRound } from "lucide-react";
import { listTeamMembers } from "@/lib/team/store";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the people behind Fynk Tech building AI agents, automation and e-commerce systems.",
};

// Team is edited in /admin/team, so always read the latest list.
export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const result = await listTeamMembers();
  const members = result.ok ? result.data : [];

  return (
    <main className="min-h-screen bg-[#171717] text-white">
      <div className="container-page py-16 md:py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <header className="mt-12 mb-14 max-w-2xl">
          <p className="text-xs font-medium tracking-[0.12em] uppercase text-white/50 mb-3">Our team</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Meet the team</h1>
          <p className="text-lg text-white/70">
            The people behind Fynk Tech building your AI and e-commerce systems.
          </p>
        </header>

        {members.length === 0 ? (
          <p className="text-white/60">Team profiles are coming soon.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {members.map((member) => (
              <li
                key={member.id}
                className="overflow-hidden rounded-xl bg-[#262626] shadow-lg ring-1 ring-white/5 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/5] bg-white">
                  {member.photo_url ? (
                    <Image
                      src={member.photo_url}
                      alt={member.name}
                      fill
                      unoptimized
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[#303030]">
                      <UserRound className="h-20 w-20 text-white/25" />
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-lg font-bold">{member.name}</h2>
                    {member.linkedin_url && (
                      <a
                        href={member.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} on LinkedIn`}
                        className="text-white/60 hover:text-white transition-colors"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                  <p className="mt-1 text-sm font-medium text-[#5A9BFF]">{member.role}</p>
                  {member.bio && (
                    <p className="mt-3 text-sm leading-relaxed text-white/80 whitespace-pre-line">{member.bio}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
