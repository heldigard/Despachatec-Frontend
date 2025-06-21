# System Patterns for Despachatec Frontend (Next.js)

## Next.js Specific Patterns

### **Server vs Client Components**

```tsx
// Server Component (default) - runs on server
const ProductsList = async () => {
  // Can fetch data directly
  const products = await fetch('http://localhost:8080/api/productos');

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

// Client Component - runs on client
('use client');
const AddToCartButton = ({ product }: { product: Product }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = () => {
    // Client-side logic
  };

  return (
    <button onClick={handleAddToCart} disabled={isLoading}>
      {isLoading ? 'Adding...' : 'Add to Cart'}
    </button>
  );
};
```

### **File-based Routing Structure**

```tsx
// app/layout.tsx - Root layout
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <CartProvider>
            <NotificationProvider>{children}</NotificationProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

// app/(dashboard)/layout.tsx - Protected layout
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1">
        <Header />
        {children}
      </main>
    </div>
  );
}

// app/(dashboard)/products/page.tsx - Products page
export default function ProductsPage() {
  return (
    <div>
      <h1>Products Management</h1>
      <ProductsList />
    </div>
  );
}
```

### **Middleware Pattern for Authentication**

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;

  // Protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
    } catch {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Admin-only routes
  if (
    request.nextUrl.pathname.startsWith('/dashboard/employees') ||
    request.nextUrl.pathname.startsWith('/dashboard/reports')
  ) {
    // Verify admin role from token
    const payload = await verifyTokenAndGetPayload(token);
    if (!payload?.roles?.includes('ADMIN')) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
```

## API Integration Patterns

### **HTTP Client Setup for Next.js**

```typescript
// lib/api/client.ts
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for JWT (client-side only)
if (typeof window !== 'undefined') {
  apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
}

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      // Redirect to login on client side
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);
```

### **Server Actions Pattern (Optional)**

```typescript
// lib/actions/products.ts
'use server';

import { revalidateTag } from 'next/cache';

export async function createProduct(formData: FormData) {
  try {
    const product = {
      nombre: formData.get('nombre'),
      precio: Number(formData.get('precio')),
      categoria: formData.get('categoria'),
    };

    const response = await fetch(`${process.env.API_BASE_URL}/api/productos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getServerToken()}`,
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error('Failed to create product');
    }

    revalidateTag('products');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

### **Data Fetching Patterns**

```typescript
// Server Component data fetching
const ProductsPage = async () => {
  const products = await fetch('http://localhost:8080/api/productos', {
    cache: 'force-cache', // or 'no-store' for always fresh
    next: { tags: ['products'] }
  });

  return <ProductsList products={products} />;
};

// Client Component with React Query
'use client';
const ProductsClient = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => apiClient.get('/api/productos').then(res => res.data)
  });

  if (isLoading) return <ProductsSkeleton />;
  if (error) return <ErrorMessage error={error} />;

  return <ProductsList products={data} />;
};
```

## Styling Patterns with Tailwind CSS

### **Component Styling**

```tsx
// Using Tailwind classes with conditional styling
const Button = ({ variant = 'primary', size = 'md', children, ...props }) => {
  return (
    <button
      className={cn(
        // Base styles
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
        'disabled:pointer-events-none disabled:opacity-50',
        // Variants
        {
          'bg-primary text-primary-foreground shadow hover:bg-primary/90': variant === 'primary',
          'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground':
            variant === 'outline',
        },
        // Sizes
        {
          'h-8 px-3 text-xs': size === 'sm',
          'h-9 px-4 py-2': size === 'md',
          'h-10 px-8': size === 'lg',
        },
      )}
      {...props}
    >
      {children}
    </button>
  );
};

// Using CSS-in-JS for complex styling (when needed)
const complexComponent = {
  background: `linear-gradient(135deg, 
    ${theme.colors.primary} 0%, 
    ${theme.colors.secondary} 100%)`,
};
```

### **Responsive Design Pattern**

```tsx
const ResponsiveGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {/* Mobile: 1 column, SM: 2 columns, LG: 3 columns, XL: 4 columns */}
    </div>
  );
};

const ResponsiveLayout = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Responsive Title</h1>
    </div>
  );
};
```

## File Naming Conventions

### **Next.js Specific Files**

- **Pages**: `page.tsx` (required for routes)
- **Layouts**: `layout.tsx` (shared UI for route segments)
- **Loading**: `loading.tsx` (loading UI)
- **Error**: `error.tsx` (error UI)
- **Not Found**: `not-found.tsx` (404 UI)
- **Route**: `route.ts` (API endpoints)

### **Components**

- PascalCase: `ProductCard.tsx`, `UserProfile.tsx`
- Index files: `index.ts` for barrel exports
- Test files: `ProductCard.test.tsx`
- Story files: `ProductCard.stories.tsx`

### **Utilities and Lib**

- camelCase: `authHelpers.ts`, `formatUtils.ts`
- Grouping: `lib/auth/`, `lib/api/`, `lib/utils/`

### **Hooks and Context**

- Prefix with "use": `useAuth.ts`, `useLocalStorage.ts`
- Context: `AuthContext.tsx`, `CartContext.tsx`

### **Types**

- PascalCase with suffix: `User.types.ts`, `Api.types.ts`
- Or grouped: `types/auth.ts`, `types/api.ts`

## State Management Patterns

### **Context Structure**

```javascript
// contexts/AuthContext.js
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    setUser(response.data.user);
    setToken(response.data.accessToken);
    localStorage.setItem('token', response.data.accessToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    login,
    logout,
    isAdmin: user?.roles?.some((role) => role.nombre === 'ADMIN'),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

### **Local State vs Global State**

- **Local State**: Form inputs, UI toggles, component-specific data
- **Global State**: User authentication, shopping cart, app notifications
- **Server State**: API data (use React Query for caching and synchronization)

## API Integration Patterns

### **HTTP Client Setup**

```javascript
// services/api.js
const API_BASE_URL = 'http://localhost:8080';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for JWT
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);
```

### **Error Handling Pattern**

```javascript
// utils/errorHandler.js
export const handleApiError = (error, showNotification) => {
  let message = 'An unexpected error occurred';

  if (error.response?.data?.mensaje) {
    message = error.response.data.mensaje;
  } else if (error.message) {
    message = error.message;
  }

  showNotification({
    type: 'error',
    message,
    duration: 5000,
  });

  console.error('API Error:', error);
};
```

## Form Handling Patterns

### **React Hook Form + Zod**

```javascript
// schemas/productSchema.js
export const productSchema = z.object({
  nombre: z.string().min(1, 'Name is required'),
  precio: z.number().min(0, 'Price must be positive'),
  categoria: z.string().min(1, 'Category is required'),
});

// components/ProductForm.jsx
const ProductForm = ({ onSubmit, initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('nombre')} />
      {errors.nombre && <span>{errors.nombre.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
};
```

## Testing Patterns

### **Component Testing**

```javascript
// ProductCard.test.jsx
describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    nombre: 'Pizza Margarita',
    precio: 12.5,
    categoria: 'Pizzas',
  };

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Pizza Margarita')).toBeInTheDocument();
    expect(screen.getByText('$12.50')).toBeInTheDocument();
    expect(screen.getByText('Pizzas')).toBeInTheDocument();
  });

  it('calls onAddToCart when button is clicked', () => {
    const mockAddToCart = jest.fn();
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);

    fireEvent.click(screen.getByText('Add to Cart'));

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});
```

## Testing Patterns for Next.js

### **Component Testing**

```tsx
// ProductCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from './ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    nombre: 'Pizza Margarita',
    precio: 12.5,
    categoria: 'Pizzas',
  };

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Pizza Margarita')).toBeInTheDocument();
    expect(screen.getByText('$12.50')).toBeInTheDocument();
    expect(screen.getByText('Pizzas')).toBeInTheDocument();
  });

  it('calls onAddToCart when button is clicked', () => {
    const mockAddToCart = jest.fn();
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);

    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});
