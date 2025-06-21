# Product Context: Despachatec Frontend

## Descripción General

Despachatec Frontend es una aplicación web full-stack desarrollada en Next.js 14 con App Router que se conecta a un backend de gestión de restaurante/delivery mediante una API REST completa. El sistema aprovecha las capacidades de rendering híbrido (SSR/SSG/CSR) para optimizar performance y SEO, incluyendo gestión de clientes, empleados, productos, pedidos y reportes analíticos, con un sistema de roles (ADMIN/USER) y autenticación JWT.

## Objetivos del Proyecto

- Desarrollar una aplicación web moderna con Next.js 14 y rendering híbrido
- Aprovechar SSG para SEO del catálogo público y SSR para páginas dinámicas
- Implementar sistema de autenticación seguro con JWT y httpOnly cookies
- Crear interfaces CRUD optimizadas con Server/Client Components
- Desarrollar dashboard analítico con reportes y métricas en tiempo real
- Implementar sistema de pedidos con carrito de compras persistente
- Garantizar arquitectura escalable aprovechando features de Next.js
- Seguir las mejores prácticas de Next.js 14 y documentar en Memory Bank

## Módulos del Sistema

### 1. **Autenticación y Usuarios**

- Login/Register con JWT
- Manejo de roles (ADMIN/USER)
- Protección de rutas por permisos

### 2. **Gestión de Clientes**

- CRUD completo (ADMIN: escritura, USER: solo lectura)
- Listado, búsqueda y filtrado
- Perfil de cliente con historial de pedidos

### 3. **Gestión de Empleados**

- CRUD completo (solo ADMIN)
- Gestión de información laboral
- Vinculación con usuarios del sistema

### 4. **Catálogo de Productos**

- CRUD de productos con categorías (ADMIN)
- Visualización pública del catálogo
- Control de stock e inventario
- Búsqueda y filtrado por categoría

### 5. **Sistema de Pedidos**

- Carrito de compras
- Estados de pedido (PENDIENTE → PREPARANDO → LISTO → ENTREGADO)
- Gestión de pedidos por rol
- Cálculo automático de totales

### 6. **Reportes y Analíticas** (Solo ADMIN)

- Ventas por periodo
- Productos más vendidos
- Clientes frecuentes
- Resumen de inventario y alertas de stock

# Architectural Plan

## 1. Etapas del Proyecto

### **Fase 1: Setup e Infraestructura (Semana 1)**

1. **Setup Inicial**:

   - Crear proyecto React con Vite
   - Configurar ESLint, Prettier, TypeScript
   - Instalar dependencias base

2. **Estructura de Proyecto**:

   - Crear arquitectura de carpetas
   - Configurar rutas con React Router
   - Setup de servicios API con Axios

3. **Sistema de Autenticación**:
   - Context de autenticación
   - Protección de rutas
   - Manejo de JWT y localStorage

### **Fase 2: Layout y Navegación (Semana 1-2)**

1. **Componentes Base**:

   - Layout principal con navegación
   - Header adaptable por rol
   - Sidebar/menú responsivo

2. **Páginas Básicas**:
   - Login/Register
   - Dashboard principal
   - Página 404 y error boundaries

### **Fase 3: Módulos CRUD (Semana 2-4)**

1. **Gestión de Productos** (Público + ADMIN):

   - Catálogo público de productos
   - CRUD de productos para ADMIN
   - Filtros y búsqueda

2. **Gestión de Clientes**:

   - Listado con filtros
   - CRUD según permisos de rol
   - Perfil de cliente

3. **Gestión de Empleados** (Solo ADMIN):
   - CRUD completo
   - Gestión de información laboral

### **Fase 4: Sistema de Pedidos (Semana 4-5)**

1. **Carrito de Compras**:

   - Context de carrito
   - Componentes de carrito
   - Persistencia en localStorage

2. **Gestión de Pedidos**:
   - Crear pedidos desde carrito
   - Estados de pedido
   - Historial de pedidos

### **Fase 5: Reportes y Analíticas (Semana 5-6)**

1. **Dashboard Analítico**:

   - Widgets de métricas
   - Gráficos con Chart.js/Recharts
   - Filtros de fecha

2. **Reportes Específicos**:
   - Ventas por periodo
   - Productos más vendidos
   - Clientes frecuentes
   - Inventario y stock

