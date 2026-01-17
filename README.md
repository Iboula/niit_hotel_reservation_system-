# Hotel Reservation System

Application complète de gestion de réservations d'hôtel développée avec Spring Boot et React.

## 🏗️ Architecture

- **Backend**: Spring Boot 3.2.1 + MySQL
- **Frontend**: React 18 + TypeScript + Vite
- **Sécurité**: JWT Authentication
- **Déploiement**: Docker + Docker Compose

## 📁 Structure du Projet

```
hotel-reservation-system/
├── backend/              # Spring Boot API
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── frontend/             # React App
│   ├── src/
│   ├── package.json
│   ├── nginx.conf
│   └── Dockerfile
├── docker-compose.yml    # Orchestration
└── DOCKER_GUIDE.md      # Guide détaillé
```

## 🚀 Démarrage Rapide

### Avec Docker (Recommandé)

```bash
# Démarrer l'application complète
docker-compose up -d

# Accéder à l'application
# Frontend: http://localhost
# Backend: http://localhost:8080
```

### Sans Docker

Voir [DOCKER_GUIDE.md](DOCKER_GUIDE.md) pour les instructions détaillées.

## ✨ Fonctionnalités

### Utilisateurs
- ✅ Inscription / Connexion
- ✅ Authentification JWT
- ✅ Gestion de profil

### Chambres
- ✅ Listing des chambres
- ✅ Recherche et filtrage
- ✅ Détails des chambres
- ✅ Vérification de disponibilité

### Réservations
- ✅ Créer une réservation
- ✅ Voir mes réservations
- ✅ Annuler une réservation
- ✅ Confirmation de réservation

### Administration
- ✅ Gestion des chambres (CRUD)
- ✅ Gestion des réservations
- ✅ Gestion des clients

## 🛠️ Technologies

### Backend
- Spring Boot 3.2.1
- Spring Data JPA
- Spring Security
- JWT (io.jsonwebtoken)
- MySQL 8.0
- Lombok
- Maven

### Frontend
- React 18
- TypeScript
- Vite
- React Router v6
- Axios
- React Hook Form
- React Toastify

### DevOps
- Docker
- Docker Compose
- Nginx

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion

### Users
- `GET /api/users` - Liste des utilisateurs
- `GET /api/users/{id}` - Détails utilisateur
- `PUT /api/users/{id}` - Modifier utilisateur
- `DELETE /api/users/{id}` - Supprimer utilisateur

### Rooms
- `GET /api/rooms` - Liste des chambres
- `GET /api/rooms/{id}` - Détails chambre
- `POST /api/rooms` - Créer chambre
- `PUT /api/rooms/{id}` - Modifier chambre
- `DELETE /api/rooms/{id}` - Supprimer chambre
- `GET /api/rooms/search` - Recherche chambres
- `GET /api/rooms/available` - Vérifier disponibilité

### Guests
- `GET /api/guests` - Liste des clients
- `GET /api/guests/{id}` - Détails client
- `POST /api/guests` - Créer client
- `PUT /api/guests/{id}` - Modifier client
- `DELETE /api/guests/{id}` - Supprimer client

### Reservations
- `GET /api/reservations` - Liste des réservations
- `GET /api/reservations/{id}` - Détails réservation
- `POST /api/reservations` - Créer réservation
- `PUT /api/reservations/{id}` - Modifier réservation
- `DELETE /api/reservations/{id}` - Supprimer réservation
- `PUT /api/reservations/{id}/confirm` - Confirmer réservation
- `PUT /api/reservations/{id}/cancel` - Annuler réservation

## 🔒 Sécurité

- Authentification JWT
- Mots de passe hashés avec BCrypt
- CORS configuré
- Sessions stateless
- Endpoints protégés par rôles (USER/ADMIN)

## 🗄️ Base de Données

### Entités
- **User** - Utilisateurs du système
- **Room** - Chambres disponibles
- **Guest** - Informations clients
- **Reservation** - Réservations

### Relations
- User ↔ Guest (One-to-Many)
- Room ↔ Reservation (One-to-Many)
- Guest ↔ Reservation (One-to-Many)

## 📖 Documentation Complète

Consultez [DOCKER_GUIDE.md](DOCKER_GUIDE.md) pour:
- Guide d'installation détaillé
- Configuration Docker et locale
- Migration conteneur → sans conteneur
- Dépannage
- Commandes utiles

## 🎯 Utilisation

1. **Démarrer l'application**
   ```bash
   docker-compose up -d
   ```

2. **Créer un compte admin** (via API ou base de données)

3. **Ajouter des chambres** (via panel admin)

4. **Tester les réservations**

## 🛑 Arrêter l'Application

```bash
# Arrêter
docker-compose stop

# Arrêter et supprimer les conteneurs
docker-compose down

# Tout supprimer (conteneurs + données)
docker-compose down -v
```

## 📝 Variables d'Environnement

### Backend
```properties
SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/hotel_db
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=root
JWT_SECRET=hotelReservationSecretKey...
JWT_EXPIRATION=86400000
```

### Frontend
Les variables sont configurées dans le code (pas de .env nécessaire pour Docker)

## 🧪 Tests

```bash
# Backend
cd backend
mvn test

# Frontend
cd frontend
npm test
```

## 📦 Build Production

```bash
# Docker (recommandé)
docker-compose build

# Backend seul
cd backend
mvn clean package

# Frontend seul
cd frontend
npm run build
```

## 🤝 Contribution

Projet d'examen - Master 1 NIIT

## 📄 Licence

Projet éducatif

---

**Développé avec ❤️ pour l'examen M1**
