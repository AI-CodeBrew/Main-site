import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { HomeIcon, CompassIcon } from "lucide-react";

export function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(90,131,255,0.12),transparent_55%),radial-gradient(ellipse_at_80%_100%,rgba(1,180,210,0.1),transparent_50%)]"
      />
      <Empty className="relative z-10 border-0">
        <EmptyHeader>
          <EmptyTitle className="mask-b-from-20% mask-b-to-80% font-extrabold text-9xl text-primary">
            404
          </EmptyTitle>
          <EmptyDescription className="-mt-8 text-nowrap text-foreground/80">
            The page you&apos;re looking for might have been <br />
            moved or doesn&apos;t exist.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/">
                <HomeIcon className="mr-2 size-4" data-icon="inline-start" />
                Go Home
              </Link>
            </Button>

            <Button asChild variant="outline">
              <Link href="/case-studies">
                <CompassIcon className="mr-2 size-4" data-icon="inline-start" />
                Explore
              </Link>
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  );
}
