import { Helmet } from 'react-helmet-async'

const SEOHead = ({ 
  title = "Ace of Blades Barbershop | Scarborough's Premium Haircuts & Fades",
  description = "Ace of Blades Barbershop - Scarborough's premium barbershop offering professional haircuts, fades, beard trims, and hot towel shaves. Book with Ace, Chris, or Dhan at 2207 Kingston Rd.",
  keywords = "Scarborough barbershop, haircuts, fades, beard trims, Kingston Road barber, premium barbershop, hot towel shave, Scarborough hair salon, best barber near me",
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
    </Helmet>
  )
}

export default SEOHead