```

### **Page Testing (Next.js)**

```tsx
// pages/products.test.tsx
import { render, screen } from '@testing-library/react';
import ProductsPage from '@/app/(dashboard)/products/page';

// Mock Next.js modules
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/products',
  }),
  useSearchParams: () => new URLSearchParams(),
}));

describe('ProductsPage', () => {
  it('renders products page correctly', async () => {
    // Mock API response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([mockProduct]),
      }),
    ) as jest.Mock;

    render(await ProductsPage());

    expect(screen.getByText('Products Management')).toBeInTheDocument();
  });
});
```

### **API Route Testing**

```tsx
// app/api/products/route.test.ts
import { GET, POST } from '@/app/api/products/route';
import { NextRequest } from 'next/server';

describe('/api/products', () => {
  it('GET returns products list', async () => {
    const request = new NextRequest('http://localhost:3000/api/products');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
  });

  it('POST creates new product', async () => {
    const request = new NextRequest('http://localhost:3000/api/products', {
      method: 'POST',
      body: JSON.stringify({
        nombre: 'Test Product',
        precio: 10.0,
        categoria: 'Test',
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(201);
  });
});
```

## Security and Validation Patterns

### **Input Validation**

- Always validate on both frontend and backend
- Use Zod schemas for consistent validation
- Sanitize user inputs before display
- Validate file uploads (type, size, content)

### **Authentication Flow**

```javascript
// components/ProtectedRoute.jsx
const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !hasRole(user, requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// utils/permissions.js
export const hasRole = (user, role) => {
  return user?.roles?.some((userRole) => userRole.nombre === role);
};

export const canEditResource = (user, resource) => {
  return hasRole(user, 'ADMIN') || resource.userId === user.id;
};
```

## Performance Patterns

### **Code Splitting**

```javascript
// Lazy loading for routes
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Products = lazy(() => import('../pages/Products'));

// Route with Suspense
<Route
  path="/dashboard"
  element={
    <Suspense fallback={<LoadingSpinner />}>
      <Dashboard />
    </Suspense>
  }
/>;
```

### **Memoization**

```javascript
// Expensive calculations
const expensiveValue = useMemo(() => {
  return calculations(data);
}, [data]);

// Callback optimization
const handleClick = useCallback(
  (id) => {
    onItemClick(id);
  },
  [onItemClick],
);

// Component memoization
const ProductCard = memo(({ product, onAddToCart }) => {
  // Component implementation
});
```

## Documentation Patterns

### **Component Documentation**

```javascript
/**
 * ProductCard component displays product information and actions
 *
 * @param {Object} product - Product data object
 * @param {string} product.nombre - Product name
 * @param {number} product.precio - Product price
 * @param {Function} onAddToCart - Callback when adding to cart
 * @param {boolean} isLoading - Loading state
 */
const ProductCard = ({ product, onAddToCart, isLoading = false }) => {
  // Implementation
};
```

### **Memory Bank Updates**

- Log all architectural decisions in `decisionLog.md`
- Update progress in `progress.md` after each feature
- Document new patterns in `systemPatterns.md`
- Keep `activeContext.md` current with ongoing work

## Advanced Next.js 14 Patterns

### **Server Actions for Mutations**

```typescript
// app/actions/products.ts
'use server';

import { revalidateTag, revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProduct(formData: FormData) {
  try {
    const productData = {
      nombre: formData.get('nombre') as string,
      precio: Number(formData.get('precio')),
      categoria: formData.get('categoria') as string,
    };

    // Validate with Zod
    const validatedData = productSchema.parse(productData);

    // Call API
    const response = await fetch(`${process.env.API_BASE_URL}/api/productos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await getServerToken()}`,
      },
      body: JSON.stringify(validatedData),
    });

    if (!response.ok) {
      throw new Error('Failed to create product');
    }

    // Revalidate relevant caches
    revalidateTag('products');
    revalidatePath('/dashboard/products');

  } catch (error) {
    return { error: error.message };
  }

  redirect('/dashboard/products');
}

// components/ProductForm.tsx
'use client';
import { createProduct } from '@/app/actions/products';

export default function ProductForm() {
  return (
    <form action={createProduct}>
      <input name="nombre" placeholder="Product name" required />
      <input name="precio" type="number" placeholder="Price" required />
      <select name="categoria" required>
        <option value="">Select category</option>
        <option value="Pizzas">Pizzas</option>
        <option value="Bebidas">Bebidas</option>
      </select>
      <button type="submit">Create Product</button>
    </form>
  );
}
```

### **ISR (Incremental Static Regeneration) Pattern**

```typescript
// app/products/page.tsx - Public catalog with ISR
export const revalidate = 3600; // Revalidate every hour

export default async function PublicProductsPage() {
  const products = await fetch(`${process.env.API_BASE_URL}/api/productos`, {
    next: {
      tags: ['products'],
      revalidate: 3600
    }
  });

  return (
    <div>
      <h1>Our Products</h1>
      <ProductCatalog products={products} />
    </div>
  );
}

// app/products/[id]/page.tsx - Product detail with on-demand ISR
export async function generateStaticParams() {
  const products = await fetch(`${process.env.API_BASE_URL}/api/productos`);
  return products.map((product) => ({ id: product.id.toString() }));
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await fetch(`${process.env.API_BASE_URL}/api/productos/${params.id}`, {
    next: {
      tags: [`product-${params.id}`],
      revalidate: false // Only revalidate on-demand
    }
  });

  return <ProductDetail product={product} />;
}
```

### **Streaming and Suspense Pattern**

```tsx
// app/dashboard/reports/page.tsx - Streaming slow data
import { Suspense } from 'react';

export default function ReportsPage() {
  return (
    <div>
      <h1>Reports Dashboard</h1>

      {/* Fast loading content */}
      <QuickStats />

      {/* Slow loading content with streaming */}
      <Suspense fallback={<ChartSkeleton />}>
        <SalesChart />
      </Suspense>

      <Suspense fallback={<TableSkeleton />}>
        <DetailedReport />
      </Suspense>
    </div>
  );
}

// components/SalesChart.tsx - Slow loading component
async function SalesChart() {
  // Simulate slow API call
  const salesData = await fetch(`${process.env.API_BASE_URL}/api/reports/sales`, {
    cache: 'no-store', // Always fresh data for reports
  });

  return <Chart data={salesData} />;
}
```

### **Metadata API for SEO**

```typescript
// app/products/[id]/page.tsx - Dynamic metadata
export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await fetch(`${process.env.API_BASE_URL}/api/productos/${params.id}`);

  return {
    title: `${product.nombre} - Despachatec`,
    description: `Order ${product.nombre} for $${product.precio}. ${product.descripcion}`,
    openGraph: {
      title: product.nombre,
      description: product.descripcion,
      images: [product.imagen],
    },
    other: {
      'product:price:amount': product.precio,
      'product:price:currency': 'USD',
    },
  };
}
```

### **Enhanced Authentication with httpOnly Cookies**

```typescript
// lib/auth/server.ts - Server-side auth utilities
import { cookies } from 'next/headers';
import { jwtVerify, SignJWT } from 'jose';

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

export async function createSession(user: User) {
  const token = await new SignJWT({
    userId: user.id,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
  })
    .setProtectedHeader({ alg: 'HS256' })
    .sign(secretKey);

  cookies().set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  });
}

export async function getSession(): Promise<User | null> {
  const token = cookies().get('auth-token')?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as User;
  } catch {
    return null;
  }
}

