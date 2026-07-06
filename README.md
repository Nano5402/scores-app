# ScoreApp

Frontend web para **ScoreApp**, plataforma de gestión de resultados en tiempo real para el Club Unión de Bucaramanga. Tenis y Pádel.

---

## Stack

| Tecnología       | Versión | Uso                   |
| ---------------- | ------- | --------------------- |
| React            | 19.0    | UI                    |
| Vite             | 6.0     | Bundler               |
| React Router DOM | 6.28    | Navegación SPA        |
| Zustand          | 5.0     | Estado global         |
| Axios            | 1.7     | Cliente HTTP          |
| React Hook Form  | 7.54    | Formularios           |
| Zod              | 3.24    | Validación de schemas |
| Lucide React     | 0.469   | Iconografía           |
| TailwindCSS      | 3.4     | Utilidades de layout  |
| Prettier         | 3.9     | Formateo de código    |

---

## Instalación

```bash
git clone <repo>
cd scores-app
npm install
npm run dev     # http://localhost:5173
```

---

## Variables de entorno (`.env`)

```env
VITE_API_URL=http://localhost:3001/api
```

---

## Estructura

```
scores-app/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── styles/
│   │   └── globals.css         ← CSS variables del sistema de diseño
│   ├── routes/
│   │   ├── index.jsx           ← Router principal (lazy loading)
│   │   ├── ProtectedRoute.jsx  ← Requiere sesión activa
│   │   └── AdminRoute.jsx      ← Requiere rol admin
│   ├── layouts/
│   │   ├── AuthLayout.jsx      ← Login/Register/ForgotPassword
│   │   ├── AppLayout.jsx       ← App principal (miembros)
│   │   └── AdminLayout.jsx     ← Panel de administración
│   ├── pages/
│   │   ├── auth/               ← Login, Register, ForgotPassword
│   │   ├── admin/              ← Panel admin (10 secciones)
│   │   ├── Home.jsx
│   │   ├── Live.jsx
│   │   ├── Tennis.jsx
│   │   ├── Padel.jsx
│   │   ├── Match.jsx
│   │   ├── Player.jsx
│   │   ├── Team.jsx
│   │   ├── Favorites.jsx
│   │   ├── Profile.jsx
│   │   └── Settings.jsx
│   ├── components/
│   │   ├── ui/                 ← Button, Input, Tabs, Toast, ConfirmDialog...
│   │   ├── layout/             ← Header, Sidebar, BottomNavigation
│   │   ├── common/             ← ThemeToggle, EmptyState, SectionHeader...
│   │   ├── match/              ← MatchCard, LiveBadge, ScoreDisplay
│   │   ├── player/             ← PlayerCard
│   │   └── team/               ← TeamCard
│   ├── services/               ← Llamadas a la API (Axios)
│   │   ├── api.js              ← Instancia Axios + interceptores
│   │   ├── authService.js
│   │   ├── matchService.js
│   │   ├── playerService.js
│   │   ├── teamService.js
│   │   ├── tournamentService.js
│   │   ├── newsService.js
│   │   ├── categoriaService.js
│   │   ├── sedeService.js
│   │   └── userService.js
│   ├── store/                  ← Zustand
│   │   ├── useAuthStore.js     ← Sesión + rol
│   │   ├── useUIStore.js       ← Tema, sidebar, idioma, notificaciones
│   │   ├── useFavoritesStore.js
│   │   └── useConfirmStore.js  ← Diálogo de confirmación global
│   ├── hooks/
│   │   ├── useMatches.js
│   │   ├── usePlayers.js
│   │   ├── useHealthCheck.js   ← Ping al backend, auto-logout si cae
│   │   ├── useDebounce.js
│   │   └── useLocalStorage.js
│   └── utils/
│       ├── cn.js               ← Merge de clases CSS
│       ├── confirm.js          ← Reemplazo de window.confirm()
│       ├── formatDate.js
│       └── formatScore.js
└── reset_db.sql                ← Schema completo de la base de datos
```

---

## Rutas

### Públicas (autenticación)

