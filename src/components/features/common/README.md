# Sticky Video Split Component

A React component that implements the "sticky → split" pattern for video content with smooth scroll animations.

## Features

- **Full-width to Split Layout**: Video starts full-width and transitions to a split layout as you scroll
- **Smooth Animations**: Uses Framer Motion for fluid transitions and spring animations
- **Responsive Design**: Adapts to different screen sizes
- **Customizable Content**: Flexible props for title, description, features, and CTA
- **Auto-playing Video**: Video plays automatically with muted audio for better UX

## Usage

### Basic Usage

```tsx
import { StickyVideoSplit } from '@/components/features/common';

function MyPage() {
  return (
    <StickyVideoSplit
      videoSrc="/videos/your-video.mp4"
      title="Your Title"
      description="Your description here"
    />
  );
}
```

### Advanced Usage

```tsx
import { StickyVideoSplit } from '@/components/features/common';

function MyPage() {
  return (
    <StickyVideoSplit
      videoSrc="/videos/6719ad0ceed6d5aa24a83d61_6748168d07d698d005cc4116_careers -transcode.mp4"
      title="Join Our Team"
      subtitle="Careers at FynkTech"
      description="We're building the future of technology with innovative solutions that transform businesses worldwide."
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
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `videoSrc` | `string` | ✅ | Path to the video file |
| `title` | `string` | ✅ | Main heading text |
| `subtitle` | `string` | ❌ | Optional subtitle text |
| `description` | `string` | ✅ | Main description text |
| `features` | `string[]` | ❌ | Array of feature items to display as a list |
| `ctaText` | `string` | ❌ | Call-to-action button text (default: "Learn More") |
| `ctaLink` | `string` | ❌ | Call-to-action button link (default: "#") |

## How It Works

1. **Initial State**: Video displays full-width at the top of the section
2. **Scroll Trigger**: As user scrolls, the video becomes sticky and starts scaling down
3. **Split Transition**: At 30% scroll progress, content appears on the right side
4. **Final State**: Video is positioned on the left (50% width) with content on the right

## Animation Timeline

- **0-30% scroll**: Video scales from 100% to 80% and becomes sticky
- **30-50% scroll**: Content fades in and slides up from bottom
- **50-100% scroll**: Video scales to 60% and maintains split layout

## Styling

The component uses Tailwind CSS classes and can be customized by modifying the component file. The color scheme follows the FynkTech brand colors:

- Primary text: `#070643` (dark blue)
- Secondary text: `#4A5568` (gray)
- Background: White
- CTA button: `#070643` with hover state `#0A0045`

## Video Requirements

- **Format**: MP4 recommended
- **Size**: Optimize for web (consider using different resolutions for different devices)
- **Duration**: Keep videos concise for better user experience
- **Audio**: Videos should be muted for autoplay compliance

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- Framer Motion requires React 16.8+ (hooks support)
- Video autoplay works in most modern browsers when muted

## Performance Considerations

- Videos are lazy-loaded and only play when in viewport
- Smooth animations use hardware acceleration
- Consider using `loading="lazy"` for the video element in production
- Optimize video file sizes for better loading performance
