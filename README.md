# Quest Medical - Job Vacancy Image Generator

A professional LinkedIn job vacancy image generator (1080x1080px) for Quest Medical HR team. Create stunning, branded job posts with ease.

## 🚀 Features

- **Real-time Preview**: Live canvas updates as you type
- **Professional Design**: Quest Medical branding with #25467a color scheme
- **Template System**: Save up to 5 job templates for quick reuse
- **PNG Export**: High-quality 1080x1080px images optimized for LinkedIn
- **Urgency Badges**: Add "Immediate Start" or "Urgent" badges
- **Responsive UI**: Works on desktop and mobile devices
- **All Lucide Icons**: Professional iconography throughout

## 📋 Prerequisites

- Node.js 18+ or Bun
- pnpm (recommended), npm, or yarn

## 🛠️ Installation

```bash
# Navigate to project directory
cd quest-hiring-generator

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🎨 Required Assets

Replace the placeholder files in `/public/assets/` with actual Quest Medical brand assets:

1. **Quest_Group_white.svg** - White Quest Medical logo (~180px width)
2. **compass.png** or **compass.svg** - Compass watermark (756x756px recommended)

### Current Placeholders:
- ✅ `Quest_Group_white.svg` - Text-based placeholder (replace with actual logo)
- ✅ `compass.svg` - Compass rose design (replace with actual compass.png if available)

## 🎯 Usage

### Creating a Job Post

1. **Fill in Job Details**:
   - Job Title (required, max 80 characters)
   - Salary/Wage Range (optional)
   - Employment Type (required: Full-time, Part-time, Contract, Temporary)
   - Location (required)
   - Urgency Badge (optional: None, Immediate Start, Urgent)

2. **Customize Contact Details**:
   - Phone: 07749 490 058 (editable)
   - Email: Paula.rola@questmedical.biz (editable)
   - Website: www.Questmedical.biz (editable)

3. **Adjust Advanced Options**:
   - Compass Opacity: 0-40% (default: 20%)

4. **Preview & Download**:
   - View live preview on the right
   - Click "Download PNG" to export 1080x1080px image
   - Filename format: `quest-medical-hiring-[job-title]-[date].png`

### Template Management

- **Save Template**: Click "Save Current" to store frequently used job configurations
- **Load Template**: Click "Load" on any saved template
- **Delete Template**: Click trash icon to remove templates
- **Limit**: Maximum 5 templates stored in browser localStorage

## 🏗️ Tech Stack

- **Framework**: Next.js 16+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: lucide-react
- **Fonts**: Roboto (300, 700 weights)
- **Image Export**: html-to-image
- **State Management**: React hooks

## 📁 Project Structure

```
quest-hiring-generator/
├── app/
│   ├── page.tsx              # Main application page
│   ├── layout.tsx            # Root layout with fonts
│   └── globals.css           # Global styles
├── components/
│   ├── JobImageCanvas.tsx    # Canvas preview component
│   ├── JobForm.tsx           # Input form component
│   ├── DownloadButton.tsx    # Download functionality
│   └── TemplateManager.tsx   # Template save/load system
├── lib/
│   ├── types.ts              # TypeScript interfaces
│   ├── generateImage.ts      # Image export logic
│   └── templateStorage.ts    # localStorage utilities
└── public/
    └── assets/
        ├── Quest_Group_white.svg
        └── compass.svg
```

## 🎨 Brand Guidelines

- **Primary Color**: #25467a (deep blue)
- **Typography**: 
  - Headers: Roboto Bold (700)
  - Body: Roboto Light (300)
- **Canvas Size**: 1080x1080px
- **Export Quality**: 2x pixel ratio for retina displays

## 🚀 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

### Custom Domain Setup

1. Deploy to Vercel
2. Add custom domain in Vercel dashboard
3. Suggested subdomains:
   - jobs.questmedical.biz
   - careers.questmedical.biz

### Environment Variables

No environment variables required - this is a client-side only application.

## ✅ Feature Checklist

- ✅ Quest Medical branding (#25467a)
- ✅ Logo display (white version)
- ✅ Compass overlay with adjustable opacity
- ✅ All required form fields with validation
- ✅ Lucide-react icons throughout
- ✅ Real-time preview
- ✅ 1080x1080px PNG export
- ✅ Template save/load system
- ✅ Urgency badges
- ✅ Responsive layout
- ✅ Mobile-friendly
- ✅ Accessibility features
- ✅ Error handling

## 🐛 Troubleshooting

### Images not loading
- Ensure assets are placed in `/public/assets/`
- Check file names match exactly: `Quest_Group_white.svg`, `compass.svg`

### Download not working
- Ensure all required fields are filled (Job Title, Location, Employment Type)
- Check browser console for errors
- Try a different browser (Chrome/Edge recommended)

### Templates not saving
- Check browser localStorage is enabled
- Clear browser cache if issues persist

## 📝 License

Proprietary - Quest Medical Group

## 👥 Support

For technical support or feature requests, contact the Quest Medical IT team.

---

Built with ❤️ for Quest Medical HR Team