### **Fase 6: Optimización y Testing (Semana 6-7)**

1. **Pruebas**:

   - Pruebas unitarias de componentes
   - Pruebas de integración de servicios
   - E2E testing con Cypress

2. **Optimización**:

   - Code splitting y lazy loading
   - Optimización de rendimiento
   - PWA features (opcional)

3. **Documentación y Deploy**:
   - Documentación de uso
   - Guías de instalación
   - Configuración de deploy

## 2. Arquitectura Técnica

### **Estructura de Carpetas (Next.js App Router)**

```
src/
├── app/                 # Next.js App Router
│   ├── (auth)/         # Route groups
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/    # Protected routes group
│   │   ├── dashboard/
│   │   ├── products/
│   │   ├── clients/
│   │   ├── employees/
│   │   ├── orders/
│   │   └── reports/
│   ├── api/            # API Routes (opcional)
│   │   └── auth/
│   ├── globals.css
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   ├── loading.tsx     # Global loading UI
│   ├── error.tsx       # Global error UI
│   └── not-found.tsx   # 404 page
├── components/         # Componentes reutilizables
│   ├── ui/             # Componentes base (shadcn/ui)
│   ├── forms/          # Formularios específicos
│   ├── layout/         # Layout components
│   └── charts/         # Componentes de gráficos
├── lib/                # Utilidades y configuración
│   ├── api/            # Cliente HTTP y servicios
│   │   ├── client.ts   # Axios client configurado
│   │   ├── auth.ts     # Servicios de autenticación
│   │   ├── products.ts
│   │   ├── clients.ts
│   │   ├── employees.ts
│   │   ├── orders.ts
│   │   └── reports.ts
│   ├── auth/           # Lógica de autenticación
│   ├── utils.ts        # Utilidades generales
│   ├── constants.ts    # Constantes del sistema
│   ├── validations.ts  # Schemas de Zod
│   └── permissions.ts  # Lógica de permisos
├── contexts/           # Context API para estado global
│   ├── AuthContext.tsx # Autenticación y usuario
│   ├── CartContext.tsx # Carrito de compras
│   └── NotificationContext.tsx # Notificaciones
├── hooks/              # Custom hooks
│   ├── useApi.ts       # Hook para llamadas API
│   ├── useAuth.ts      # Hook de autenticación
│   └── useLocalStorage.ts
├── types/              # TypeScript type definitions
│   ├── api.ts
│   ├── auth.ts
│   └── common.ts
└── middleware.ts       # Next.js middleware para auth
```

### **Estado Global (Context API)**

1. **AuthContext**: Usuario, token, roles, login/logout
2. **CartContext**: Productos en carrito, cantidad, totales
3. **NotificationContext**: Mensajes de éxito/error/info

### **Rendering Strategy (Next.js 14)**

```typescript
// Estrategia de rendering por tipo de página
- **SSG + ISR**: Catálogo público de productos (SEO + Performance)
  - /products (lista pública) - regeneración cada 1 hora
  - /products/[id] (detalle público) - regeneración on-demand

- **SSG**: Páginas estáticas (SEO crítico)
  - / (landing page)
  - /about, /contact (info general)

- **SSR**: Páginas dinámicas con SEO (datos frescos)
  - /login, /register (validación server-side)
  - /dashboard/reports (datos en tiempo real)

- **CSR**: Páginas privadas interactivas (mejor UX)
  - /dashboard (principal)
  - /dashboard/products (gestión ADMIN)
  - /dashboard/orders (gestión pedidos)
  - /dashboard/profile (perfil usuario)
```

### **Server vs Client Components Strategy**

```typescript
// Server Components (por defecto)
- Layouts, headers, navegación estática
- Listados de datos (productos, clientes)
- Formularios de solo lectura
- Componentes sin interactividad

// Client Components (solo cuando necesario)
- Formularios con validación interactiva
- Componentes con useState/useEffect
- Event handlers (onClick, onChange)
- Carrito de compras (estado local)
- Dashboards interactivos
```