| Ruta               | Página                            |
| ------------------ | --------------------------------- |
| `/login`           | Login con número de cédula        |
| `/register`        | Registro (primer usuario = admin) |
| `/forgot-password` | Recuperación con OTP              |

### App (miembros)

| Ruta          | Página                             |
| ------------- | ---------------------------------- |
| `/`           | Home — en vivo, anuncios, próximos |
| `/live`       | Partidos en directo                |
| `/tennis`     | Sección tenis                      |
| `/padel`      | Sección pádel                      |
| `/match/:id`  | Detalle de partido                 |
| `/player/:id` | Perfil de jugador                  |
| `/team/:id`   | Perfil de pareja                   |
| `/favorites`  | Favoritos                          |
| `/profile`    | Mi perfil                          |
| `/settings`   | Configuración                      |

### Admin (solo rol `admin`)

| Ruta                | Sección                          |
| ------------------- | -------------------------------- |
| `/admin`            | Dashboard                        |
| `/admin/jugadores`  | CRUD jugadores                   |
| `/admin/equipos`    | CRUD parejas                     |
| `/admin/torneos`    | CRUD torneos                     |
| `/admin/partidos`   | CRUD partidos + marcador en vivo |
| `/admin/posiciones` | Tabla de posiciones              |
| `/admin/anuncios`   | CRUD anuncios                    |
| `/admin/sedes`      | CRUD sedes y canchas             |
| `/admin/categorias` | CRUD categorías                  |
| `/admin/usuarios`   | Gestión de usuarios + roles      |

---

## Sistema de diseño

Basado en **CSS Variables** — no Tailwind para colores. Tailwind solo para layout y espaciado.

```css
/* Modo claro — Verde */
--color-brand: #16a34a;
--bg-primary: #f4fbf7;

/* Modo oscuro — Naranja + Negro OLED */
--color-brand: #ea580c;
--bg-primary: #000000;
```

Para cambiar el color principal del club editar `src/styles/globals.css`.

---

## Funcionalidades destacadas

### Health Check automático

`useHealthCheck` hace ping al backend cada 5 segundos. Si falla 3 veces seguidas cierra la sesión automáticamente y redirige a login con un mensaje claro.

### Confirmación con doble verificación

`confirm()` en `src/utils/confirm.js` reemplaza `window.confirm()`. Para eliminaciones sensibles el usuario debe escribir el nombre exacto del registro antes de confirmar.

```js
const ok = await confirm({
  title: 'Eliminar jugador',
  danger: true,
  requireText: 'Carlos García',
})
```

### Lazy loading por ruta

Cada página se carga como chunk separado. El `Suspense` está dentro de cada layout (no a nivel raíz), así el Header y Sidebar nunca se desmontan al navegar.

### Roles

- **admin** — acceso completo incluyendo `/admin/*`
- **miembro** — solo vistas públicas del club

El primer usuario en registrarse es admin automáticamente.

---

## Scripts

```bash
npm run dev          # Vite dev server — http://localhost:5173
npm run build        # Build de producción
npm run preview      # Preview del build
npm run format       # Prettier — formatea todo src/
```

---

## Configuración de Prettier

`.prettierrc` en la raíz del proyecto:

```json
{
  "semi": false,
  "singleQuote": true,
  "jsxSingleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "always"
}
```

`.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

---

## Estado del proyecto

- [x] Auth completo (login CC, register, OTP)
- [x] Primer usuario = admin automático
- [x] Sistema de temas claro/oscuro (verde/naranja OLED)
- [x] Sidebar drawer en todas las pantallas
- [x] Health check con auto-logout
- [x] Panel admin con 10 secciones
- [x] Marcador en vivo desde el admin
- [x] Diálogo de confirmación con doble verificación
- [x] Favoritos persistidos en localStorage
- [ ] Perfil de jugador con privacidad configurable
- [ ] Inscripciones a torneos desde la app
- [ ] Notificaciones push al crear torneos
- [ ] Tabla de posiciones en vista pública
- [ ] Subida de fotos de jugadores
