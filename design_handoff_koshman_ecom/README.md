# Handoff: Koshman Ecom — marketing agency website

## Overview
Multi-page marketing website for **Koshman Ecom**, a full-cycle e-commerce marketing agency (B2C and B2B: marketplaces such as Etsy/Amazon/eBay, Shopify sites, ads, SEO/AI search, branding). The site has 14 pages, three languages (UA default, EN, SK), a desktop layout plus a dedicated mobile layout, a lead form, and several easter eggs built around the agency cat **Mars**.

## About the design files
The files in `design/` are **design references built in HTML**: prototypes that show the intended look, copy and behaviour. They are not production code to ship. The task is to **recreate them in a real codebase**. If no stack exists yet, a static-friendly framework fits well, for example **Next.js (App Router) or Astro + Tailwind**, with i18n routing (`/`, `/en/`, `/sk/`), since the site is mostly content plus a few interactive islands.

How to read the prototypes:
- Each `*.dc.html` is a self-contained page. Open it in a browser with the folder served over HTTP (`npx serve design`). The markup between `<x-dc>` and `</x-dc>` is the template, where `{{ name }}` holes are filled from `renderVals()` in the `<script data-dc-script>` class at the bottom of the file. `<sc-for>` is a loop, `<sc-if>` is a conditional, and `<dc-import name="X">` mounts `X.dc.html` as a child component.
- All styling is **inline** on purpose, which is a prototype constraint. In production, extract it into components and tokens (see below).
- `support.js` is only the prototype runtime. Do not port it.

## Fidelity
**High-fidelity.** Final colours, typography, spacing, copy and interactions. Recreate pixel-accurately at 1440px desktop and 390px mobile.

## Global layout system
- **Desktop canvas:** a fixed 1440px-wide design. The prototype scales the whole page with CSS `zoom = viewportWidth / 1440` (variable `zoom` in each page). Production should build a real fluid layout: a max content width of 1440px, side padding of 86px (desktop) / 20px (mobile), and **fluid** columns below about 1200px. Do not copy the zoom trick.
- **Breakpoint:** `< 768px` = mobile.
  - **Home** has a separate hand-built mobile design: `Mobile.dc.html`, mounted by `Hero.dc.html` when `isMobile`. Use it as the reference for the home page on mobile.
  - **All other pages** get mobile layout from `mobile.js`, a global set of CSS overrides on `html[data-m]`. It collapses grids to 1 column, uses 20px side padding and 48px section padding, h1 34px, h2 27px, h3 20px, p 16px, wraps button rows, and stacks form actions. It also swaps the desktop header/footer (`data-desk`) for `MHeader` / `MFooter` (`data-mob`). Treat `mobile.js` as a spec of the intended mobile behaviour and implement it properly with responsive classes.
  - Exceptions kept multi-column on mobile: comparison tables (`data-m-cmp`, 3 columns), the 5-column cases table (`data-m-t5`), and the 12-column cases grid (`data-m-keep`).
- **Header (desktop):** sticky, 82px tall, `#FF5B2B`, padding 0 80px. Logo "KOSHMAN / ECOM" (800, 18px, uppercase, two lines). Nav at 14px/500 white with a 2px white underline that grows on hover (.25s). Nav items: Головна, Послуги, Кейси, Про нас, Відгуки, Блог, Інструменти, Контакти. White CTA "Зв'яжіться з нами" (41px tall, `#FF5B2B` text, 700 uppercase). Language dropdown: a 72×41 bordered button opening a white menu (Українська UA / English EN / Slovenčina SK).
- **Header (mobile, `MHeader`):** 64px tall, orange, with a language button and a burger. The burger opens a full-screen `#141414` menu with 24px/600 links, language buttons and a CTA. Body scroll is locked while the menu is open.
- **Footer:** `#141414`. Desktop has 5 columns: logo plus a blurb, then Навігація, Компанія, Інструменти and Контакти. Mobile (`MFooter`) uses a 2-column link grid. `FooterLogo` is the clickable logo with an easter egg (see Interactions).
- **Lead form section** (`#lead`) repeats on most pages: a 420px intro column plus the form, with a dark or `#EEEEEE` background depending on the page.

