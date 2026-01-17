# 🐳 Hotel Reservation System - Guide Docker

Ce guide vous explique comment exécuter l'application avec Docker et comment migrer vers une exécution sans conteneur.

---

## 📋 Prérequis

- **Docker Desktop** installé ([Télécharger](https://www.docker.com/products/docker-desktop))
- **Docker Compose** (inclus avec Docker Desktop)

---

## 🚀 Démarrage Rapide avec Docker

### 1. Démarrer tous les services

Ouvrez PowerShell dans le répertoire du projet et exécutez:

```powershell
cd c:\Users\iboul\Documents\NIIT\hotel-reservation-system
docker-compose up -d
```

Cette commande va:
- ✅ Créer la base de données MySQL
- ✅ Construire et démarrer le backend Spring Boot
- ✅ Construire et démarrer le frontend React
- ✅ Configurer le réseau entre les services

### 2. Vérifier le statut

```powershell
docker-compose ps
```

Vous devriez voir 3 services en état "Up":
- `hotel-mysql` (port 3306)
- `hotel-backend` (port 8080)
- `hotel-frontend` (port 80)

### 3. Accéder à l'application

- **Frontend**: http://localhost
- **Backend API**: http://localhost:8080/api

### 4. Voir les logs

```powershell
# Tous les services
docker-compose logs -f

# Un service spécifique
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

### 5. Arrêter l'application

```powershell
# Arrêter sans supprimer les données
docker-compose stop

# Arrêter et supprimer les conteneurs (garde les données)
docker-compose down

# Tout supprimer (conteneurs + données)
docker-compose down -v
```

---

## 🔧 Commandes Utiles

### Reconstruire après des modifications

```powershell
# Reconstruire tout
docker-compose up -d --build

# Reconstruire seulement le backend
docker-compose up -d --build backend

# Reconstruire seulement le frontend
docker-compose up -d --build frontend
```

### Accéder aux conteneurs

```powershell
# Shell dans le backend
docker exec -it hotel-backend sh

# Shell dans MySQL
docker exec -it hotel-mysql mysql -u root -proot hotel_db

# Shell dans le frontend
docker exec -it hotel-frontend sh
```

### Nettoyer Docker

```powershell
# Supprimer les images non utilisées
docker image prune -a

# Supprimer tous les volumes non utilisés
docker volume prune
```

---

## 📦 Migration vers Exécution Sans Conteneur

### Prérequis pour l'exécution locale

1. **Java 17** ([OpenJDK](https://adoptium.net/))
2. **Maven 3.6+** ([Télécharger](https://maven.apache.org/download.cgi))
3. **Node.js 18+** ([Télécharger](https://nodejs.org/))
4. **MySQL 8.0** ([Télécharger](https://dev.mysql.com/downloads/mysql/))

---

### Étape 1: Installer MySQL localement

1. **Installer MySQL Server**
2. **Créer la base de données**:

```sql
CREATE DATABASE hotel_db;
CREATE USER 'hoteluser'@'localhost' IDENTIFIED BY 'hotelpass';
GRANT ALL PRIVILEGES ON hotel_db.* TO 'hoteluser'@'localhost';
FLUSH PRIVILEGES;
```

---

### Étape 2: Configurer et lancer le Backend

1. **Modifier** `backend/src/main/resources/application.properties`:

```properties
# Configuration MySQL locale
spring.datasource.url=jdbc:mysql://localhost:3306/hotel_db
spring.datasource.username=root
spring.datasource.password=root

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# JWT
jwt.secret=hotelReservationSecretKey123456789012345678901234567890
jwt.expiration=86400000

# Port
server.port=8080
```

2. **Lancer le backend**:

```powershell
cd c:\Users\iboul\Documents\NIIT\hotel-reservation-system\backend
mvn clean install
mvn spring-boot:run
```

Le backend sera accessible sur http://localhost:8080

---

### Étape 3: Configurer et lancer le Frontend

1. **Modifier** `frontend/src/services/api.ts` si nécessaire pour pointer vers localhost:8080

2. **Installer et lancer**:

```powershell
cd c:\Users\iboul\Documents\NIIT\hotel-reservation-system\frontend
npm install
npm run dev
```

Le frontend sera accessible sur http://localhost:5173

---

## 🔄 Comparaison Docker vs Local

| Aspect | Docker | Local |
|--------|--------|-------|
| **Installation** | Seulement Docker | Java, Maven, Node, MySQL |
| **Configuration** | Automatique | Manuelle |
| **Isolation** | Oui | Non |
| **Portabilité** | Très haute | Dépend de l'environnement |
| **Performance** | Bonne | Meilleure |
| **Développement** | Hot reload limité | Hot reload complet |
| **Déploiement** | Production-ready | Nécessite configuration serveur |

---

## 📊 Architecture Docker

```
┌─────────────────────────────────────────────────┐
│              Docker Network (hotel-network)      │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │  MySQL   │  │ Backend  │  │ Frontend │      │
│  │  :3306   │◄─┤  :8080   │◄─┤   :80    │      │
│  └──────────┘  └──────────┘  └──────────┘      │
│       │                                          │
│   [Volume]                                       │
└─────────────────────────────────────────────────┘
         │                │              │
    Port 3306        Port 8080      Port 80
```

---

## 🐛 Dépannage

### Le backend ne démarre pas

```powershell
# Vérifier les logs
docker-compose logs backend

# Redémarrer le service
docker-compose restart backend
```

### MySQL n'est pas prêt

```powershell
# Attendre que MySQL soit ready
docker-compose logs mysql | Select-String "ready for connections"

# Redémarrer dans l'ordre
docker-compose restart mysql
docker-compose restart backend
```

### Port déjà utilisé

```powershell
# Trouver le processus qui utilise le port
netstat -ano | findstr :8080
netstat -ano | findstr :3306

# Changer les ports dans docker-compose.yml
# Exemple: "8081:8080" au lieu de "8080:8080"
```

### Problèmes de réseau

```powershell
# Recréer le réseau
docker-compose down
docker network prune
docker-compose up -d
```

---

## 🎯 Recommandations

### Pour le développement
- Utilisez l'**exécution locale** pour bénéficier du hot reload
- Utilisez Docker pour MySQL seulement si vous ne voulez pas l'installer localement

### Pour les tests
- Utilisez **Docker Compose** pour avoir un environnement identique à la production

### Pour la production
- Utilisez **Docker** avec orchestration (Kubernetes, Docker Swarm)
- Ou déployez sans conteneur sur un serveur avec Java, MySQL et Nginx installés

---

## 📝 Notes Importantes

1. **Données**: Les données MySQL sont persistées dans un volume Docker (`mysql-data`)
2. **Hot Reload**: Avec Docker, les modifications nécessitent un rebuild
3. **Sécurité**: Changez les mots de passe avant la production
4. **Performance**: Docker ajoute une légère surcharge, négligeable pour ce projet

---

## 🆘 Support

En cas de problème:
1. Vérifier les logs: `docker-compose logs -f`
2. Vérifier le statut: `docker-compose ps`
3. Redémarrer les services: `docker-compose restart`
4. Tout reconstruire: `docker-compose up -d --build --force-recreate`

---

**Bon développement! 🚀**
