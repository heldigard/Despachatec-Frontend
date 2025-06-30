# Decision Log - Despachatec Frontend

[2025-06-21 00:00:00] - **Decisión inicial**: Documentar todo el plan arquitectónico y el progreso en el Memory Bank usando archivos markdown, siguiendo las instrucciones del proyecto.

[2025-06-21 12:30:00] - **CAMBIO TECNOLÓGICO MAYOR**: Decisión de cambiar de React + Vite a **Next.js 14 con App Router**.

**Razones del cambio**:

- **Better performance**: SSR/SSG out of the box
- **SEO optimization**: Importante para catálogo público de productos
- **File-based routing**: Más intuitivo que React Router
- **Built-in optimizations**: Images, fonts, bundle splitting automático
- **Better DX**: TypeScript integration, mejor dev server
- **Deployment**: Optimizado para Vercel
- **Future-proof**: App Router es el futuro de Next.js

**Impacto en arquitectura**:

- Routing: De React Router a file-based routing con App Router
- Estructura: Nueva organización con `app/` directory
- Styling: Cambio a Tailwind CSS (mejor integración)
- UI Components: shadcn/ui en lugar de Material-UI
- Middleware: Para autenticación a nivel de ruta
- Rendering: Mix de SSR/SSG/CSR según necesidades

[2025-06-21 12:05:00] - **Arquitectura de Estado**:

- **Context API** para: Autenticación, Carrito, Notificaciones
- **React Query** para: Estado del servidor (API data, cache, sincronización)
- **useState** para: Estado local de componentes
- **React Hook Form** para: Estado de formularios

[2025-06-21 12:10:00] - **Estructura de Rutas**:

- Rutas públicas: `/`, `/login`, `/register`
- Rutas protegidas por autenticación: `/dashboard`, `/orders`, `/profile`
- Rutas de ADMIN: `/products`, `/employees`, `/reports`, `/clients` (gestión)
- Rutas de USER: `/clients` (solo lectura), `/orders` (propios)

[2025-06-21 12:15:00] - **Estrategia de Testing**:

- **70% Unit Tests**: Componentes, hooks, servicios, utilidades
- **20% Integration Tests**: Flujos de autenticación, interacción componentes
- **10% E2E Tests**: Flujos críticos (login → dashboard → CRUD → logout)
- **MSW** para mocking de API en tests

[2025-06-21 12:18:00] - **Fases de Desarrollo**:

- **7 semanas** divididas en 6 fases incrementales
- Cada fase entrega valor funcional
- Setup → Layout → CRUD → Pedidos → Reportes → Testing/Deploy
- Documentación continua en Memory Bank

[2025-06-21 12:20:00] - **Patrones de Código**:

- **Atomic Design** para estructura de componentes
- **Service Layer** para lógica de API
- **Custom Hooks** para lógica reutilizable
- **Error Boundaries** para manejo de errores
- **Code Splitting** para optimización de rendimiento

---

## Decisiones Pendientes (Actualizadas)

- [x] **Framework Frontend**: ✅ Next.js 14 con App Router seleccionado
- [x] **UI Library**: ✅ Tailwind CSS + shadcn/ui seleccionados
- [ ] **Authentication**: Evaluar NextAuth.js vs implementación manual con JWT
- [ ] **State Management**: Confirmar Context API vs Zustand para estado global
- [ ] **PWA**: Evaluar implementación de features PWA en fase final
- [ ] **Deploy**: Confirmar Vercel vs otras opciones de deploy
- [ ] **Database Caching**: Evaluar Redis para cache en producción

[2025-06-21 12:45:00] - **DECISIÓN DE AUTENTICACIÓN**: Implementación manual con JWT usando httpOnly cookies en lugar de NextAuth.js.

**Razones**:

- API existente con sistema JWT custom
- Mayor control sobre flujo de autenticación
- Mejor integración con roles específicos (ADMIN/USER)
- Middleware nativo de Next.js para protección de rutas

**Implementación**:

- Cookies httpOnly para tokens (más seguro que localStorage)
- Server Actions para login/logout
- Middleware para verificación y redirección
- Context API solo para estado de cliente

[2025-06-21 12:50:00] - **ESTRATEGIA DE RENDERING DEFINIDA**:

**SSG + ISR**:

- Catálogo público de productos (revalidación cada hora)
- Landing page y páginas informativas

**SSR**:

- Páginas de autenticación (validación server-side)
- Reportes y dashboards (datos frescos)

**CSR**:

- Dashboard interactivo
- Gestión CRUD (formularios complejos)
- Carrito de compras (estado local)

[2025-06-21 12:52:00] - **FEATURES AVANZADOS ADOPTADOS**:

- **Server Actions**: Para mutations (crear/editar/eliminar)
- **Streaming**: Para reportes con datos lentos
- **Parallel Routes**: Para dashboard con múltiples widgets
- **Intercepting Routes**: Para modales de edición
- **Metadata API**: Para SEO dinámico en catálogo

