---
applyTo: '**'
description:
  'General instructions for GitHub Copilot to provide high-quality, context-aware coding assistance across Ask, Edit,
  and Agent modes.'
---

# Instrucciones Generales para GitHub Copilot

Pautas:

- Sé claro en tus solicitudes y pide aclaraciones si es necesario.
- Consulta el Memory Bank (`productContext.md`, `activeContext.md`, `systemPatterns.md`, etc.) para contexto.
- Clasifica tareas en: _Planning_, _Implementation_ o _Debugging_.
- Aplica buenas prácticas de calidad, seguridad y documentación.
- Aplica actualizaciones al Memory Bank al implementar cambios.

---

## Resumen de Flujos de Trabajo

### Planning (FOCUS = PLANNING)

Para tareas que implican diseño, análisis o propuestas de solución.

1. **Aclarar Requisitos**:

   - Consultar `productContext.md` para objetivos del proyecto y `activeContext.md` para enfoque actual.
   - Indagar sobre ambigüedades, casos límite y suposiciones.
   - Resumir requisitos, haciendo referencia a los hallazgos del Memory Bank.

2. **Descomponer y Explorar**:

   - Dividir el problema en subcomponentes, respetando `systemPatterns.md` y `architecture.md` (si está presente).
   - Proponer múltiples soluciones, evaluando según criterios (mantenibilidad, rendimiento, seguridad, alineación con el
     Memory Bank).
   - Validar soluciones con el contenido del Memory Bank.

3. **Desarrollar Plan**:

   - Crear un plan de implementación paso a paso, especificando:
     - Componentes a crear/modificar.
     - Estructuras de datos, algoritmos y APIs.
     - Manejo de errores, medidas de seguridad y registro.
     - Estrategia de pruebas (pruebas unitarias, pruebas de integración).
     - Necesidades de documentación (comentarios, docstrings).
   - Listar dependencias y suposiciones.

4. **Validar y Actualizar**:
   - Presentar el plan para aprobación, destacando la alineación con el Memory Bank.
   - Sugerir actualizaciones al Memory Bank (por ejemplo, `decisionLog.md` para nuevos patrones, `progress.md` para
     tareas).
   - Esperar aprobación explícita antes de proceder.

### Implementation (FOCUS = IMPLEMENTATION)

Para tareas que implican codificación o modificación de código.

1. **Verificación de Contexto**:

   - Revisar `systemPatterns.md` para estándares de codificación, `architecture.md` para límites de componentes, y
     `activeContext.md` para cambios recientes.
   - Asegurarse de que la tarea esté alineada con un plan aprobado o contenido del Memory Bank.

2. **Desarrollo de Código**:

   - Escribir código limpio y legible que adhiera a los estándares del proyecto (`systemPatterns.md`).
   - Usar formato de diff unificado para cambios:
     ```diff
     --- a/path/to/file
     +++ b/path/to/file
     @@ -start_line,original_lines +start_line,new_lines @@
     - old code
     + new code
     ```
   - Incluir comentarios para decisiones no obvias, haciendo referencia a archivos del Memory Bank o IDs de tareas.
   - Implementar manejo de errores, validación de entradas y medidas de seguridad.

3. **Pruebas**:

   - Sugerir pruebas unitarias para casos de éxito, fallo y límite.
   - Alinear pruebas con los patrones de prueba del proyecto (`systemPatterns.md`).

4. **Validación y Actualización**:
   - Presentar el diff para aprobación, confirmando la alineación con el Memory Bank.
   - Sugerir actualizaciones al Memory Bank (por ejemplo, `progress.md` para tareas completadas, `systemPatterns.md`
     para nuevos patrones).
   - Aplicar cambios solo después de la aprobación explícita.

### Debugging (FOCUS = DEBUGGING)

Para tareas que implican diagnóstico o corrección de errores.

1. **Análisis de Errores**:

   - Solicitar mensajes de error, trazas de pila y pasos para reproducir.
   - Consultar `activeContext.md` para cambios recientes y `error-documentation.md` (si está presente) para problemas
     conocidos.

2. **Diagnóstico**:

   - Analizar código y contenido del Memory Bank (`systemPatterns.md`, `architecture.md`) para identificar causas raíz.
   - Sugerir registro o instrumentación si es necesario.

3. **Propuesta de Solución**:

   - Proponer una solución en formato diff unificado, explicando el problema y la solución.
   - Validar la solución según los estándares del Memory Bank.
   - Sugerir pruebas para prevenir regresiones.

4. **Validación y Actualización**:
   - Presentar la solución para aprobación.
   - Sugerir actualizaciones a `error-documentation.md` (si está presente) y `progress.md`.
   - Aplicar cambios solo después de la aprobación explícita.

## Mejores Prácticas

- **Legibilidad**: Escribir código claro y mantenible con nombres consistentes (según `systemPatterns.md` o estándares
  del lenguaje).
- **Consistencia**: Adherirse a patrones del proyecto, arquitectura y decisiones en archivos del Memory Bank.
- **Proactividad**: Sugerir pruebas, optimizaciones y medidas de seguridad basadas en `lessons-learned.md` (si está
  presente).
- **Documentación**: Comentar código no obvio, haciendo referencia a archivos del Memory Bank o IDs de tareas.
  Actualizar el Memory Bank para cambios significativos.
- **Seguridad**:
  - Validar todas las entradas, especialmente datos externos/API.
  - Usar consultas parametrizadas para prevenir ataques de inyección.
  - Nunca codificar secretos; usar variables de entorno o métodos aprobados por el proyecto.
- **Rendimiento**: Evitar patrones ineficientes (por ejemplo, consultas N+1) a menos que sea necesario. Priorizar
  claridad sobre optimización prematura.
- **Integración con Git**: Suponer que los cambios no están confirmados a menos que se indique. Solicitar `git diff`
  para cambios pendientes si es necesario.

## Lenguaje y Documentación

- **Código y Comentarios**: Usar inglés a menos que `systemPatterns.md` especifique lo contrario. Mantener consistencia
  con archivos existentes.
- **Actualizaciones del Memory Bank**: Usar inglés y el formato con marca de tiempo `[YYYY-MM-DD HH:MM:SS] - [Resumen]`.
- **Comunicación**: Responder en el idioma del usuario (por ejemplo, español), pero seguir las reglas de
  lenguaje/documentación del código.

---

Al adherirse a estas instrucciones, GitHub Copilot asegura asistencia de alta calidad y consciente del contexto en todos
los modos, aprovechando el Memory Bank para la inteligencia y alineación del proyecto.
