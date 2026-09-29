// Reference demo from the component source. Named *-demo so it doesn't replace the existing
// ui/demo.tsx (the Spline robot demo).
import IntersectingRings from "@/components/ui/intersecting-rings";

export default function IntersectingRingsDemo() {
  return (
    <div className="flex items-center justify-center w-full h-[400px]">
      <IntersectingRings />
    </div>
  );
}
