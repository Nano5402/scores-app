# 🎾 ScoreApp — Club Deportivo

Plataforma web de gestión de resultados en tiempo real para un **club local de Tenis y Pádel** en Cúcuta, Colombia.
Inspirada visualmente en Sofascore y Flashscore, adaptada para uso interno del club.

---

## 🚀 Stack tecnológico

### Frontend
| Tecnología | Uso |
|---|---|
| React 19 + Vite | UI y bundler |
| React Router DOM v6 | Navegación SPA |
| TailwindCSS | Utilidades de layout |
| CSS Variables | Sistema de temas (claro/oscuro) |
| Zustand | Estado global |
| Axios | Cliente HTTP |
| React Hook Form | Formularios con validación |
| Lucide React | Iconografía |

### Backend
| Tecnología | Uso |
|---|---|
| Node.js + Express | API REST |
| MySQL 8.0 (XAMPP) | Base de datos |
| bcryptjs | Hash de contraseñas |
| jsonwebtoken | Autenticación JWT |
| nodemailer | Envío de OTP por correo |
| multer + uuid | Subida de imágenes |

---

## 📁 Estructura del proyecto

```
ScoresApp/
├── scores-app/          ← Frontend React
│   ├── src/
│   │   ├── components/  ← Componentes reutilizables
│   │   ├── layouts/     ← AuthLayout, AppLayout, AdminLayout
│   │   ├── pages/       ← Vistas públicas
│   │   │   ├── admin/   ← Panel de administración
│   │   │   └── auth/    ← Login, Register, ForgotPassword
│   │   ├── routes/      ← Router, ProtectedRoute, AdminRoute
│   │   ├── services/    ← Llamadas a la API
│   │   ├── store/       ← Stores de Zustand
│   │   ├── hooks/       ← Custom hooks
│   │   └── utils/       ← Utilidades
│   └── reset_db.sql     ← Script de DB completo
│
└── scores-api/          ← Backend Express
    ├── server.js
    └── src/
        ├── config/
        ├── middlewares/
        ├── modules/     ← auth, jugadores, equipos, torneos, partidos...
        └── utils/
```

---

## 🗺️ Rutas

### App (miembros)
| Ruta | Descripción |
|---|---|
| `/` | Home — partidos en vivo, anuncios, próximos |
| `/live` | Partidos en directo |
| `/tennis` | Sección tenis |
| `/padel` | Sección pádel |
| `/match/:id` | Detalle de partido |
| `/player/:id` | Perfil de jugador |
| `/team/:id` | Perfil de pareja |
| `/favorites` | Favoritos |
| `/profile` | Perfil de usuario |
| `/settings` | Configuración |

### Admin (solo rol admin)
| Ruta | Descripción |
|---|---|
| `/admin` | Dashboard del club |
| `/admin/jugadores` | CRUD de jugadores |
| `/admin/equipos` | CRUD de parejas de pádel |
| `/admin/torneos` | CRUD de torneos |
| `/admin/partidos` | CRUD de partidos + marcador en vivo |

### Auth
| Ruta | Descripción |
|---|---|
| `/login` | Login con CC + contraseña |
| `/register` | Registro (1er usuario = admin) |
| `/forgot-password` | Recuperación con OTP por email |

---

## 🎨 Sistema de diseño

El proyecto usa **CSS Variables** para temas, NO clases de color de Tailwind.

```css
/* Modo claro — Verde */
--color-brand:   #16a34a;
--bg-primary:    #f4fbf7;

/* Modo oscuro — Naranja/Negro OLED */
--color-brand:   #ea580c;
--bg-primary:    #000000;
```

Para cambiar el color principal basta con editar `src/styles/globals.css`.

**Tailwind** se usa solo para **layout y espaciado** (`flex`, `grid`, `px-4`, etc.).
Los colores siempre van con `style={{ color: 'var(--text-primary)' }}` o clases CSS propias.

---

## ⚙️ Instalación y uso

### Prerequisitos
- Node.js 18+
- XAMPP con MySQL corriendo

### Base de datos
```sql
-- En MySQL Workbench ejecutar:
source /ruta/al/proyecto/scores-app/reset_db.sql
```

### Backend
```bash
cd scores-api
npm install
# Configurar .env con credenciales DB y mail
node server.js
# Corre en http://localhost:3001
```

### Frontend
```bash
cd scores-app
npm install
npm run dev
# Corre en http://localhost:5173
```

### Primer acceso
1. Ve a `http://localhost:5173/register`
2. Regístrate — **el primer usuario será admin automáticamente**
3. Los demás usuarios serán miembros

---

## 🔐 Roles

| Rol | Acceso |
|---|---|
| `admin` | Todo — incluyendo `/admin/*` |
| `miembro` | Solo vistas públicas del club |

---

## 🗄️ Base de datos

Tablas principales:
`users` · `jugadores` · `jugador_stats` · `equipos_padel` · `torneos` · `partidos` · `sets_partido` · `categorias` · `sedes` · `canchas` · `inscripciones` · `anuncios` · `favoritos`

---

## 📦 Estado del proyecto

- [x] Auth completo (registro CC, login, recuperación OTP)
- [x] Primer usuario = admin automático
- [x] Sistema de temas claro/oscuro
- [x] Layout responsive (sidebar, bottom nav, header)
- [x] Panel admin (jugadores, equipos, torneos, partidos)
- [x] Marcador en tiempo real desde el admin
- [x] Páginas públicas (home, live, tenis, pádel, favoritos)
- [ ] Tabla de posiciones (página pública)
- [ ] Perfil de usuario conectado al backend
- [ ] Subida de fotos (jugadores, equipos)
- [ ] Notificaciones push
- [ ] Modo oscuro persistente entre sesiones

---

## 🤝 Contribuir

```bash
git checkout -b feature/nombre-funcionalidad
git commit -m "feat: descripción"
git push origin feature/nombre-funcionalidad
```

## 📄 Licencia
MIT