├── page.tsx # / - Landing/Catálogo público
├── (auth)/ # Route group (no afecta URL)
│ ├── login/page.tsx # /login
│ └── register/page.tsx # /register
├── (dashboard)/ # Protected routes group
│ ├── layout.tsx # Layout para rutas protegidas
│ ├── dashboard/page.tsx # /dashboard
│ ├── products/
│ │ ├── page.tsx # /products - Lista (ADMIN)
│ │ ├── new/page.tsx # /products/new (ADMIN)
│ │ └── [id]/
│ │ ├── page.tsx # /products/[id] - Detalle
│ │ └── edit/page.tsx # /products/[id]/edit (ADMIN)
│ ├── clients/
│ │ ├── page.tsx # /clients - Lista (AUTH)
│ │ └── [id]/page.tsx # /clients/[id] - Detalle
│ ├── employees/ # Solo ADMIN
│ │ ├── page.tsx # /employees
│ │ └── [id]/page.tsx # /employees/[id]
│ ├── orders/
│ │ ├── page.tsx # /orders - Lista
│ │ ├── new/page.tsx # /orders/new - Carrito
│ │ └── [id]/page.tsx # /orders/[id] - Detalle
│ ├── reports/ # Solo ADMIN
│ │ ├── page.tsx # /reports - Dashboard
│ │ ├── sales/page.tsx # /reports/sales
│ │ └── inventory/page.tsx # /reports/inventory
│ └── profile/page.tsx # /profile
└── middleware.ts # Protección de rutas

````

## 3. Stack Tecnológico

### **Frontend Framework**
- **Next.js 14** con App Router y Server Components
- **React 18** con hooks y functional components
- **TypeScript** para type safety
- **Built-in optimizations** (Images, Fonts, Bundle splitting)

### **Routing y Estado**
- **Next.js App Router** para navegación (file-based routing)
- **Context API** para estado global del cliente
- **React Hook Form** para formularios
- **Zod** para validación de schemas
- **Server Actions** para mutations (opcional)

### **UI y Estilos**
- **Tailwind CSS** para styling (integración nativa con Next.js)
- **shadcn/ui** para componentes base (más ligero que Material-UI)
- **React Icons** para iconografía
- **Framer Motion** para animaciones (opcional)

### **HTTP y API**
- **Axios** para HTTP requests desde Client Components
- **fetch nativo** para Server Components y Server Actions
- **Next.js API Routes** para proxy/middleware si necesario
- **Server Actions** para mutations (crear/editar productos, pedidos)
- **React Query/TanStack Query** para cache y estado del servidor
- **JWT** con httpOnly cookies para autenticación segura

### **Rendering y Performance**
- **Server Components** por defecto para mejor performance
- **Client Components** solo para interactividad necesaria
- **ISR** para catálogo de productos (datos semi-estáticos)
- **Streaming** para páginas con datos lentos (reportes)
- **Image Optimization** con next/image
- **Font Optimization** con next/font
- **Bundle Splitting** automático por rutas

### **Gráficos y Visualización**
- **Recharts** o **Chart.js** para gráficos de reportes
- **React Table** para tablas complejas

### **Testing**
- **Jest** para pruebas unitarias
- **React Testing Library** para testing de componentes
- **MSW (Mock Service Worker)** para mock de API
- **Cypress** para E2E testing

### **Herramientas de Desarrollo**
- **ESLint** + **Prettier** para code quality
- **Husky** para git hooks
- **Commitizen** para conventional commits

## 4. Principios y Patrones

### **Patrones de Next.js**
- **Server Components** por defecto para mejor performance
- **Client Components** solo cuando sea necesario (interactividad)
- **File-based routing** con App Router
- **Route Groups** para organización sin afectar URLs
- **Layouts** anidados para estructura común
- **Middleware** para protección de rutas y autenticación

### **Gestión de Estado**
- **Local State**: useState para estado de componente
- **Global State**: Context API para autenticación, carrito, notificaciones
- **Server State**: React Query para datos del servidor
- **Form State**: React Hook Form para formularios
- **URL State**: Next.js router para filtros y paginación

### **Rendering Strategy**
- **SSG** para páginas estáticas (landing, catálogo público)
- **SSR** para páginas dinámicas con SEO (productos individuales)
- **CSR** para dashboard y páginas privadas (mejor UX)

### **Patrones de API**
- **Service Layer**: Servicios específicos por dominio
- **Repository Pattern**: Abstracción de acceso a datos
- **Interceptors**: Manejo centralizado de JWT y errores
- **Error Boundaries**: Manejo de errores de React

