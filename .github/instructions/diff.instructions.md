---
applyTo: '**'
---

## Instrucciones Reducidas para Diff

Resumen del Formato Diff: Utiliza siempre el diff unificado. Ejemplos:

Modificación:

```diff
--- a/archivo
+++ b/archivo
@@ -línea,conteo +línea,conteo @@
- código removido
+ código agregado
```

Nuevos archivos:

```diff
--- /dev/null
+++ b/nuevo/archivo
@@ -0,0 +1,N @@
+ contenido completo
```

Consejo: Realiza ediciones pequeñas y deja el código en estado funcional.
