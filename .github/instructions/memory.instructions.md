---
applyTo: '**'
description: Instrucciones para que GitHub Copilot mantenga el contexto del proyecto usando el sistema Memory Bank en todos los modos (Ask, Edit, Agent).
alwaysApply: true
---

# Instrucciones para el Uso del Memory Bank

El Memory Bank es el mecanismo central para mantener el contexto y la continuidad entre interacciones de modelos LLM en tareas grandes y progresivas. Todos los progresos, hallazgos y decisiones relevantes deben registrarse aquí para que futuras interacciones puedan retomar el trabajo de manera informada y coherente.

## 1. Estructura del Memory Bank

Utiliza los siguientes archivos dentro de `memory-bank/`:

- **productContext.md**: Descripción general y objetivos del proyecto.
- **activeContext.md**: Enfoque actual, cambios recientes y estado de la tarea.
- **systemPatterns.md**: Patrones, estándares de código y convenciones.
- **decisionLog.md**: Registro de decisiones clave tomadas.
- **progress.md**: Seguimiento detallado de tareas, avances y bloqueos.

## 2. Principios de Uso

- **Consulta Inicial**: Antes de cualquier acción, revisa los archivos del Memory Bank para comprender el contexto, el estado actual y las decisiones previas.
- **Registro Obligatorio**: Después de cada interacción, registra en el Memory Bank:
  - Progresos realizados (en `progress.md`).
  - Nuevos hallazgos, información relevante o cambios de contexto (en `activeContext.md` o el archivo correspondiente).
  - Decisiones tomadas (en `decisionLog.md`).
- **Formato de Registro**: Usa siempre la marca de tiempo `[YYYY-MM-DD HH:MM:SS] - [Resumen]` para cada entrada.
- **Coherencia**: Asegúrate de que la información entre los archivos sea consistente y actualizada.

## 3. Flujo de Trabajo Recomendado

1. **Inicio de Interacción**

   - Verifica la existencia y validez de los archivos del Memory Bank.
   - Lee y comprende el contexto actual y los objetivos.

2. **Durante la Tarea**

   - Consulta el Memory Bank para tomar decisiones alineadas con el proyecto.
   - Si encuentras información nueva o relevante, regístrala inmediatamente.

3. **Al Finalizar la Interacción**
   - Documenta el progreso y los hallazgos en el archivo correspondiente.
   - Si se tomó una decisión importante, regístrala en `decisionLog.md`.
   - Actualiza el contexto activo en `activeContext.md` si cambió el enfoque o el estado de la tarea.
   - Mantén la coherencia y evita duplicidades.

## 4. Ejemplo de Registro

- **progress.md**
  `[2024-06-10 15:30:00] - Implemented user authentication endpoint.`

- **activeContext.md**
  `[2024-06-10 15:31:00] - Current focus: Testing authentication and error handling.`

- **decisionLog.md**
  `[2024-06-10 15:32:00] - Decided to use JWT for session management.`

## 5. Buenas Prácticas

- Divide tareas grandes en subtareas pequeñas y registra el avance de cada una.
- Si surge información relevante para futuras interacciones, documenta claramente en el Memory Bank.
- Antes de iniciar una nueva tarea, revisa los registros recientes para evitar redundancias y asegurar continuidad.
- Si detectas incoherencias o información desactualizada, corrígela y deja constancia del cambio.

---

**Resumen:**
El Memory Bank es la única fuente de memoria persistente entre interacciones. Úsalo para registrar todo avance, hallazgo y decisión relevante, siguiendo el formato y estructura definidos, para que cualquier modelo o usuario pueda continuar el trabajo de manera informada y eficiente.