export function deleteSession() {
  cookies().delete('auth-token');
}

// middleware.ts - Enhanced middleware
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const { pathname } = request.nextUrl;

  // Public routes
  if (
    pathname.startsWith('/api/auth') ||
    pathname === '/' ||
    pathname === '/login' ||
    pathname === '/register'
  ) {
    return NextResponse.next();
  }

  // Protected routes
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));

      // Admin-only routes
      if (
        (pathname.startsWith('/dashboard/employees') ||
          pathname.startsWith('/dashboard/reports')) &&
        payload.role !== 'ADMIN'
      ) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }

      // Add user info to headers for Server Components
      const response = NextResponse.next();
      response.headers.set('x-user-id', payload.userId as string);
      response.headers.set('x-user-role', payload.role as string);
      return response;
    } catch {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};
```

### **Parallel Routes for Complex Layouts**

```typescript
// app/dashboard/@stats/page.tsx - Stats slot
export default function StatsSlot() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard title="Total Orders" value="1,234" />
      <StatCard title="Revenue" value="$45,678" />
      <StatCard title="Products" value="89" />
      <StatCard title="Customers" value="456" />
    </div>
  );
}

// app/dashboard/@charts/page.tsx - Charts slot
export default function ChartsSlot() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <SalesChart />
      <OrdersChart />
    </div>
  );
}