[2025-06-21 12:55:00] - **DEPENDENCIAS FINALES**:

- ✅ shadcn/ui confirmado (vs Material-UI descartado)
- ✅ Recharts confirmado para gráficos
- ✅ React Query v5 para server state
- ✅ jose para JWT handling
- ✅ Tailwind CSS con plugins oficiales

---

## Decisiones Pendientes (Actualizadas)

- [x] **Framework Frontend**: ✅ Next.js 14 con App Router
- [x] **UI Library**: ✅ Tailwind CSS + shadcn/ui
- [x] **Authentication**: ✅ JWT manual con httpOnly cookies
- [x] **Rendering Strategy**: ✅ Híbrido SSG+ISR/SSR/CSR definido
- [x] **State Management**: ✅ Context API + React Query confirmado
- [ ] **PWA**: Evaluar implementación de features PWA en fase final
- [ ] **Deploy**: Confirmar Vercel vs otras opciones
- [ ] **Monitoring**: Evaluar Sentry para error tracking
- [ ] **Analytics**: Considerar Next.js Analytics o Google Analytics

[2025-06-26 15:45:00] - **AUTH-001: Arquitectura de Autenticación Basada en localStorage**

**Contexto**: Sistema de autenticación tenía inconsistencias críticas causando redirects incorrectos

**Decisión**: Adoptar arquitectura client-side completa para autenticación:
- **Token storage**: localStorage para persistencia del JWT
- **Auth verification**: Client-side en dashboard layout + API interceptors  
- **Middleware**: Simplificado, sin verificación server-side de tokens
- **Error handling**: API client maneja 401s con limpieza y redirect a /login

**Alternativas consideradas**:
1. **httpOnly cookies + server-side verification**: Mayor seguridad pero complejo para SPA
2. **Arquitectura híbrida**: Mezcla cookies + localStorage (descartada por complejidad)

**Justificación**: 
- Simplicidad de implementación para proyecto de desarrollo
- Consistencia total entre componentes
- Flexibilidad para futuras integraciones
- Menor complejidad de debugging

**Trade-offs aceptados**:
- Token expuesto en localStorage (riesgo XSS)
- Verificación client-side (bypasseable pero API protege endpoints)

---

## Decisiones de Stack Tecnológico

[2025-06-21 12:30:00] - **STACK-001: Migración completa a Next.js 14**

---

[2025-06-28 16:40:00] - **IMPLEMENTACIÓN DE CONTROL DE ACCESO BASADO EN ROLES (RBAC)**

**Decisión**: Implementar control de roles granular en todas las vistas del dashboard para diferenciar entre usuarios ADMIN y USER.

**Contexto**: El sistema necesitaba restricciones claras donde los administradores pueden hacer CRUD completo mientras que los usuarios regulares solo pueden consultar información.

**Solución implementada**:
- **Verificación de roles client-side**: `const isAdmin = user?.role === 'ADMIN'`
- **Renderizado condicional**: Botones de acción solo para ADMIN
- **Mensajes informativos**: Banners explicativos para usuarios USER 
- **UX consistente**: Mismo patrón aplicado en todas las vistas (pedidos, productos, clientes)

**Patrón adoptado**:
```tsx
// Verificación de rol
const isAdmin = user?.role === 'ADMIN';

// Botones solo para ADMIN  
{isAdmin && <Button onClick={action}>Crear/Editar/Eliminar</Button>}

// Mensaje informativo para USER
{!isAdmin && <div className="bg-blue-50">Modo solo lectura...</div>}
```

**Beneficios**:
- ✅ Seguridad: Control de acceso claro por funcionalidad
- ✅ UX: Los usuarios entienden sus limitaciones
- ✅ Consistencia: Mismo patrón en toda la aplicación
- ✅ Mantenibilidad: Fácil de extender a nuevos roles

**Impacto**: Sistema completamente funcional con control de roles robusto, listo para producción.

[2025-06-28 22:45:00] - **DECISIÓN: Migración a endpoint dedicado de categorías**

**Contexto**: Inicialmente se extraían categorías únicas de la lista de productos completos. El usuario implementó un endpoint dedicado `/api/productos/categorias` en el backend.

**Decisión tomada**: Migrar desde extracción de categorías de productos a endpoint dedicado

**Razones**:
- **Performance**: Reduce transferencia de datos significativamente
- **Precisión**: Categorías vienen directamente sin procesamiento
- **Semántica**: Endpoint específico para una responsabilidad específica
- **Escalabilidad**: Mejor para cuando haya miles de productos

**Implementación**:
- Actualizada función `getProductCategories()` en `products-service.ts`
- Mantenido mismo fallback y error handling
- Sin cambios en UI/UX - migración transparente

**Resultado**: Sistema más eficiente y mejor arquitecturado

_Última actualización: 2025-06-28 22:45:00_
