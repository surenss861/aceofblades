// Analytics and Marketing Pixel Integration
// Replace with your actual tracking IDs

export const initAnalytics = () => {
  // Google Analytics (GA4)
  if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_MEASUREMENT_ID}`
    document.head.appendChild(script1)

    window.dataLayer = window.dataLayer || []
    function gtag(...args) {
      window.dataLayer.push(args)
    }
    gtag('js', new Date())
    gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID)

    window.gtag = gtag
  }

  // Facebook Pixel
  if (import.meta.env.VITE_FB_PIXEL_ID) {
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    
    window.fbq('init', import.meta.env.VITE_FB_PIXEL_ID)
    window.fbq('track', 'PageView')
  }
}

// Track custom events
export const trackEvent = (eventName, eventParams = {}) => {
  // Google Analytics
  if (window.gtag) {
    window.gtag('event', eventName, eventParams)
  }

  // Facebook Pixel
  if (window.fbq) {
    window.fbq('track', eventName, eventParams)
  }
}

// Track booking conversions
export const trackBooking = (serviceName, barberName) => {
  trackEvent('booking_initiated', {
    event_category: 'Booking',
    event_label: `${serviceName} - ${barberName}`,
    value: 1
  })
}

// Track email signups
export const trackEmailSignup = (source) => {
  trackEvent('email_signup', {
    event_category: 'Lead Generation',
    event_label: source
  })
}

