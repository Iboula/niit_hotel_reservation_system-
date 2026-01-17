# 🚀 DÉMARRAGE RAPIDE - 5 MINUTES

## Avec Docker (Plus Simple)

```powershell
# 1. Aller dans le dossier du projet
cd c:\Users\iboul\Documents\NIIT\hotel-reservation-system

# 2. Démarrer tout
docker-compose up -d

# 3. Attendre 30 secondes que tout démarre

# 4. Ouvrir dans le navigateur
# http://localhost
```

C'est tout! L'application est prête à utiliser.

---

## Vérifier que tout fonctionne

```powershell
# Voir le statut
docker-compose ps

# Voir les logs
docker-compose logs -f
```

Vous devriez voir:
- ✅ hotel-mysql (Up)
- ✅ hotel-backend (Up)  
- ✅ hotel-frontend (Up)

---

## Arrêter l'application

```powershell
# Arrêter
docker-compose stop

# Tout supprimer (garde les données)
docker-compose down
```

---

## En cas de problème

```powershell
# Tout reconstruire
docker-compose down
docker-compose up -d --build

# Voir les erreurs
docker-compose logs backend
```

---

## Accès

- **Application**: http://localhost
- **API Backend**: http://localhost:8080

---

**Pour plus de détails, voir [DOCKER_GUIDE.md](DOCKER_GUIDE.md)**