## Screens
| File | Page | Sections (top → bottom) |
|---|---|---|
| `Hero.dc.html` | Home (desktop) | Hero with H1, subtitle, 2 CTAs and the animated **compass** (`koshman-compass.js`) · client logo marquee (30s loop) · `#for-whom` "3 речі…" with the **lost-sales funnel animation** (`funnel-*.jsx`) · `#services` "Чим ми можемо бути корисні?" with category filter chips and service list · `#about` "Результат, а не процес" · `#cases` horizontal case cards · `#reviews` stacked review cards and video reviews · `#lead` form · `#tools` "Наші ресурси" cards with animated gradients · `#blog` · `#faq` (sticky left column, accordion) · footer |
| `Mobile.dc.html` | Home (mobile) | Order: H1 → compass → subtitle → 1 primary CTA "Безкоштовна консультація" + text link "Наші послуги" · logo marquee · Growth · Lost sales (label → H2 → animation → text → "Переглянути →" button) · Services (wrapping chips + "Всі послуги →" to Services page) · Results · Cases (snap-scroll cards) · Reviews · Lead form · Resources · Blog · FAQ · footer |
| `Services.dc.html` | Services | Hero · "Наші ключові напрямки" (3-column cards) · task filter chips · service categories list · lead form |
| `ServicePage.dc.html` | Single service (template; example "Відкриття магазину на Etsy під ключ") | Breadcrumbs · hero · what's included · comparison table (`280px 1fr 1fr`) · steps · FAQ · lead form. Service copy is in `assets/service-descriptions.json` |
| `Cases.dc.html` | Cases list + case detail (switches in-page via state) | List: hero + grid of cards (no category badges on covers). Detail: hero, Задача, and type-specific blocks: **ads** (Канали, Воронка, Креативи), **etsy** (timeline, before/after, Etsy SEO), **dev/brand** |
| `About.dc.html` | About | Hero · Наш фокус · Наша місія (orange) · Наш підхід · Що ми робимо · Team ("Хто стоїть за агенцією"; photo cards, square photos on mobile) · Join team · lead form |
| `Blog.dc.html` | Blog list + article (in-page state) | List with search and tag filter, article cards · article view with breadcrumbs |
| `Tools.dc.html` | Tools | Hero · tool cards (Etsy profit calculator, pricing calculator, Etsy vs Amazon vs Shopify, image resizer, Etsy finance dashboard, SEOgenie) · lead form |
| `Careers.dc.html` | Careers | Hero "Будуймо e-commerce разом" · `#jobs` vacancies · `#apply` application form |
| `Contacts.dc.html` | Contacts | Contacts block with channels, socials and a manager card · lead form |
| `Thanks.dc.html` | Thank-you page after form submit | |
| `404.dc.html` | 404 | Large gradient "404" (340px/800; 150px on mobile) with **Mars peeking from behind the "0"** and a side bubble "Я загубив сторінку…" · primary CTA "Допомогти Марсу →" (to home) · "Зв'язатися з нами" · "Популярні розділи" link list |
| `Privacy.dc.html`, `Terms.dc.html` | Legal | Dark hero + 2-column content with sticky table of contents |

Shared components: `MHeader`, `MFooter`, `FooterLogo`, `MarsRoamer`, `CookieBanner`. `Button Animation.dc.html` is the reference for the CTA hover animation.

## Interactions and behaviour
- **i18n** (`i18n.js`): one dictionary of `[UA, EN, SK]` rows, about 950 strings. The prototype translates DOM text at runtime, but production should use real locale files generated from this table. The language is stored in `localStorage['koshman-lang']`, and switching fires a `koshman-lang` event. SEO hreflang: `/`, `/en/`, `/sk/` (see `<helmet>` in `Hero.dc.html` and `seo/`).
- **Compass** (`koshman-compass.js`, a web component): seamless 13s loop and pauses off-screen. Respects `prefers-reduced-motion`. Easter egg: drag around the dial **3 full turns (clockwise → anticlockwise → clockwise)**, which shows "UNLOCKED" and a modal with promo code **COMPASS15** (−15%). On mobile, tapping the compass enters drag mode (page scroll is locked over the dial), and "Готово" exits it. On narrow screens the W/E labels are hidden and label size is capped.
- **Lost-sales funnel animation** (`funnel-*.jsx`): products drop toward the cart, and exactly **3 balls** land in the cart.
- **Resource cards:** background gradients animate on hover (`svcFlow` 3.2s ease-in-out infinite, `background-position` 0→100→0%).
- **Mars cat** (`MarsRoamer`):
  - Desktop only for random appearances. First appearance after 12–20s, then every 60–90s, at most 4 per session. It does not appear while the user is typing or scrolling.
  - Appearance types: bottom / right / left / hanging from the top / walking along the footer. A speech bubble shows a page-specific phrase.
  - Clicking Mars 3 times in a session opens a modal: −15% on the first service, code **MARS15**, with copy and book-a-consultation buttons.
  - **Copy reaction:** when the user copies text of 12 characters or more, a smaller Mars (scale 0.72) peeks from the bottom saying "Бери, не шкода. Але краще напиши нам". Throttled to once per 20s; works on all devices.
  - Mars renders at a constant on-screen size, independent of page scaling.
