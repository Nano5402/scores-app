# 🎾 ScoreApp

Aplicación web SPA de resultados en tiempo real para **Tenis** y **Pádel**, inspirada visualmente en Sofascore, Flashscore y Bet365 Scores.

> Proyecto en desarrollo activo. Actualmente sin backend — toda la data se simula mediante mocks JSON.

---

## 🚀 Stack tecnológico

| Tecnología | Uso |
|---|---|
| React 19 | UI principal |
| Vite | Bundler y dev server |
| React Router DOM | Navegación SPA |
| TailwindCSS | Estilos utilitarios |
| Zustand | Manejo de estado global |
| Axios | Cliente HTTP (preparado para API) |
| React Hook Form | Formularios |
| Zod | Validación de esquemas |
| Lucide React | Iconografía |

---

## 📁 Estructura del proyecto

```
src/
├── assets/           # Imágenes, fuentes, íconos estáticos
├── components/       # Componentes reutilizables
│   ├── ui/           # Botones, inputs, modales, etc.
│   ├── layout/       # Header, Sidebar, BottomNavigation
│   ├── match/        # MatchCard, LiveBadge, ScoreDisplay
│   ├── player/       # PlayerCard
│   ├── team/         # TeamCard
│   └── common/       # SearchBar, StatsCard, SectionHeader, EmptyState
├── hooks/            # Custom hooks
├── layouts/          # AuthLayout, AppLayout
├── mocks/            # Datos simulados en JSON
├── pages/            # Vistas de cada ruta
│   └── auth/         # Login, Register, ForgotPassword
├── routes/           # Configuración de rutas y rutas protegidas
├── services/         # Capa de servicios (preparada para backend)
├── store/            # Stores de Zustand
├── styles/           # CSS global
└── utils/            # Funciones utilitarias
```

---

## 🗺️ Rutas

| Ruta | Descripción |
|---|---|
| `/` | Home — partidos destacados, noticias, ranking |
| `/live` | Partidos en directo |
| `/tennis` | Sección ATP / WTA / Challenger / ITF |
| `/padel` | Sección Premier Padel / A1 Padel |
| `/match/:id` | Detalle de partido |
| `/player/:id` | Perfil de jugador |
| `/team/:id` | Perfil de pareja de pádel |
| `/favorites` | Favoritos del usuario |
| `/profile` | Perfil de usuario |
| `/settings` | Configuración |
| `/login` | Inicio de sesión |
| `/register` | Registro |
| `/forgot-password` | Recuperación de contraseña |

---

## 🎨 Diseño

- **Modo oscuro** por defecto
- **Responsive**: sidebar fija en desktop, colapsable en tablet, bottom navigation en mobile
- **Colores principales**

```
Background:   #111827
Sidebar:      #1f2937
Cards:        #374151
Brand:        #0284c7
Texto:        #ffffff
Secundario:   #9ca3af
```

---

## ⚙️ Instalación y uso

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/scores-app.git
cd scores-app

# Instalar dependencias
npm install

# Iniciar en desarrollo
npm run dev

# Build para producción
npm run build
```

---

## 📦 Estado del proyecto

- [x] Estructura base del proyecto
- [ ] Configuración (Vite, Tailwind, Router)
- [ ] Componentes UI base
- [ ] Layout principal (Sidebar, Header, BottomNav)
- [ ] Mocks JSON
- [ ] Páginas principales
- [ ] Autenticación (mock)
- [ ] Favoritos con Zustand
- [ ] Conexión con backend real

---

## 🤝 Contribuir

1. Haz fork del repositorio
2. Crea tu rama: `git checkout -b feature/nueva-funcionalidad`
3. Commitea tus cambios: `git commit -m "feat: descripción"`
4. Push a tu rama: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

---

## 📄 Licencia

MIT