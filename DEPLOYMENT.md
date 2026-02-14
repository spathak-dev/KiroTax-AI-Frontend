# Deployment Guide - KiroTax Console

## Prerequisites

- Node.js 20.9.0 or higher
- npm or yarn
- Git

## Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` and update the API URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Production Build

### 1. Build the Application

```bash
npm run build
```

### 2. Test Production Build Locally

```bash
npm start
```

### 3. Check Build Output

The build creates an optimized production bundle in `.next/`

## Deployment Options

### Option 1: Vercel (Recommended for Next.js)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set Environment Variables**
   - Go to Vercel Dashboard
   - Select your project
   - Settings → Environment Variables
   - Add `NEXT_PUBLIC_API_URL`

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Option 2: Docker

1. **Create Dockerfile**

```dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

2. **Build Docker Image**
   ```bash
   docker build -t kirotax-console .
   ```

3. **Run Container**
   ```bash
   docker run -p 3000:3000 \
     -e NEXT_PUBLIC_API_URL=https://api.yourdomain.com \
     kirotax-console
   ```

### Option 3: Traditional Server (Ubuntu/Debian)

1. **Install Node.js 20+**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Clone Repository**
   ```bash
   git clone <your-repo-url>
   cd bank
   ```

3. **Install Dependencies**
   ```bash
   npm ci --production=false
   ```

4. **Build Application**
   ```bash
   npm run build
   ```

5. **Install PM2**
   ```bash
   sudo npm install -g pm2
   ```

6. **Create PM2 Ecosystem File**

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'kirotax-console',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      NEXT_PUBLIC_API_URL: 'https://api.yourdomain.com'
    }
  }]
}
```

7. **Start with PM2**
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

### Option 4: Nginx Reverse Proxy

1. **Install Nginx**
   ```bash
   sudo apt-get install nginx
   ```

2. **Configure Nginx**

```nginx
# /etc/nginx/sites-available/kirotax
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. **Enable Site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/kirotax /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

4. **SSL with Let's Encrypt**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

## Environment Variables for Production

### Required Variables

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
```

### Optional Variables

```env
NEXT_PUBLIC_APP_NAME=KiroTax Console
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_ENABLE_OCR=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
```

## Backend Integration

### 1. Update API Configuration

Edit `lib/api.ts` if needed for custom headers or authentication.

### 2. Update Auth Context

Replace mock login in `lib/auth-context.tsx`:

```typescript
const login = async (email: string, password: string, role: Role) => {
  const response = await apiRequest('/auth/login', {
    method: 'POST',
    body: { email, password, role },
  });
  
  const user: User = {
    id: response.user.id,
    email: response.user.email,
    name: response.user.name,
    role: response.user.role,
    token: response.token,
  };
  
  setUser(user);
  localStorage.setItem('kirotax_user', JSON.stringify(user));
};
```

### 3. Replace Mock Data

Update dashboard pages to fetch from API:

```typescript
// Example: Article Dashboard
useEffect(() => {
  const fetchDocuments = async () => {
    const docs = await apiRequest<Document[]>('/documents', {
      method: 'GET',
      token: user?.token,
    });
    setUploadedDocs(docs);
  };
  
  fetchDocuments();
}, [user]);
```

## Performance Optimization

### 1. Enable Image Optimization

Update `next.config.ts`:

```typescript
const config = {
  images: {
    domains: ['yourdomain.com'],
    formats: ['image/avif', 'image/webp'],
  },
};
```

### 2. Enable Compression

```bash
npm install compression
```

### 3. Configure Caching

Add cache headers in `next.config.ts`:

```typescript
async headers() {
  return [
    {
      source: '/static/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ];
}
```

## Monitoring

### 1. Application Monitoring

- Use Vercel Analytics (if on Vercel)
- Or integrate Sentry for error tracking

### 2. Performance Monitoring

```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:

```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] CORS configured properly
- [ ] Rate limiting implemented
- [ ] Input validation on all forms
- [ ] XSS protection enabled
- [ ] CSRF tokens implemented
- [ ] Security headers configured

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Node Version Issues

```bash
# Use nvm to switch Node version
nvm install 20
nvm use 20
```

## Rollback Strategy

### Vercel

```bash
# List deployments
vercel ls

# Rollback to specific deployment
vercel rollback <deployment-url>
```

### PM2

```bash
# Restart application
pm2 restart kirotax-console

# View logs
pm2 logs kirotax-console
```

## Support

For deployment issues:
1. Check build logs
2. Verify environment variables
3. Test API connectivity
4. Review Nginx/server logs
5. Check firewall settings

---

**Production Checklist**:
- ✅ Node.js 20.9.0+ installed
- ✅ Dependencies installed
- ✅ Environment variables configured
- ✅ Build successful
- ✅ API connection tested
- ✅ HTTPS enabled
- ✅ Monitoring configured
- ✅ Backup strategy in place