// app/dashboard/layout.tsx - Layout with parallel routes
export default function DashboardLayout({
  children,
  stats,
  charts,
}: {
  children: React.ReactNode;
  stats: React.ReactNode;
  charts: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <main>
        {stats}
        {charts}
        {children}
      </main>
    </div>
  );
}
```

### **Intercepting Routes for Modals**

```typescript
// app/dashboard/products/@modal/(.)new/page.tsx - Modal interceptor
import { Modal } from '@/components/Modal';
import { ProductForm } from '@/components/ProductForm';

export default function NewProductModal() {
  return (
    <Modal>
      <ProductForm />
    </Modal>
  );
}

// app/dashboard/products/new/page.tsx - Fallback page
export default function NewProductPage() {
  return (
    <div>
      <h1>Create New Product</h1>
      <ProductForm />
    </div>
  );
}
```

## Memory Bank Integration Patterns

### **Automated Updates**

```typescript
// After each significant change, update Memory Bank
const updateMemoryBank = async (type: 'progress' | 'decision' | 'context', data: any) => {
  const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const entry = `[${timestamp}] - ${data.summary}`;

  // Update appropriate Memory Bank file
  switch (type) {
    case 'progress':
      await appendToFile('memory-bank/progress.md', entry);
      break;
    case 'decision':
      await appendToFile('memory-bank/decisionLog.md', entry);
      break;
    case 'context':
      await updateFile('memory-bank/activeContext.md', data);
      break;
  }
};
```

---
