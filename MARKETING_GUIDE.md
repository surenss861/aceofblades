# Marketing & Conversion Guide

## 🎯 Lead Generation Features

### Email Capture Popup
- **Trigger**: Appears after 3 seconds or on exit intent
- **Offer**: 10% discount on first visit
- **Storage**: Uses localStorage to prevent repeat popups
- **Integration**: Ready for Mailchimp, Klaviyo, or custom API

**To customize:**
1. Edit `src/components/EmailCapture.jsx`
2. Update the discount offer text
3. Connect to your email service in the `handleSubmit` function

### Newsletter Signup
- **Location**: Footer section
- **Design**: Gradient background with clear CTA
- **Tracking**: Analytics event on signup

## 📊 Analytics Setup

### Google Analytics 4
1. Create a GA4 property
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Add to `.env` file:
   ```
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

### Facebook Pixel
1. Create a Facebook Pixel in Meta Business Manager
2. Get your Pixel ID
3. Add to `.env` file:
   ```
   VITE_FB_PIXEL_ID=123456789012345
   ```

### Event Tracking
The site automatically tracks:
- **Service Views**: When users click service cards
- **Booking Clicks**: All booking button interactions
- **Email Signups**: Newsletter and popup submissions
- **Sticky Button Clicks**: Mobile booking button usage

## 🔄 Retargeting Setup

### Facebook Retargeting
1. Set up Facebook Pixel (see above)
2. Create custom audiences in Meta Ads Manager:
   - Website visitors (last 30 days)
   - Service page viewers
   - Email signups
3. Create retargeting campaigns

### Google Ads Retargeting
1. Link Google Analytics to Google Ads
2. Create remarketing audiences
3. Set up retargeting campaigns

## 📧 Email Marketing Integration

### Mailchimp
```javascript
// In EmailCapture.jsx handleSubmit
const response = await fetch('https://us1.api.mailchimp.com/3.0/lists/{list_id}/members', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_MAILCHIMP_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email_address: email,
    status: 'subscribed'
  })
})
```

### Klaviyo
```javascript
// In EmailCapture.jsx handleSubmit
await fetch('https://a.klaviyo.com/api/v2/list/{list_id}/subscribe', {
  method: 'POST',
  headers: {
    'api-key': import.meta.env.VITE_KLAVIYO_API_KEY
  },
  body: JSON.stringify({
    profiles: [{ email: email }]
  })
})
```

## 🎨 A/B Testing

### Test Different CTAs
1. Create variant components
2. Use analytics to track conversions
3. Compare performance

### Test Email Popup Timing
- Current: 3 seconds
- Test: 5 seconds, 10 seconds, or scroll-based

## 📱 Social Media Integration

### Instagram Feed
Add Instagram feed widget:
```jsx
// In Gallery component
<iframe 
  src="https://www.instagram.com/aceofbladesco/embed"
  width="100%"
  height="600"
/>
```

### Social Sharing
Already implemented via Open Graph tags. Shares will show:
- Custom title
- Description
- Featured image

## 💰 Conversion Optimization Tips

1. **Multiple CTAs**: Booking buttons in header, hero, services, and sticky
2. **Clear Value Prop**: "10% off first visit" is clear and compelling
3. **Social Proof**: Reviews prominently displayed
4. **Trust Signals**: Trust badges, Google reviews count
5. **Mobile Optimization**: Sticky button for mobile users
6. **Fast Load Times**: Optimized for speed (critical for mobile)

## 📈 Key Metrics to Track

- **Email Capture Rate**: % of visitors who sign up
- **Booking Conversion**: % who complete booking
- **Service Interest**: Which services get most clicks
- **Mobile vs Desktop**: Conversion rates by device
- **Traffic Sources**: Where visitors come from
- **Bounce Rate**: Pages with high exit rates

## 🚀 Next Steps

1. Set up analytics accounts (GA4, Facebook Pixel)
2. Configure email service integration
3. Test all conversion funnels
4. Set up retargeting campaigns
5. Monitor and optimize based on data

---

**Remember**: Test everything! What works for one salon may not work for another. Use analytics to make data-driven decisions.

