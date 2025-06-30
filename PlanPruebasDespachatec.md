# Plan de Pruebas de Software

## Despachatec Frontend - Sistema de Gestión de Restaurante

**Fecha de elaboración:** 28/06/2025

---

## Tabla de Contenido

- [Plan de Pruebas de Software](#plan-de-pruebas-de-software)
  - [Despachatec Frontend - Sistema de Gestión de Restaurante](#despachatec-frontend---sistema-de-gestión-de-restaurante)
  - [Tabla de Contenido](#tabla-de-contenido)
- [Historial de Versiones](#historial-de-versiones)
- [Información del Proyecto](#información-del-proyecto)
- [Aprobaciones](#aprobaciones)
- [Resumen Ejecutivo](#resumen-ejecutivo)
- [Alcance de las Pruebas](#alcance-de-las-pruebas)
  - [Elementos de Pruebas](#elementos-de-pruebas)
    - [Módulos de Alto Nivel a Probar](#módulos-de-alto-nivel-a-probar)
    - [Componentes de Infraestructura](#componentes-de-infraestructura)
- [Nuevas Funcionalidades a Probar](#nuevas-funcionalidades-a-probar)
- [Pruebas de Regresión](#pruebas-de-regresión)
- [Funcionalidades a No Probar](#funcionalidades-a-no-probar)
- [Enfoque de Pruebas (Estrategia)](#enfoque-de-pruebas-estrategia)
  - [Tipos de Pruebas a Realizar](#tipos-de-pruebas-a-realizar)
  - [Niveles de Automatización](#niveles-de-automatización)
  - [Integración CI/CD](#integración-cicd)
  - [Criterios de Entrada](#criterios-de-entrada)
  - [Criterios de Salida](#criterios-de-salida)
  - [Metodología General](#metodología-general)
- [Criterios de Aceptación o Rechazo](#criterios-de-aceptación-o-rechazo)
  - [Criterios de Aceptación General](#criterios-de-aceptación-general)
  - [Criterios de Suspensión](#criterios-de-suspensión)
  - [Criterios de Reanudación](#criterios-de-reanudación)
- [Entregables](#entregables)
  - [Entregables de Pruebas](#entregables-de-pruebas)
  - [Entregables del Proyecto](#entregables-del-proyecto)
- [Recursos](#recursos)
  - [Requerimientos de Entornos -- Hardware](#requerimientos-de-entornos----hardware)
  - [Requerimientos de Entornos -- Software](#requerimientos-de-entornos----software)
  - [Herramientas de Pruebas Requeridas](#herramientas-de-pruebas-requeridas)
  - [Personal](#personal)
  - [Entrenamiento](#entrenamiento)
- [Planificación y Organización](#planificación-y-organización)
  - [Roles y Responsabilidades](#roles-y-responsabilidades)
  - [Secuenciación de Tareas](#secuenciación-de-tareas)
  - [Estimación de Tiempos](#estimación-de-tiempos)
  - [Gestión de Riesgos](#gestión-de-riesgos)
  - [Premisas](#premisas)
- [Referencias](#referencias)
- [Glosario](#glosario)
- [Ejemplo de Caso de Prueba Automatizado (Selenium)](#ejemplo-de-caso-de-prueba-automatizado-selenium)

---

# Historial de Versiones

| Fecha      | Versión | Autor            | Organización | Descripción                                    |
| ---------- | ------- | ---------------- | ------------ | ---------------------------------------------- |
| 28/06/2025 | 1.0     | Development Team | Despachatec  | Versión inicial del Plan de Pruebas            |
| 28/06/2025 | 1.1     | QA Team          | Despachatec  | Análisis detallado de componentes y estrategia |
| 28/06/2025 | 1.2     | Project Team     | Despachatec  | Definición final de criterios y cronograma     |

# Información del Proyecto

| Empresa / Organización                 | Despachatec                                                           |
| -------------------------------------- | --------------------------------------------------------------------- |
| Proyecto                               | Sistema de Gestión de Restaurante/Delivery - Frontend Web Application |
| Fecha de preparación                   | 28 de Junio de 2025                                                   |
| Cliente                                | Despachatec Restaurante                                               |
| Patrocinador principal                 | Gerencia General Despachatec                                          |
| Gerente / Líder de Proyecto            | Líder de Desarrollo de Software                                       |
| Gerente / Líder de Pruebas de Software | QA Team Lead                                                          |

# Aprobaciones

| Nombre y Apellido | Cargo                    | Departamento u Organización | Fecha      | Firma     |
| ----------------- | ------------------------ | --------------------------- | ---------- | --------- |
| Tech Lead         | Líder Técnico            | Desarrollo                  | 28/06/2025 | Pendiente |
| QA Manager        | Gerente QA               | Control de Calidad          | 28/06/2025 | Pendiente |
| Project Manager   | Gerente de Proyecto      | Gestión de Proyectos        | 28/06/2025 | Pendiente |
| Product Owner     | Propietario del Producto | Negocio                     | 28/06/2025 | Pendiente |

# Resumen Ejecutivo

Este Plan de Pruebas describe la estrategia integral de testing para el sistema Despachatec Frontend, una aplicación web moderna desarrollada en Next.js 14 para la gestión de restaurantes y servicios de delivery.

**Propósito:** Asegurar la calidad, funcionalidad, seguridad y rendimiento del sistema antes del lanzamiento en producción.

**Tipo de Plan:** Plan maestro que abarca todas las fases de testing, desde pruebas unitarias hasta pruebas de aceptación del usuario.

**Alcance del Proyecto:** El plan está alineado con el cronograma de desarrollo de 7 semanas establecido en el plan del proyecto, cubriendo los 6 módulos principales del sistema:

- Sistema de Autenticación y Autorización
- Gestión de Clientes
- Gestión de Empleados
- Catálogo de Productos
- Sistema de Pedidos
- Módulo de Reportes y Analíticas

**Tecnología:** Next.js 14, TypeScript, React Query, Tailwind CSS, Jest, React Testing Library, Selenium.

**Restricciones:**

- Presupuesto limitado para herramientas de testing premium
- Entorno de testing debe estar disponible 24/7
- Testing en múltiples navegadores limitado a Chrome, Firefox y Safari
- Acceso limitado a datos de producción para pruebas

**Dependencias:**

- Disponibilidad del backend estable y documentado
- Participación activa de los stakeholders para validación y UAT

**Riesgos Principales:**

- Cambios de requerimientos durante el ciclo de pruebas
- Fallos en la integración con servicios externos
- Recursos limitados para pruebas manuales exhaustivas

**Esfuerzo de Pruebas:** Se estima 30% del tiempo total del proyecto dedicado a actividades de QA, distribuido en:

- 70% Pruebas Unitarias y de Integración
- 20% Pruebas de Sistema y Funcionales
- 10% Pruebas de Aceptación del Usuario

# Alcance de las Pruebas

## Elementos de Pruebas

### Módulos de Alto Nivel a Probar

1. **Sistema de Autenticación y Autorización**
   - Componentes: `LoginPage`, `AuthContext`, `middleware.ts`
   - Servicios: `auth-services.ts`
   - Funcionalidades: Login, logout, verificación de tokens JWT, control de roles
2. **Gestión de Clientes**
   - Componentes: `ClientsList`, `ClientForm`
   - Servicios: `clients-service.ts`
   - Funcionalidades: CRUD de clientes, búsqueda, validaciones
3. **Gestión de Empleados**
   - Componentes: `EmployeesList`, `EmployeeForm`
   - Servicios: Mock data (backend pendiente)
   - Funcionalidades: CRUD de empleados, gestión de roles
4. **Catálogo de Productos**
   - Componentes: `ProductsList`, `ProductForm`
   - Servicios: `products-service.ts`
   - Hooks: `useCategories`
   - Funcionalidades: CRUD productos, categorías, control de stock
5. **Sistema de Pedidos**
   - Componentes: `OrdersList`, `OrderForm`, `ProductSelector`
   - Servicios: `orders-service.ts`
   - Hooks: `useOrders`
   - Funcionalidades: Creación pedidos, cambio de estados, cálculo de totales
6. **Módulo de Reportes**
   - Componentes: Dashboard components (pendientes)
   - Funcionalidades: Reportes analíticos, métricas de ventas

### Componentes de Infraestructura

- **API Client**: `lib/api/client.ts` - Interceptores, manejo de errores
- **React Query**: Configuración, cacheo, sincronización
- **UI Components**: Componentes reutilizables del sistema de diseño
- **Navigation**: `Sidebar`, routing, middleware de protección
- **Utils**: Funciones de utilidad, validaciones, formateo

# Nuevas Funcionalidades a Probar

Esta sección describe las funcionalidades nuevas o modificadas que serán objeto de pruebas en el sistema Despachatec Frontend. El objetivo es asegurar que cada una cumpla con los requerimientos funcionales y de calidad definidos, desde la perspectiva del usuario final.

**Listado de funcionalidades nuevas o modificadas:**

1. **Sistema de Autenticación y Autorización**
   - Inicio de sesión seguro con validación de credenciales.
   - Control de acceso por roles (ADMIN/USER).
   - Recuperación y cierre de sesión.
2. **Gestión de Clientes**
   - Registro, edición y eliminación de clientes.
   - Búsqueda y filtrado de clientes.
   - Validación de datos obligatorios y formatos.
3. **Gestión de Empleados**
   - Alta, modificación y baja de empleados.
   - Asignación de roles y permisos.
4. **Catálogo de Productos**
   - Creación, edición y eliminación de productos.
   - Gestión de categorías dinámicas.
   - Control de stock y estado de productos.
5. **Sistema de Pedidos**
   - Creación de pedidos con selección múltiple de productos.
   - Cálculo automático de totales y estados de pedido.
   - Visualización y gestión de pedidos por estado.
6. **Módulo de Reportes y Analíticas**
   - Visualización de métricas de ventas y productos más vendidos.
   - Acceso restringido a reportes por rol.
7. **Navegación y Experiencia de Usuario (UX)**
   - Menú lateral, breadcrumbs y notificaciones.
   - Responsive design para dispositivos móviles y tablets.
   - Estados de carga y mensajes de error claros.

Cada una de estas funcionalidades será validada mediante casos de prueba específicos, asegurando su correcto funcionamiento, usabilidad y cumplimiento de los criterios de aceptación definidos.

# Pruebas de Regresión

Las pruebas de regresión tienen como objetivo asegurar que las funcionalidades existentes del sistema no se vean afectadas negativamente por la incorporación de nuevas características o modificaciones. Se validarán los módulos y flujos críticos que, aunque no sean el foco principal de los cambios, pueden verse impactados de manera indirecta.

**Áreas y funcionalidades a validar mediante pruebas de regresión:**

- **Autenticación y control de acceso:**
  - Validar que el login y la gestión de sesiones funcionan correctamente tras cambios en la interfaz o lógica de autenticación.
  - Verificar que el middleware de protección de rutas y el control de roles no se vean afectados por nuevas implementaciones.
- **Comunicación con la API y manejo de datos:**
  - Confirmar que los interceptores de errores y el cacheo de datos con React Query mantienen su funcionalidad.
  - Validar que las llamadas a la API siguen el formato esperado y no presentan regresiones.
- **Navegación y routing:**
  - Comprobar que la navegación entre módulos y el sidebar mantienen su comportamiento esperado.
  - Verificar que las rutas protegidas siguen restringiendo el acceso según el rol del usuario.
- **Componentes UI reutilizables:**
  - Asegurar que los botones, formularios y componentes base mantienen su comportamiento y estilos.
  - Validar que las notificaciones y mensajes al usuario funcionan en todos los módulos.
- **Gestión de estado global:**
  - Confirmar que el AuthContext y React Query mantienen el estado y la sincronización de datos correctamente.
- **Integraciones existentes:**
  - Verificar que la carga de categorías, el cálculo de totales y la sincronización de datos entre componentes funcionan como antes de los cambios.

Estas pruebas se ejecutarán en paralelo con las pruebas de nuevas funcionalidades, priorizando los flujos críticos y los módulos con mayor impacto en la experiencia del usuario.

# Funcionalidades a No Probar

En esta sección se detallan aquellas funcionalidades que, por alcance, limitaciones técnicas, de tiempo o recursos, no serán objeto de pruebas en este ciclo. Se justifica cada exclusión y se identifican los riesgos asumidos.

**Listado de funcionalidades excluidas y justificación:**

1. **Funcionalidades del Backend/API**
   - _Justificación:_ El backend es desarrollado y probado por un equipo independiente. Se asume que cuenta con su propio plan de pruebas.
   - _Riesgo:_ Fallos en la API pueden afectar el frontend, pero se mitigará con pruebas de integración y mocks.
2. **Herramientas y Frameworks de Terceros**
   - _Justificación:_ Next.js, React Query y Tailwind CSS son librerías maduras y ampliamente probadas.
   - _Riesgo:_ Bugs en dependencias externas podrían impactar la aplicación, pero se consideran improbables.
3. **Compatibilidad con Navegadores Legacy**
   - _Justificación:_ No se realizarán pruebas en Internet Explorer ni navegadores móviles no estándar por bajo uso y alto costo/beneficio.
   - _Riesgo:_ Usuarios con navegadores obsoletos pueden experimentar problemas.
4. **Pruebas de Rendimiento Exhaustivas**
   - _Justificación:_ No se realizarán pruebas de carga extrema por limitaciones de presupuesto y herramientas.
   - _Riesgo:_ El sistema podría presentar problemas bajo cargas muy altas en producción.
5. **Funcionalidades Futuras Planificadas**
   - _Justificación:_ Módulos como reportes avanzados, integración con pagos y notificaciones push están fuera del alcance actual.
   - _Riesgo:_ Ninguno para la versión inicial.
6. **Seguridad Avanzada**
   - _Justificación:_ No se realizarán pruebas de penetración profesional ni auditorías externas en esta fase.
   - _Riesgo:_ Vulnerabilidades no detectadas podrían permanecer hasta una revisión futura.

Estas exclusiones han sido consensuadas con los stakeholders y documentadas para referencia futura.

# Enfoque de Pruebas (Estrategia)

La estrategia de pruebas para el sistema Despachatec Frontend se basa en un enfoque mixto que combina pruebas manuales y automatizadas, priorizando la cobertura funcional, la detección temprana de defectos y la integración continua. Se utilizarán técnicas de caja negra y caja gris, con énfasis en la experiencia del usuario y la robustez de los flujos críticos.

## Tipos de Pruebas a Realizar

- **Pruebas Unitarias:** Validación de funciones, hooks y componentes individuales usando Jest y React Testing Library.
- **Pruebas de Integración:** Verificación de la interacción entre componentes, servicios y hooks.
- **Pruebas de Sistema:** Validación de flujos completos de usuario en la aplicación.
- **Pruebas Funcionales:** Asegurar que cada requerimiento funcional se cumple según las historias de usuario.
- **Pruebas de Regresión:** Ejecución periódica para detectar defectos introducidos por cambios recientes.
- **Pruebas de Aceptación de Usuario (UAT):** Validación final por parte de usuarios clave y stakeholders.
- **Pruebas de Usabilidad:** Evaluación de la experiencia de usuario, accesibilidad y diseño responsivo.
- **Pruebas de Seguridad Básica:** Validación de autenticación, control de acceso y protección de datos sensibles.

## Niveles de Automatización

- **Unitarias e Integración:** Automatizadas con Jest y React Testing Library.
- **End-to-End (E2E):** Automatizadas con Selenium para flujos críticos (login, pedidos, gestión de clientes/productos).
- **Pruebas Manuales:** Para validaciones exploratorias, usabilidad y casos límite no cubiertos por scripts.

## Integración CI/CD

- Las pruebas automatizadas se ejecutarán en cada pull request mediante pipelines de CI (GitHub Actions).
- Los resultados serán revisados antes de aprobar cualquier despliegue a entornos de staging o producción.
- Se generarán reportes automáticos de cobertura y defectos detectados.

## Criterios de Entrada

- Código fuente disponible y versionado en el repositorio.
- Historias de usuario y criterios de aceptación definidos y aprobados.
- Entorno de pruebas configurado y accesible.
- Herramientas de testing instaladas y configuradas.
- Datos de prueba preparados y validados.

## Criterios de Salida

- Ejecución exitosa de todos los casos de prueba críticos.
- Tasa de defectos abiertos por debajo del umbral acordado (<5% de casos críticos).
- Cobertura de pruebas automatizadas mínima del 80% en módulos clave.
- Documentación de resultados y evidencias de pruebas.
- Aprobación formal de los stakeholders.

## Metodología General

- Ciclos iterativos de pruebas alineados con los sprints de desarrollo.
- Priorización de pruebas de acuerdo al riesgo y criticidad de los módulos.
- Registro y seguimiento de defectos en herramienta de gestión (Jira o GitHub Issues, según disponibilidad del equipo).
- Reuniones periódicas de revisión de avances y bloqueos.

# Criterios de Aceptación o Rechazo

## Criterios de Aceptación General

- Todos los casos de prueba críticos y de alta prioridad han sido ejecutados y aprobados.
- No existen defectos críticos abiertos que impidan la operación del sistema.
- La cobertura de pruebas automatizadas cumple el mínimo establecido.
- La documentación de pruebas está completa y validada.
- Los stakeholders han revisado y aprobado los resultados.

## Criterios de Suspensión

- Se suspenderán las pruebas si se detectan defectos bloqueantes que impidan la ejecución de casos críticos.
- Falta de disponibilidad del entorno de pruebas o de datos necesarios.
- Cambios mayores en los requerimientos que invaliden los casos de prueba existentes.

## Criterios de Reanudación

- Corrección y verificación de los defectos bloqueantes.
- Restablecimiento del entorno de pruebas y datos.
- Actualización de los casos de prueba conforme a los nuevos requerimientos.

# Entregables

## Entregables de Pruebas

- Plan de Pruebas (este documento)
- Casos de prueba detallados (formato Excel, TestRail o similar)
- Evidencias de ejecución (capturas, logs, reportes de cobertura)
- Reportes de defectos y seguimiento
- Informe final de resultados y recomendaciones

## Entregables del Proyecto

- Código fuente probado y documentado
- Manuales de usuario y de operación
- Documentación técnica de la solución
- Reporte de lecciones aprendidas

# Recursos

## Requerimientos de Entornos -- Hardware

- PC o laptop con mínimo 8GB RAM, procesador i5 o superior
- Acceso a internet estable
- Dispositivos móviles (opcional, para pruebas de responsividad)

## Requerimientos de Entornos -- Software

- Sistema operativo Windows 10/11, macOS o Linux
- Navegadores: Chrome, Firefox, Safari (últimas versiones)
- Node.js 20+, npm
- Herramientas de testing: Jest, React Testing Library, Selenium
- Herramienta de gestión de pruebas (Excel, TestRail, etc.)
- Herramienta de gestión de incidencias (GitHub Issues, Jira)

## Herramientas de Pruebas Requeridas

- Jest y React Testing Library para pruebas unitarias/integración
- Selenium para pruebas E2E
- GitHub Actions para CI/CD
- Herramienta de gestión de pruebas y defectos

## Personal

- 1 Líder de QA
- 2 Analistas de QA
- 1 Líder Técnico
- 2 Desarrolladores Frontend
- 1 Product Owner

## Entrenamiento

- Capacitación en herramientas de testing y CI/CD
- Inducción a la arquitectura y flujos del sistema
- Talleres de buenas prácticas de pruebas y reporte de defectos

# Planificación y Organización

## Roles y Responsabilidades

| Rol                    | Responsabilidad principal                           |
| ---------------------- | --------------------------------------------------- |
| Líder de QA            | Planificación, seguimiento y reporte de pruebas     |
| Analista de QA         | Diseño y ejecución de casos de prueba               |
| Líder Técnico          | Soporte técnico, revisión de defectos               |
| Desarrollador Frontend | Corrección de defectos, soporte a QA                |
| Product Owner          | Validación de entregables y criterios de aceptación |

## Secuenciación de Tareas

1. Revisión y aprobación del plan de pruebas
2. Preparación del entorno y datos de prueba
3. Diseño de casos de prueba
4. Ejecución de pruebas unitarias y de integración
5. Ejecución de pruebas de sistema y E2E
6. Registro y seguimiento de defectos
7. Ejecución de pruebas de aceptación de usuario
8. Elaboración de informe final

## Estimación de Tiempos

| Fase                        | Duración estimada |
| --------------------------- | ----------------- |
| Preparación y planificación | 3 días            |
| Diseño de casos de prueba   | 4 días            |
| Ejecución de pruebas        | 10 días           |
| Seguimiento y cierre        | 3 días            |
| Total                       | 20 días           |

## Gestión de Riesgos

| Riesgo                                          | Probabilidad | Impacto | Mitigación                                |
| ----------------------------------------------- | ------------ | ------- | ----------------------------------------- |
| Cambios de requerimientos                       | Media        | Alta    | Revisión continua y comunicación temprana |
| Fallos en la API/backend                        | Media        | Alta    | Uso de mocks y pruebas de integración     |
| Recursos limitados para testing                 | Alta         | Media   | Priorización de pruebas críticas          |
| Retrasos en entregas del equipo de desarrollo   | Media        | Alta    | Ajuste de cronograma y comunicación       |
| Defectos no detectados en pruebas automatizadas | Baja         | Alta    | Pruebas manuales complementarias          |

## Premisas

- El equipo de desarrollo entregará versiones funcionales en los plazos acordados.
- Los ambientes de pruebas estarán disponibles y configurados oportunamente.
- Los datos de prueba serán representativos y suficientes.
- Los stakeholders participarán activamente en la validación y aprobación.

# Referencias

- [Documentación oficial de Next.js](https://nextjs.org/docs)
- [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/docs/), [Jest](https://jestjs.io/docs/getting-started), [Selenium](https://www.selenium.dev/documentation/)
- Manual de pruebas de software ISTQB
- Plantilla y ejemplo de plan de pruebas proporcionados por la organización
- Repositorio de código fuente y documentación técnica del proyecto

# Glosario

| Término         | Definición                                                               |
| --------------- | ------------------------------------------------------------------------ |
| QA              | Quality Assurance (Aseguramiento de la Calidad)                          |
| UAT             | User Acceptance Testing (Pruebas de Aceptación de Usuario)               |
| CI/CD           | Integración Continua / Despliegue Continuo                               |
| E2E             | End-to-End (Pruebas de extremo a extremo)                                |
| Mock            | Simulación de servicios o datos para pruebas                             |
| Sprint          | Iteración de trabajo en metodologías ágiles                              |
| Stakeholder     | Parte interesada en el proyecto                                          |
| Defecto crítico | Error que impide la operación normal del sistema                         |
| Cobertura       | Porcentaje de código cubierto por pruebas                                |
| Repositorio     | Almacén centralizado de código fuente                                    |
| Hook            | Función especial de React para gestionar estado o efectos en componentes |

---

**Fin del Plan de Pruebas de Software para Despachatec Frontend**

---

# Ejemplo de Caso de Prueba Automatizado (Selenium)

A continuación se muestra un ejemplo básico de caso de prueba automatizado para el login del sistema utilizando Selenium en JavaScript:

```javascript
const { Builder, By, until } = require('selenium-webdriver');

(async function loginTest() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://localhost:3000/login');
    await driver.findElement(By.name('email')).sendKeys('usuario@ejemplo.com');
    await driver.findElement(By.name('password')).sendKeys('contraseñaSegura');
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.wait(until.urlContains('/dashboard'), 5000);
    let url = await driver.getCurrentUrl();
    if (url.includes('/dashboard')) {
      console.log('Login exitoso.');
    } else {
      console.error('Fallo en el login.');
    }
  } finally {
    await driver.quit();
  }
})();
```

Este script valida que un usuario puede iniciar sesión correctamente y ser redirigido al dashboard.