- **FooterLogo:** rapid repeated clicks trigger a playful reaction with Mars phrases.
- **Cookie banner:** consent bar shown on first visit.
- **Forms:** lead form with topic chips, name, contact and message fields. Submit goes to `Thanks`. Careers form likewise. Validation is not specified in the prototype; use sensible required-field rules for name and contact.
- **Reviews:** stacked cards that you click to bring forward. Video reviews open an embed modal.
- **Hover:** links fade to opacity .8. Footer links turn `#FF5B2B`. Orange buttons darken to `#E64A1C`.

## Design tokens
**Colours**
- Brand orange `#FF5B2B`, orange hover `#E64A1C`, light orange `#FF8A5C`, deep orange `#C93E14` / `#D24A20`, orange tint `#FFF1EB`
- Ink `#222222`, near-black `#141414`, surfaces `#2A2A2A` / `#262626` / `#2C2C2C` / `#3A3A3A`
- Greys `#555555`, `#8A8A8A`, `#CFCFCF`, `#DADADA`, `#DCDCDC`; light section background `#EEEEEE`; white `#FFFFFF`
- Gradients: "404" text `linear-gradient(100deg, #FF8A5C 0%, #FF5B2B 45%, #C93E14 100%)`. Resource-card gradients are the `G` object in each page's `renderVals()` ("blue" uses `uploads/pasted-1792075263463-0.png`).

**Type:** **Onest** (Google Fonts) at weights 400/500/600/700/800.
- Desktop: H1 56–64px/700, line-height 1.04, letter-spacing −0.015em · H2 44–52px/700, line-height 1.05–1.1 · body 16–18px, line-height 1.55–1.6 · eyebrow 13–14px/700, uppercase, letter-spacing 0.12–0.14em, orange · buttons 15–16px/700 uppercase, letter-spacing 0.02em.
- Mobile: H1 30–34px · H2 26–30px · body 15–16px.

**Spacing:** desktop section padding about 100–120px vertical and 86px horizontal; mobile 48–56px vertical and 20px horizontal. Card gap 15px.

**Sizes:** primary buttons 56–57px tall; header button 41px; minimum tap target 44px.

**Radius:** mostly square (0). Cards 4px; social icons 7–8px.

**Shadow:** dropdowns and bubbles use `0 10px 28px rgba(0,0,0,.18)`.

## Assets
- `design/assets/`: case covers (`case-*.png`), client logos (`logo-kan.png`, `logos-strip.png`), review images (`review-*.png`), and `service-descriptions.json` (service page copy).
- `design/uploads/pasted-1792075263463-0.png`: background texture for the "blue" resource card.
- `design/.image-slots.state.json`: images the client dropped into placeholder slots (blog covers, team photos and similar). Extract them from this file, or ask the client for originals.
- The Mars cat is an inline SVG inside `MarsRoamer.dc.html` and `404.dc.html`. Extract it as a reusable SVG component.
- `seo/robots.txt`, `seo/sitemap.xml`, `seo/llms.txt`, plus JSON-LD (Organization/ProfessionalService, OfferCatalog, FAQPage, WebSite) in the `<helmet>` of `Hero.dc.html`. Port all of these.

## Files
```
design/
  Hero.dc.html          home, desktop (mounts Mobile.dc.html < 768px)
  Mobile.dc.html        home, mobile
  Services.dc.html  ServicePage.dc.html  Cases.dc.html  About.dc.html
  Blog.dc.html  Tools.dc.html  Careers.dc.html  Contacts.dc.html
  Thanks.dc.html  404.dc.html  Privacy.dc.html  Terms.dc.html
  MHeader.dc.html  MFooter.dc.html  FooterLogo.dc.html
  MarsRoamer.dc.html  CookieBanner.dc.html  Button Animation.dc.html
  i18n.js               UA/EN/SK dictionary + runtime
  mobile.js             mobile override rules (spec for non-home pages)
  koshman-compass.js    compass web component + easter egg
  funnel-*.jsx          lost-sales animation
  image-slot.js  support.js   prototype-only runtime
  assets/  uploads/
seo/  robots.txt  sitemap.xml  llms.txt
```
