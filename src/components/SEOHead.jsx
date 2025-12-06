import { Helmet } from 'react-helmet-async'

const SEOHead = ({ 
  title = "Ace of Blades Barbershop | Scarborough's Premium Haircuts & Fades",
  description = "Ace of Blades Barbershop - Scarborough's premium barbershop offering professional haircuts, fades, beard trims, and hot towel shaves. Book with Ace, Chris, or Dhan at 2207 Kingston Rd.",
  keywords = "luxury barbershop Toronto, best fade Scarborough, premium barbershop Scarborough, Scarborough barbershop, haircuts, fades, beard trims, Kingston Road barber, premium barbershop, hot towel shave, Scarborough hair salon, best barber near me, luxury grooming Toronto, premium haircuts Scarborough",
  image = "https://aceofbladesco.com/images/og-image.jpg",
  url = "https://aceofbladesco.com"
}) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Ace of Blades Barbershop" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Local SEO */}
      <meta name="geo.region" content="CA-ON" />
      <meta name="geo.placename" content="Scarborough" />
      <meta name="geo.position" content="43.7500;-79.2500" />
      <meta name="ICBM" content="43.7500, -79.2500" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Ace of Blades Barbershop" />
      <meta property="og:locale" content="en_CA" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Enhanced Structured Data for Local SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HairSalon",
          "name": "Ace of Blades Barbershop",
          "image": "https://aceofbladesco.com/aceofbladeslogo.avif",
          "description": description,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "2207 Kingston Rd",
            "addressLocality": "Scarborough",
            "addressRegion": "ON",
            "postalCode": "M1N 1T5",
            "addressCountry": "CA"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "43.7500",
            "longitude": "-79.2500"
          },
          "url": url,
          "telephone": "+1-416-XXX-XXXX",
          "priceRange": "$$",
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              "opens": "09:00",
              "closes": "19:00"
            }
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "150",
            "bestRating": "5",
            "worstRating": "1"
          },
          "serviceArea": {
            "@type": "City",
            "name": "Toronto"
          },
          "areaServed": {
            "@type": "City",
            "name": "Scarborough"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Barbershop Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Haircut + Beard",
                  "description": "Complete transformation with precision haircut and expert beard grooming"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Design",
                  "description": "Custom patterns, logos, and artistic designs"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Beard Trim / Lineup",
                  "description": "Precision trims and flawless lineups"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Kids Cut",
                  "description": "Gentle, patient approach to children's haircuts"
                }
              }
            ]
          }
        })}
      </script>
    </Helmet>
  )
}

export default SEOHead

