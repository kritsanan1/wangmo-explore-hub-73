# File Structure Documentation

## Complete File Tree Analysis

```
wang-sam-mo-explorer-hub/
├── 📄 README.md                                    🟢 Main project documentation
├── 📄 index.html                                   🟢 Main HTML entry point with SEO meta tags
├── 📄 package.json                                 🟢 Project dependencies and scripts
├── 📄 tailwind.config.ts                          🟢 Tailwind CSS configuration with design tokens
├── 📄 vite.config.ts                              🟢 Vite build tool configuration
├── 📄 eslint.config.js                            🟢 ESLint configuration for code quality
├── 📄 supabase/
│   └── 📄 config.toml                             🟢 Supabase project configuration
├── 📄 public/
│   ├── 📄 robots.txt                              🟢 SEO crawler instructions and sitemap reference
│   ├── 📄 sitemap.xml                             🟢 SEO sitemap for search engines
│   ├── 📄 site.webmanifest                        🟢 PWA manifest for mobile app capabilities
│   └── 📄 lovable-uploads/
│       └── 📄 c199a2ae-1f19-475e-ab37-9bd5411d4f01.png 🟢 Uploaded media asset
├── 📄 src/
│   ├── 📄 main.tsx                                🟢 React application entry point
│   ├── 📄 App.tsx                                 🟡 Main app component with routing and providers
│   ├── 📄 App.css                                 🟢 Legacy CSS styles (unused)
│   ├── 📄 index.css                               🟢 Global styles and design system tokens
│   ├── 📄 vite-env.d.ts                          🟢 TypeScript environment declarations
│   ├── 📄 assets/                                 
│   │   ├── 📄 phasuk-temple.jpg                   🟢 Temple attraction image
│   │   ├── 📄 wang-yai-park-attraction.jpg        🟢 Park attraction image
│   │   └── 📄 wang-yai-park-hero.jpg              🟢 Hero section background image
│   ├── 📄 components/                             
│   │   ├── 📄 Layout.tsx                          🟢 Main layout wrapper component
│   │   ├── 📄 Navigation.tsx                      🟡 Main navigation component
│   │   ├── 📄 Footer.tsx                          🟢 Site footer component
│   │   ├── 📄 HeroSection.tsx                     🟡 Homepage hero section
│   │   ├── 📄 FeaturedAttractions.tsx             🟢 Homepage featured attractions showcase
│   │   ├── 📄 AttractionCard.tsx                  🟢 Individual attraction display card
│   │   ├── 📄 AttractionsMap.tsx                  🟢 Interactive attractions map component
│   │   ├── 📄 CulturalHighlights.tsx              🟢 Cultural content showcase
│   │   ├── 📄 EventsCalendar.tsx                  🟢 Events calendar component
│   │   ├── 📄 SEOProvider.tsx                     🟡 Dynamic SEO meta tag management
│   │   ├── 📄 SEODashboard.tsx                    🔴 Comprehensive SEO analytics dashboard
│   │   ├── 📄 SecurityAudit.tsx                   🔴 Security vulnerability scanner
│   │   ├── 📄 ads/
│   │   │   ├── 📄 AdSection.tsx                   🟢 Advertisement section component
│   │   │   └── 📄 BannerAd.tsx                    🟢 Banner advertisement component
│   │   ├── 📄 common/
│   │   │   ├── 📄 contact-info.tsx                🟢 Contact information component
│   │   │   ├── 📄 navigation-logo.tsx             🟢 Navigation logo component
│   │   │   └── 📄 navigation-menu.tsx             🟡 Navigation menu component
│   │   ├── 📄 hero/
│   │   │   ├── 📄 hero-cta-buttons.tsx            🟢 Hero call-to-action buttons
│   │   │   ├── 📄 hero-stats.tsx                  🟢 Hero statistics display
│   │   │   └── 📄 scroll-indicator.tsx            🟢 Scroll down indicator
│   │   ├── 📄 jobs/
│   │   │   ├── 📄 JobApplicationDialog.tsx        🟡 Job application form dialog
│   │   │   ├── 📄 JobCard.tsx                     🟢 Individual job listing card
│   │   │   ├── 📄 JobFilters.tsx                  🟡 Job search filters
│   │   │   └── 📄 JobPostingForm.tsx              🔴 Job posting creation form
│   │   ├── 📄 restaurants/
│   │   │   ├── 📄 BookingDialog.tsx               🟡 Restaurant booking dialog
│   │   │   ├── 📄 BusinessCard.tsx                🟢 Business information card
│   │   │   ├── 📄 BusinessGrid.tsx                🟢 Business listings grid
│   │   │   ├── 📄 BusinessMap.tsx                 🟡 Interactive business map
│   │   │   ├── 📄 ReviewsSection.tsx              🟡 Customer reviews section
│   │   │   └── 📄 SearchAndFilters.tsx            🟡 Search and filter controls
│   │   ├── 📄 services/
│   │   │   ├── 📄 ProductCard.tsx                 🟢 Service product card
│   │   │   ├── 📄 ServiceBookingDialog.tsx        🟡 Service booking dialog
│   │   │   ├── 📄 ServiceCard.tsx                 🟢 Individual service card
│   │   │   └── 📄 ServiceFilters.tsx              🟡 Service filter controls
│   │   └── 📄 ui/                                 
│   │       ├── 📄 accordion.tsx                   🟡 Shadcn accordion component
│   │       ├── 📄 alert-dialog.tsx                🟡 Shadcn alert dialog component
│   │       ├── 📄 alert.tsx                       🟡 Shadcn alert component
│   │       ├── 📄 aspect-ratio.tsx                🟡 Shadcn aspect ratio component
│   │       ├── 📄 avatar.tsx                      🟡 Shadcn avatar component
│   │       ├── 📄 badge.tsx                       🟡 Shadcn badge component
│   │       ├── 📄 breadcrumb.tsx                  🟡 Shadcn breadcrumb component
│   │       ├── 📄 button.tsx                      🟡 Shadcn button component
│   │       ├── 📄 calendar.tsx                    🟡 Shadcn calendar component
│   │       ├── 📄 card.tsx                        🟡 Shadcn card component
│   │       ├── 📄 carousel.tsx                    🟡 Shadcn carousel component
│   │       ├── 📄 chart.tsx                       🟡 Shadcn chart component
│   │       ├── 📄 checkbox.tsx                    🟡 Shadcn checkbox component
│   │       ├── 📄 collapsible.tsx                 🟡 Shadcn collapsible component
│   │       ├── 📄 command.tsx                     🟡 Shadcn command component
│   │       ├── 📄 context-menu.tsx                🟡 Shadcn context menu component
│   │       ├── 📄 dialog.tsx                      🟡 Shadcn dialog component
│   │       ├── 📄 drawer.tsx                      🟡 Shadcn drawer component
│   │       ├── 📄 dropdown-menu.tsx               🟡 Shadcn dropdown menu component
│   │       ├── 📄 form.tsx                        🟡 Shadcn form component
│   │       ├── 📄 hover-card.tsx                  🟡 Shadcn hover card component
│   │       ├── 📄 input-otp.tsx                   🟡 Shadcn OTP input component
│   │       ├── 📄 input.tsx                       🟡 Shadcn input component
│   │       ├── 📄 label.tsx                       🟡 Shadcn label component
│   │       ├── 📄 loading-skeleton.tsx            🟡 Custom loading skeleton component
│   │       ├── 📄 menubar.tsx                     🟡 Shadcn menubar component
│   │       ├── 📄 navigation-menu.tsx             🟡 Shadcn navigation menu component
│   │       ├── 📄 page-container.tsx              🟢 Custom page container component
│   │       ├── 📄 pagination.tsx                  🟡 Shadcn pagination component
│   │       ├── 📄 popover.tsx                     🟡 Shadcn popover component
│   │       ├── 📄 progress.tsx                    🟡 Shadcn progress component
│   │       ├── 📄 radio-group.tsx                 🟡 Shadcn radio group component
│   │       ├── 📄 resizable.tsx                   🟡 Shadcn resizable component
│   │       ├── 📄 scroll-area.tsx                 🟡 Shadcn scroll area component
│   │       ├── 📄 section-header.tsx              🟡 Custom section header component
│   │       ├── 📄 select.tsx                      🟡 Shadcn select component
│   │       ├── 📄 separator.tsx                   🟡 Shadcn separator component
│   │       ├── 📄 sheet.tsx                       🟡 Shadcn sheet component
│   │       ├── 📄 sidebar.tsx                     🟡 Shadcn sidebar component
│   │       ├── 📄 skeleton.tsx                    🟡 Shadcn skeleton component
│   │       ├── 📄 slider.tsx                      🟡 Shadcn slider component
│   │       ├── 📄 sonner.tsx                      🟡 Shadcn sonner toast component
│   │       ├── 📄 switch.tsx                      🟡 Shadcn switch component
│   │       ├── 📄 table.tsx                       🟡 Shadcn table component
│   │       ├── 📄 tabs.tsx                        🟡 Shadcn tabs component
│   │       ├── 📄 textarea.tsx                    🟡 Shadcn textarea component
│   │       ├── 📄 toast.tsx                       🟡 Shadcn toast component
│   │       ├── 📄 toaster.tsx                     🟡 Shadcn toaster component
│   │       ├── 📄 toggle-group.tsx                🟡 Shadcn toggle group component
│   │       ├── 📄 toggle.tsx                      🟡 Shadcn toggle component
│   │       ├── 📄 tooltip.tsx                     🟡 Shadcn tooltip component
│   │       └── 📄 use-toast.ts                    🟡 Shadcn toast hook
│   ├── 📄 constants/
│   │   ├── 📄 categories.ts                       🟢 Application category definitions
│   │   └── 📄 navigation.ts                       🟢 Navigation menu configuration
│   ├── 📄 hooks/
│   │   ├── 📄 use-attractions.ts                  🟡 Attractions data management hook
│   │   ├── 📄 use-mobile.tsx                      🟢 Mobile viewport detection hook
│   │   ├── 📄 use-navigation.ts                   🟡 Navigation state management hook
│   │   ├── 📄 use-seo-tracking.ts                 🔴 SEO analytics and tracking hook
│   │   └── 📄 use-toast.ts                        🟡 Toast notification hook
│   ├── 📄 integrations/
│   │   └── 📄 supabase/
│   │       └── 📄 client.ts                       🟡 Supabase client configuration
│   ├── 📄 lib/
│   │   ├── 📄 attraction-utils.ts                 🟢 Attraction data utility functions
│   │   ├── 📄 format-utils.ts                     🟢 Data formatting utility functions
│   │   └── 📄 utils.ts                            🟡 General utility functions
│   ├── 📄 pages/
│   │   ├── 📄 Index.tsx                           🟡 Homepage component
│   │   ├── 📄 About.tsx                           🟢 About page component
│   │   ├── 📄 AdDashboard.tsx                     🟢 Advertisement dashboard page
│   │   ├── 📄 Attractions.tsx                     🟢 Attractions listing page
│   │   ├── 📄 Jobs.tsx                            🟢 Jobs listing page
│   │   ├── 📄 NotFound.tsx                        🟢 404 error page component
│   │   ├── 📄 Restaurants.tsx                     🟢 Restaurants listing page
│   │   ├── 📄 SEODashboard.tsx                    🟡 SEO and security dashboard page
│   │   └── 📄 Services.tsx                        🟢 Services listing page
│   └── 📄 types/
│       ├── 📄 attractions.ts                      🟢 Attraction data type definitions
│       ├── 📄 index.ts                            🟢 Main type exports
│       └── 📄 navigation.ts                       🟢 Navigation type definitions
```

## Statistics Summary

- **Total Files:** 102
- **Complexity Distribution:**
  - 🟢 Low Complexity (0-3 imports): 68 files (67%)
  - 🟡 Medium Complexity (4-7 imports): 32 files (31%)
  - 🔴 High Complexity (8+ imports): 2 files (2%)

## Key Architecture Highlights

- **React 18** with TypeScript for type safety
- **Vite** for fast development and building
- **Tailwind CSS** with custom design system
- **Shadcn/UI** component library for consistent design
- **React Router** for client-side routing
- **Supabase** integration for backend services
- **SEO optimized** with meta tags, sitemap, and structured data
- **Mobile-first** responsive design approach
- **Security auditing** capabilities built-in