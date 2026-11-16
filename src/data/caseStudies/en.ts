import type { CaseStudy } from './types';
import { ukCaseStudies } from './uk';

/**
 * English case studies. Audience: brands in the EU, the UK and the US.
 * British spelling, as on the rest of the site. Images, figures and the
 * pin layout come from the Ukrainian originals; only the text changes.
 * Numbers use English formatting (17,000 · 1.1M · 4.1x).
 */

const wed = ukCaseStudies['pinterest-ads-wedding-dresses'];
const decor = ukCaseStudies['pinterest-ads-home-decor'];
const etsy = ukCaseStudies['etsy-jewelry-shop-seo'];

/** Same pins in the same order, with alt text in English. */
function withAlts(pins: CaseStudy['solution']['pins'], alts: string[]) {
  return pins?.map((pin, i) => ({ ...pin, alt: alts[i] ?? pin.alt }));
}

export const enCaseStudies: Record<string, CaseStudy> = {
  'pinterest-ads-wedding-dresses': {
    ...wed,
    metaTitle: 'Pinterest Ads Case Study: 17K Monthly Clicks | Koshman Ecom',
    metaDescription:
      'How Pinterest Ads drove 17,000 website visits and 1.1M impressions a month in France for a B2B wedding dress manufacturer. Strategy, results, lessons.',
    keywords:
      'Pinterest Ads case study, Pinterest advertising agency, Pinterest ads for B2B, Pinterest marketing for wedding brands, Pinterest ads France, Pinterest Ads management',
    breadcrumb: 'Pinterest Ads for wedding dresses',
    h1: 'Pinterest Ads Case Study: 17,000 Brides a Month for a B2B Wedding Dress Manufacturer',
    lead: 'How Pinterest advertising built demand among French brides and sent them to the brand’s partner bridal salons.',
    tags: ['B2B', 'Wedding dresses', 'France'],
    summary:
      'In 5 months, Pinterest advertising became a standalone source of demand in France for a European wedding dress manufacturer. The channel now drives 17,000 website visits and 1.1M impressions every month — all from Pinterest Ads alone.',
    facts: [
      ['Client', 'B2B wedding dress manufacturer'],
      ['Market', 'France'],
      ['Channel', 'Pinterest Ads'],
      ['Period', 'June – October 2026, ongoing'],
    ],
    cover: { ...wed.cover, alt: 'Pinterest ad for a wedding dress, France' },
    og: {
      ...wed.og,
      title: '17,000 clicks a month',
      subtitle: 'B2B wedding dress brand · France · 1.1M impressions a month',
    },
    metrics: [
      ['17,000', 'website visits per month'],
      ['1.1M', 'impressions among French brides'],
      ['×2.2', 'traffic growth in 5 months'],
    ],
    task: {
      title: 'How to advertise a B2B brand that sells through bridal salons',
      paragraphs: [
        'The client sells wedding dresses through a network of partner salons. A bride chooses her dress online, but tries it on and buys it in a salon — so there are no online sales.',
        'Before launch, Pinterest was not an advertising channel for the brand in France. The goal was to build demand among French brides and send them to partner salons. The more brides come into a salon asking for the brand’s dresses, the more styles salons order from the manufacturer.',
      ],
    },
    solution: {
      ...wed.solution,
      title: 'A Pinterest Ads strategy built for offline sales',
      steps: {
        title: 'A funnel built for salon sales',
        text: 'A bride sees a pin with a dress, opens the style page, then goes to “Where to buy” and finds a salon in her city. We optimise ads for how many people reach the salon search, not for clicks.',
        items: [
          ['Pin', 'a bride sees the dress in her feed or in search', 'pin'],
          ['Dress page', 'photos and style details', 'dress'],
          ['“Where to buy”', 'salon search by city', 'search'],
          ['Partner salon', 'fitting and purchase', 'store'],
        ],
        badge: 'optimisation goal',
      },
      cards: [
        [
          'End-to-end analytics',
          'We set up on-site action tracking and connected Pinterest data with Google Analytics. Now we can see exactly which dress brings brides to a fitting, and budget follows real results.',
        ],
        [
          'Continuous creative testing',
          'Over 5 months we tested more than 50 dress styles across formats: static images, video and carousels. Weak ads get replaced, and budget moves to the ones that bring brides into salons.',
        ],
      ],
      pins: withAlts(wed.solution.pins, [
        'Pinterest ad for a wedding dress in France: full lace ball gown',
        'Satin wedding dress with lace sleeves — Pinterest Ads creative',
        'Wedding dress with a long cape — Pinterest Ads creative',
        'Bride in an open-back dress with the groom — Pinterest Ads creative',
        'Embroidered corset sheath wedding dress — Pinterest Ads creative',
      ]),
      pinsCaption: 'Pinterest Ads creatives: the brand’s dress styles',
      pinsNote: '5 of 50+ styles tested',
    },
    campaigns: {
      title: 'Three Pinterest Ads campaign types',
      items: [
        ['Traffic', 'Reaching new brides by interests and French-language search queries.'],
        ['Retargeting', 'Bringing back people who have already viewed dresses on the website.'],
        ['Actalike', 'Lookalike audiences built from people who have already searched for a salon.'],
      ],
    },
    results: {
      title: 'Pinterest advertising results',
      items: [
        ['17,000 website visits', 'every month.'],
        ['1.1M impressions a month', 'among the target audience in France.'],
        ['Cost per click', 'well below the forecast.'],
        ['1.6% CTR', 'against a Pinterest average of 0.5–2%.'],
        ['A steady daily flow', 'of brides to the partner salon locator.'],
      ],
      chart: {
        ...wed.results.chart,
        label: 'Website visits from Pinterest by month',
        growth: '×2.2',
        alt: 'Pinterest Ads campaign results: 17,000 website visits a month',
        months: [
          ['June', 7600, 'Jun'],
          ['July', 12400, 'Jul'],
          ['August', 12800, 'Aug'],
          ['September', 16500, 'Sep'],
          ['October', 17000, 'Oct'],
        ],
        table: ['Month', 'Website visits'],
      },
    },
    insights: {
      title: 'What we learned',
      intro: 'Three observations from 5 months of campaigns that we now build into every Pinterest Ads project.',
      items: [
        [
          'A high CTR doesn’t mean sales',
          'The most clicked ads were often the least likely to bring a bride to a salon. Ads with an average CTR converted several times better than the click leaders. That’s why we judge ads by conversions, not clicks.',
          'click',
        ],
        ['Carousels and video beat single images', 'This is most noticeable when campaigns launch.', 'video'],
        [
          'Decisions are driven by data',
          'Every ad gets enough clicks before we draw a conclusion. That way we don’t cut a style that simply started slowly.',
          'data',
        ],
      ],
    },
    conclusion: {
      title: 'Conclusion',
      text: 'Pinterest advertising works for more than online stores. For a B2B brand that sells through salons or distributors, it builds demand among end customers — and that demand turns into orders from partners.',
      ctaLabel: 'Discuss Pinterest Ads',
    },
    faqTitle: 'Pinterest advertising FAQ',
    faq: [
      [
        'Does Pinterest Ads work for B2B businesses?',
        'Yes, if the product is visual and its end customer looks for ideas on Pinterest. Ads build demand among end customers, and that demand turns into orders from partners: salons, retailers and distributors.',
      ],
      [
        'Can you advertise on Pinterest without an online store?',
        'Yes. In this case the website has no online checkout. A conversion is a visit to the salon locator page, and that is what the ads are optimised for.',
      ],
      [
        'How much does Pinterest advertising cost?',
        'Cost per click depends on the niche, country, audience and creative quality. In this project it came in well below the initial forecast. We work out the numbers for your business before launch.',
      ],
      [
        'How soon does Pinterest Ads deliver results?',
        'The first stable data comes in during the first month. Over 5 months of optimisation, traffic grew 2.2 times.',
      ],
      [
        'Which Pinterest ad formats work best?',
        'In fashion, carousels and video performed best at launch. We always confirm the final choice of format with tests.',
      ],
      [
        'Which markets is Pinterest advertising right for?',
        'Pinterest is widely used across Europe — France, Germany, Italy, Poland and beyond — as well as in the UK and the US. We run campaigns in the language of each market.',
      ],
    ],
    leadTitle: 'Want to build demand on Pinterest for your brand?',
    leadText: 'We’ll set up Pinterest Ads around your sales model: an online store, B2B or selling through partners.',
  },

  'pinterest-ads-home-decor': {
    ...decor,
    metaTitle: 'Pinterest Ads for Home Decor: 4.1x ROAS Case | Koshman Ecom',
    metaDescription:
      'How Pinterest advertising brought a home decor online store 1,050 orders and up to 4.1x ROAS in Germany and Poland in 6 months.',
    keywords:
      'Pinterest ads for ecommerce, Pinterest Ads case study, home decor advertising, Pinterest ads Germany, Pinterest ads Poland, Pinterest ROAS',
    breadcrumb: 'Pinterest Ads for a home decor store',
    h1: 'Pinterest Ads Case Study: 1,050 Orders and 4.1x ROAS for a Home Decor Online Store',
    lead: 'How Pinterest advertising became a standalone sales channel for a Scandinavian-style decor brand in Germany and Poland.',
    tags: ['E-commerce', 'Home decor', 'Germany', 'Poland'],
    summary:
      'In 6 months, Pinterest advertising became a standalone sales channel in Germany and Poland for a modern home decor brand. It delivered 1,050 orders, and return on ad spend grew from 1.6x at launch to 4.1x.',
    facts: [
      ['Client', 'Modern home decor in a Scandinavian minimalist style'],
      ['Markets', 'Germany, Poland'],
      ['Channel', 'Pinterest Ads'],
      ['Period', '6 months'],
    ],
    cover: { ...decor.cover, alt: 'Pinterest ads for a home decor store in Germany and Poland' },
    og: {
      ...decor.og,
      title: '1,050 orders and 4.1x ROAS',
      subtitle: 'Home decor online store · Germany and Poland · 6 months',
    },
    metrics: [
      ['1,050', 'orders from Pinterest'],
      ['4.1x', 'ROAS in months 4–6'],
      ['78,000', 'website visits'],
    ],
    task: {
      title: 'Making Pinterest a profitable channel in two markets at once',
      paragraphs: [
        'The brand sells textiles, organisers and design-led lighting in a Scandinavian style. Shoppers for exactly these products look for interior ideas on Pinterest long before they are ready to buy.',
        'The goal was to launch Pinterest as a profitable sales channel in two markets at once, with very different purchasing power and advertising costs.',
      ],
    },
    solution: {
      ...decor.solution,
      title: 'A Pinterest Ads strategy for two markets',
      cards: [
        [
          'Two markets, two roles',
          'Germany became the market for a higher average order value, and Poland the market for order volume at a lower ad cost. We split the budget so both markets paid back equally.',
        ],
        [
          'Creatives that look like inspiration',
          'We showed products in real interiors rather than on a white background, using vertical pins and compositions of several products in one room.',
        ],
      ],
      steps: {
        title: 'Scaling step by step',
        items: [
          ['Month 1 — testing', 'Creatives, combinations and audiences.', 'test'],
          ['Month 2 — optimisation', 'Switched off weak pins and launched retargeting to people who saved pins.', 'tune'],
          ['Month 3 — stabilisation', 'Added dynamic retargeting for abandoned baskets.', 'stable'],
          ['Months 4–6 — scaling', 'Scaled the campaigns that pay back.', 'scale'],
        ],
        badge: 'ROAS 4.1x',
      },
      pins: withAlts(decor.solution.pins, [
        'Pinterest ad for Germany: “Wohnkultur zum Verlieben”, 15% off decor sets',
        'Pinterest ad for Poland: 15% off home decor sets',
        'Japandi-style Pinterest ad “Shop the look”: living room decor',
        'Pinterest ad for Germany: “Japandi Deko-Set”, a living room refresh for the new season',
        'Pinterest ad for Poland: “Stwórz ten klimat w swoim domu”, a bedroom decor set',
      ]),
      pinsCaption: 'Pinterest ads for Germany and Poland: products in real interiors, not on a white background',
    },
    results: {
      title: 'Results after 6 months',
      items: [
        ['1,050 orders from Pinterest:', '480 in Germany and 570 in Poland.'],
        ['≈3.3x ROAS over the whole period,', 'the same in both markets.'],
        ['2.8M+ impressions', 'and 78,000 website visits.'],
        ['22,500 pin saves:', 'future buyers who come back to products later.'],
        ['2.6% CTR', 'against a Pinterest average of 0.5–2%.'],
      ],
      chart: {
        ...decor.results.chart,
        label: 'ROAS by campaign stage',
        growth: '4.1x',
        alt: 'Pinterest Ads ROAS growth: from 1.6x in month 1 to 4.1x in months 4–6',
        months: [
          ['Month 1 — testing', 1.6, 'M1'],
          ['Month 2 — optimisation', 2.3, 'M2'],
          ['Month 3 — stabilisation', 3.2, 'M3'],
          ['Months 4–6 — scaling', 4.1, 'M4–6'],
        ],
        table: ['Month', 'ROAS'],
      },
    },
    insights: {
      title: 'What we learned',
      intro: 'Three observations from 6 months of campaigns that we now build into every Pinterest Ads project.',
      items: [
        [
          'Pinterest sells with a delay',
          'Some customers ordered from pins they had saved 2–3 months earlier. That’s why ROAS kept growing every month, not just at launch.',
          'clock',
        ],
        [
          'Saves are an audience in their own right',
          'Retargeting people who saved pins became one of the main drivers of return on ad spend.',
          'bookmark',
        ],
        [
          'Different markets, different economics',
          'Germany brings a higher average order value; Poland brings volume and cheaper orders. Together they pay back more steadily than either market on its own.',
          'globe',
        ],
      ],
    },
    conclusion: {
      title: 'Conclusion',
      text: 'For a decor brand, Pinterest is more than inspiration — it is a full sales channel. The key is patience in the first 2–3 months and retargeting people who save pins, because that is when delayed demand kicks in.',
      ctaLabel: 'Get a store audit',
    },
    faqTitle: 'Pinterest Ads for online stores: FAQ',
    faq: [
      [
        'Does Pinterest advertising pay off for a home decor online store?',
        'Yes. In this case ROAS grew from 1.6x in the first month to 4.1x in months 4–6.',
      ],
      [
        'How long does it take for Pinterest Ads to become profitable?',
        'Usually 2–3 months. The first month goes on testing, and some customers buy a few weeks after saving a pin.',
      ],
      [
        'Which is better for Pinterest Ads: Germany or Poland?',
        'Germany has a higher average order value; Poland has cheaper advertising and more orders. Combining the two markets gave the same return in both.',
      ],
      [
        'What is retargeting to pin savers on Pinterest?',
        'It means showing ads to people who have already saved your pin to one of their boards. They are already interested, so they buy more often than a new audience.',
      ],
      [
        'Which creatives work for home decor?',
        'Products shown in a real interior, vertical 2:3 pins and compositions of several products in one room.',
      ],
      [
        'Do you run Pinterest Ads for the UK and the US?',
        'Yes. Alongside EU markets, we run campaigns for the UK and the US, in the language of each market and with a budget split that reflects each market’s economics — as in this case.',
      ],
    ],
    leadTitle: 'Get a Pinterest Ads audit for your store',
    leadText: 'We’ll review your product range and markets and show how Pinterest can become a standalone sales channel.',
  },

  'etsy-jewelry-shop-seo': {
    ...etsy,
    metaTitle: 'Etsy Case Study: $14,300 in Jewellery Sales in 7 Months | Koshman Ecom',
    metaDescription:
      'How we doubled traffic for an existing Etsy jewellery shop: +103% visits, 161 orders and $14,300 in revenue in 7 months. Etsy SEO, listings, automated uploads.',
    keywords:
      'Etsy SEO, Etsy case study, Etsy listing optimisation, Etsy jewellery shop, Etsy shop management, Etsy marketing agency, automated Etsy listings',
    client: 'Jewellery brand',
    breadcrumb: 'Etsy SEO for a jewellery shop',
    h1: 'Etsy Case Study: How We Doubled Traffic for an Existing Jewellery Shop and Grew It to $14,300 in Sales in 7 Months',
    lead: 'How systematic Etsy SEO and automated listing uploads turned a stalled jewellery shop into steady growth.',
    tags: ['Etsy', 'Jewellery', 'US & Europe'],
    summary:
      'The jewellery shop was already live on Etsy, but sales had stalled. Instead of starting from scratch, we rebuilt what was there: settings, listings, keywords and branding. Then we automated listing uploads, added 102 new listings and handed the shop over to the client’s team with a ready-made growth plan. Seven months later, traffic had doubled and the shop had received 161 orders.',
    facts: [
      ['Client', 'Jewellery brand (gold-plated, silver)'],
      ['Platform', 'Etsy'],
      ['Scope', 'SEO, listings, branding, shop setup, automated uploads'],
      ['Period', 'January – July 2025'],
    ],
    cover: {
      ...etsy.cover,
      alt: 'Etsy jewellery shop: $14,300 in revenue, monthly traffic up from ≈2,600 to ≈5,500 visits, January – July 2025',
    },
    // Перший екран — картка-дашборд: виручка, крива візитів з Etsy Stats і ключові показники
    heroVisual: {
      type: 'stats',
      total: '$14,300',
      label: 'shop revenue in 7 months',
      badge: '×2',
      seriesLabel: 'Monthly visits',
      series: [['Jan', 2600], ['Feb', 2900], ['Mar', 3300], ['Apr', 3800], ['May', 4400], ['Jun', 5000], ['Jul', 5500]],
      approx: true,
      rows: [['orders', '161'], ['average order', '≈ $89'], ['conversion', '2.1%']],
    },
    og: { title: '$14,300 in sales in 7 months', subtitle: 'Etsy jewellery shop · +103% visits · 161 orders' },
    metrics: [
      ['$14,300', 'revenue, January – July 2025'],
      ['+103%', 'visits year over year'],
      ['80', 'reworked listings'],
      ['102', 'new SEO-optimised listings'],
    ],
    task: {
      title: 'How to grow an existing Etsy shop',
      paragraphs: [
        'The shop had products, reviews and a sales history, but it was lost among hundreds of similar pieces in Etsy search. Listings were formatted inconsistently, tags didn’t match how buyers actually search, and the branding didn’t explain what set the brand apart.',
        'The range grew slowly because the team prepared every new listing by hand. The goal was to turn a scattered shop into a system that Etsy is happy to show — and that the client’s team can keep growing on its own.',
      ],
    },
    solution: {
      ...etsy.solution,
      title: 'What we did',
      steps: {
        ...etsy.solution.steps,
        title: '8 steps from audit to handover',
        items: [
          ['Shop audit and setup', 'We reviewed shipping, policies, sections, payments and order processing, and fixed everything that affects ranking and buyer trust: dispatch times, returns, section structure.', 'settings'],
          ['Keyword research', 'Instead of expensive high-volume terms, we focused on long-tail and gifting searches: “gift for girlfriend”, “anniversary jewellery”, “bridal jewellery”. Keywords were mapped to products and seasons.', 'key'],
          ['80 listings reworked', 'For every product we updated the title, all 13 tags, attributes and description, and added answers to common questions: size, material, care, packaging.', 'edit'],
          ['Automation and 102 new listings', 'We set up uploads that create listings with titles, tags and descriptions straight from the keyword map, so every new product goes into search with the right keywords.', 'bolt'],
          ['Photos and search CTR', 'New main photos: macro details, on-model shots, slides with sizes and materials. The photo has to answer the buyer’s question before the click.', 'photo'],
          ['Shop branding', 'We redesigned the banner, logo, About section, welcome message and FAQ. The shop started to look like a brand, not a collection of separate products.', 'brush'],
          ['Service and rating', 'Quick replies, message templates and a review process kept the rating high as orders grew.', 'star'],
          ['Handover to the team', 'With a growth plan: keyword map, seasonal update calendar, guides and the automated upload set up and running.', 'handoff'],
        ],
        badge: 'run in-house',
      },
    },
    results: {
      title: 'Results in 7 months',
      items: [
        ['27,500 shop visits', 'in 7 months.'],
        ['+103% visits', 'year over year.'],
        ['161 orders and $14,300 in revenue,', 'average order ≈ $89, conversion rate 2.1%.'],
        ['80 reworked and 102 new listings', 'in Etsy search.'],
        ['Monthly traffic doubled:', 'from ~2,600 visits in January to ~5,500 in July, with no dips.'],
        ['The client’s team', 'now runs the shop on its own, following the plan.'],
      ],
      screenshot: {
        ...etsy.results.screenshot!,
        alt: 'Etsy Stats screenshot for the jewellery shop: 27,500 visits, 161 orders, 2.1% conversion rate, $14,300 revenue, January – July 2025',
        caption: 'Etsy Stats, January – July 2025: visits up 103% year over year',
      },
      chart: {
        ...etsy.results.chart,
        label: 'Etsy shop visits by month, 2025',
        alt: 'Etsy jewellery shop traffic grew from ≈2,600 visits in January to ≈5,500 in July 2025',
        months: [
          ['January', 2600, 'Jan'],
          ['February', 2900, 'Feb'],
          ['March', 3300, 'Mar'],
          ['April', 3800, 'Apr'],
          ['May', 4400, 'May'],
          ['June', 5000, 'Jun'],
          ['July', 5500, 'Jul'],
        ],
        table: ['Month', 'Visits'],
      },
    },
    insights: {
      title: 'What we learned',
      intro: 'Four takeaways we now build into every Etsy project.',
      items: [
        ['An existing shop scales faster than a new one', 'Sales history and reviews already help ranking, so it’s enough to remove whatever stops Etsy from showing the products.', 'store'],
        ['Long-tail brings buyers, not just views', 'Narrow gifting searches get fewer impressions, but the people behind them arrive ready to buy.', 'search'],
        ['Range size is SEO too', 'The more quality listings, the more searches the shop covers. Automation let us add products fast without cutting corners on optimisation.', 'scale'],
        ['Plan for seasons in advance', 'Valentine’s Day and wedding-season listings were updated 4–6 weeks before the peak so Etsy had time to index them.', 'clock'],
      ],
    },
    faqTitle: 'Etsy SEO and shop growth: FAQ',
    faq: [
      ['Can you grow a shop that has been running for a long time?', 'Yes, and it’s often even faster. Reviews and sales history are already there, so the work is usually in the listings, keywords and branding.'],
      ['How soon will we see results?', 'The first changes in traffic show up 3–6 weeks after listings are updated. Steady growth usually comes within 2–3 months.'],
      ['Do we have to run Etsy Ads?', 'No. In this case, most of the growth came from organic search. We add ads once the listings are already converting.'],
      ['Can listing uploads be automated?', 'Yes. We set up uploads that create listings with SEO-optimised titles, tags and descriptions. It saves hours of work on every batch of products.'],
      ['Can we run the shop ourselves afterwards?', 'Yes. We hand over the shop with a growth plan, keyword map, guides and configured tools so your team can carry on without us.'],
      ['Does this work for niches other than jewellery?', 'Yes. The approach works for any visual handmade product: home decor, clothing, accessories, gifts.'],
      ['What do you need from us to start?', 'Access to the shop and a 30-minute call about your products, audience and goals. We do the audit ourselves.'],
    ],
    leadTitle: 'Want to grow your Etsy shop the same way?',
    leadText: 'We’ll look at your shop, listings and niche and show you what’s stopping Etsy from showing your products.',
  },
};
