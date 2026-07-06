# ScoreApp — Próximos pasos

## Estado actual
El proyecto tiene el flujo principal funcionando de extremo a extremo:
login → home → partidos → panel admin → marcador en vivo.

---

## 🔴 Prioridad alta (funcionalidad incompleta)

### 1. Página de posiciones (frontend)
El backend ya tiene `/api/posiciones/:torneo_id` funcionando.
Falta crear la vista pública.

**Archivo a crear:** `src/pages/Posiciones.jsx`
**Ruta a agregar en** `src/routes/index.jsx`:
```jsx
<Route path="/posiciones/:torneo_id" element={<Posiciones />} />
```

---

### 2. Perfil de usuario conectado al backend
`src/pages/Profile.jsx` actualmente muestra los datos del store
pero no guarda cambios en la DB.

**Endpoints necesarios en el backend:**
```
GET  /api/users/me       → datos del usuario actual
PUT  /api/users/me       → actualizar nombre, apellido, teléfono
PUT  /api/users/password → cambiar contraseña (requiere password actual)
```

---

### 3. Tabla de posiciones en panel admin
El admin debe poder ver y gestionar las posiciones por torneo.

**Archivo a crear:** `src/pages/admin/GestionPosiciones.jsx`
**Ruta a agregar:** `/admin/posiciones`

---

## 🟡 Prioridad media

### 4. Subida de fotos de jugadores y equipos
El backend ya tiene `upload.middleware.js` con multer configurado.
Falta conectarlo al frontend en los formularios de admin.

**En** `GestionJugadores.jsx` y `GestionEquipos.jsx`:
- Agregar campo `<input type="file">` con preview
- Llamar al endpoint con `multipart/form-data`

**Endpoint backend necesario:**
```
POST /api/jugadores/:id/foto
```

---

### 5. Inscripciones a torneos
Los usuarios miembros deberían poder inscribirse a torneos desde la app.

**Endpoint ya existe en backend:** tabla `inscripciones`
**Falta:** botón en detalle de torneo + gestión en admin

---

### 6. Anuncios del club (admin)
El backend tiene `/api/anuncios` con POST y DELETE.
Falta una sección en el panel admin para gestionar anuncios.

**Archivo a crear:** `src/pages/admin/GestionAnuncios.jsx`
**Ruta a agregar:** `/admin/anuncios`

---

## 🟢 Prioridad baja (mejoras UX)

### 7. Modo oscuro persistente al recargar
Actualmente Zustand persiste el valor pero el HTML no aplica
la clase `dark` hasta que el store se rehidrata.
Agregar en `index.html`:
```html
<script>
  const ui = JSON.parse(localStorage.getItem('ui-storage') || '{}')
  if (ui?.state?.darkMode !== false) {
    document.documentElement.classList.add('dark')
  }
</script>
```

---

### 8. Búsqueda global
Agregar búsqueda en el Header que filtre jugadores, partidos y torneos.
El backend ya soporta filtros por query params.

---

### 9. Historial H2H entre jugadores
En la vista de detalle de partido (`/match/:id`), la pestaña H2H
actualmente muestra "Disponible próximamente".

**Endpoint backend necesario:**
```
GET /api/jugadores/:id/h2h/:rival_id
```

---

### 10. Notificaciones en tiempo real
Para que el marcador se actualice automáticamente sin recargar
se puede implementar polling (cada 15s) o WebSockets.

**Opción simple (polling):**
```js
// En useMatch hook
useEffect(() => {
  const interval = setInterval(() => {
    if (match?.estado === 'en_vivo') refetch()
  }, 15000)
  return () => clearInterval(interval)
}, [match?.estado])
```

---

## 📋 Checklist resumido

| Tarea | Dificultad | Tiempo est. |
|---|---|---|
| Página posiciones (frontend) | Baja | 1h |
| Perfil usuario → backend | Media | 2h |
| Admin posiciones | Baja | 1h |
| Subida de fotos | Media | 2h |
| Inscripciones torneos | Media | 3h |
| Admin anuncios | Baja | 1h |
| Modo oscuro persistente | Baja | 15min |
| Búsqueda global | Media | 2h |
| H2H jugadores | Alta | 4h |
| Notificaciones tiempo real | Alta | 4h |