### **Seguridad**
- Validación de entrada en frontend y backend
- Sanitización de datos mostrados
- Manejo seguro de JWT tokens
- Protección de rutas por roles
- HTTPS en producción

## 5. Estrategia de Testing

### **Niveles de Testing**
1. **Unit Tests** (70%):
   - Componentes individuales
   - Custom hooks
   - Servicios y utilidades
   - Validaciones y formatters

2. **Integration Tests** (20%):
   - Flujos de autenticación
   - Interacción entre componentes
   - Servicios de API con mocks

3. **E2E Tests** (10%):
   - Flujos críticos de usuario
   - Login → Dashboard → CRUD → Logout
   - Proceso completo de pedido

### **Estrategia de Mocking**
- Mock de API con MSW
- Mock de localStorage/sessionStorage
- Mock de Context providers
- Fixtures de datos de prueba

## 6. Dependencias Principales

### **Dependencias Actualizadas (Next.js 14)**
```json
{
  "next": "^14.1.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "typescript": "^5.0.0",
  "@types/react": "^18.0.0",
  "@types/react-dom": "^18.0.0",
  "@types/node": "^20.0.0"
}
````

### **UI & Styling (shadcn/ui ecosystem)**

```json
{
  "tailwindcss": "^3.4.0",
  "@tailwindcss/forms": "^0.5.0",
  "tailwindcss-animate": "^1.0.7",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.2.0",
  "lucide-react": "^0.315.0",
  "@radix-ui/react-slot": "^1.0.0",
  "@radix-ui/react-dropdown-menu": "^2.0.0",
  "@radix-ui/react-dialog": "^1.0.0",
  "@radix-ui/react-toast": "^1.0.0"
}
```

### **State Management & Forms**

```json
{
  "react-hook-form": "^7.43.0",
  "zod": "^3.20.0",
  "@hookform/resolvers": "^2.9.0"
}
```

### **HTTP & API**

```json
{
  "axios": "^1.6.0",
  "@tanstack/react-query": "^5.0.0",
  "jose": "^5.0.0"
}
```

### **Charts & Visualization**

```json
{
  "recharts": "^2.8.0",
  "@tanstack/react-table": "^8.10.0"
}
```

### **Development Tools**

```json
{
  "eslint": "^8.56.0",
  "eslint-config-next": "^14.1.0",
  "prettier": "^3.1.0",
  "prettier-plugin-tailwindcss": "^0.5.0",
  "husky": "^8.0.0",
  "@commitlint/cli": "^18.4.0",
  "@commitlint/config-conventional": "^18.4.0"
}
```

### **Testing (Next.js optimized)**

```json
{
  "jest": "^29.7.0",
  "jest-environment-jsdom": "^29.7.0",
  "@testing-library/react": "^14.1.0",
  "@testing-library/jest-dom": "^6.1.0",
  "@testing-library/user-event": "^14.5.0",
  "msw": "^2.0.0",
  "cypress": "^13.6.0"
}
```

---

# Próximos Pasos Inmediatos

## Tareas de la Fase 1 (Setup)

- [ ] **Crear proyecto Next.js 14 con TypeScript**
- [ ] **Configurar Tailwind CSS y shadcn/ui**
- [ ] **Configurar ESLint, Prettier y git hooks**
- [ ] **Crear estructura de carpetas con App Router**
- [ ] **Configurar middleware para autenticación**
- [ ] **Setup de servicios API con Axios**
- [ ] **Implementar Context de autenticación**
- [ ] **Crear layouts y componentes base**
- [ ] **Documentar decisiones en Memory Bank**

## Criterios de Éxito de la Fase 1

- ✅ Proyecto Next.js ejecutándose sin errores
- ✅ App Router funcionando con rutas básicas
- ✅ Middleware de autenticación implementado
- ✅ Tailwind CSS configurado
- ✅ ESLint/Prettier configurados
- ✅ Primera llamada a API funcionando
- ✅ Context de autenticación implementado
- ✅ Layout básico responsive creado

---

> **Nota:** Este plan se actualizará tras completar cada fase. Todas las decisiones arquitectónicas y cambios se documentarán en el Memory Bank según las instrucciones del proyecto.
