# Quick Start Guide

## 🚀 Getting Started

1. **Install Node.js** (v18 or higher recommended)
   - Download from [nodejs.org](https://nodejs.org/)

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   - The site will automatically open at `http://localhost:3000`

## 📦 What's Included

### Dependencies
- **React 18.2** - UI framework
- **GSAP 3.12** - Advanced animations
- **Framer Motion 11** - Motion library
- **Vite 5** - Build tool

### Features
- ✅ Hero slider with GSAP animations
- ✅ Scroll-triggered animations
- ✅ Framer Motion page transitions
- ✅ Responsive mobile menu
- ✅ Interactive FAQ accordion
- ✅ Gallery lightbox
- ✅ Smooth scrolling
- ✅ SEO optimized
- ✅ Fully accessible

## 🎨 Customization

### Update Content
Edit component files in `src/components/`:
- `Hero.jsx` - Hero section
- `Services.jsx` - Service offerings
- `Barbers.jsx` - Barber profiles
- `Contact.jsx` - Contact information

### Update Images
Replace Unsplash URLs with your images in:
- Hero slider images
- Service cards
- Barber photos
- Gallery images

### Update Colors
Edit `src/index.css` CSS variables:
```css
--primary-color: #1a1a1a;
--accent-color: #d4af37;
```

## 🏗️ Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

## 📱 Deploy

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
1. Drag and drop `dist/` folder
2. Or connect GitHub repo

### Other Platforms
Upload the `dist/` folder to any static hosting service.

## 🐛 Troubleshooting

**Port already in use:**
```bash
# Change port in vite.config.js
server: { port: 3001 }
```

**Module not found:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Learn More

- [React Docs](https://react.dev)
- [GSAP Docs](https://greensock.com/docs/)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Vite Docs](https://vitejs.dev)

---

**Happy coding!** 🎉

