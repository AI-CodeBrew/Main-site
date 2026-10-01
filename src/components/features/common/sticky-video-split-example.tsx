"use client";

import { StickyVideoSplit } from './sticky-video-split';

export function StickyVideoSplitExample() {
  return (
    <StickyVideoSplit
      videoSrc="/videos/6719ad0ceed6d5aa24a83d61_6748168d07d698d005cc4116_careers -transcode.mp4"
      title="Join Our Team"
      subtitle="Careers at FynkTech"
      description="We're building the future of technology with innovative solutions that transform businesses worldwide. Join our team of passionate developers, designers, and innovators."
      features={[
        "Competitive salary and benefits",
        "Remote-first work environment",
        "Cutting-edge technology stack",
        "Professional development opportunities",
        "Collaborative team culture"
      ]}
      ctaText="View Open Positions"
      ctaLink="/careers"
    />
  );
}
