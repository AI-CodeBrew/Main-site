import Link from "next/link";

/** Consistent content column for every admin section. */
export function AdminPage({
  children,
  width = "default",
}: {
  children: React.ReactNode;
  width?: "narrow" | "default" | "wide" | "full";
}) {
  const max =
    width === "narrow" ? "max-w-2xl" : width === "wide" ? "max-w-6xl" : width === "full" ? "max-w-none" : "max-w-4xl";
  return <main className={`mx-auto w-full ${max} px-4 py-6 md:px-8 md:py-8`}>{children}</main>;
}

/** Title row at the top of an admin section. Sign-out and navigation live in the sidebar. */
export function AdminPageHeader({
  title,
  description,
  actions,
  back,
}: {
  title: string;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  back?: { href: string; label: string };
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div className="min-w-0">
        {back && (
          <Link href={back.href} className="text-sm text-[#5A83FF] hover:underline">
            ← {back.label}
          </Link>
        )}
        <h1 className={`text-2xl font-bold text-[#070643] md:text-3xl ${back ? "mt-1" : ""}`}>{title}</h1>
        {description && <p className="mt-1 text-sm text-gray-600 md:text-base">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-3">{actions}</div>}
    </div>
  );
}
