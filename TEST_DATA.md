# 🌱 Données de Test - Hotel Reservation System

## ✅ Statut

La base de données a été peuplée avec succès avec les données de test suivantes:

## 📊 Résumé des Données

- **4 Utilisateurs** (1 Admin + 3 Utilisateurs réguliers)
- **15 Chambres** (différents types et prix)
- **6 Clients**
- **8 Réservations** (avec différents statuts)

---

## 🔐 Comptes de Test

### Administrateur
- **Username:** `admin`
- **Email:** `admin@hotel.com`
- **Password:** `password`
- **Rôle:** ADMIN

### Utilisateurs Réguliers
1. **Username:** `john.doe`
   - **Email:** `john.doe@email.com`
   - **Password:** `password`
   - **Rôle:** USER

2. **Username:** `jane.smith`
   - **Email:** `jane.smith@email.com`
   - **Password:** `password`
   - **Rôle:** USER

3. **Username:** `bob.wilson`
   - **Email:** `bob.wilson@email.com`
   - **Password:** `password`
   - **Rôle:** USER

---

## 🏨 Chambres Disponibles

### Chambres Single (3)
- **101** - $80/nuit - Disponible
- **102** - $85/nuit - Disponible
- **103** - $80/nuit - Disponible
- **104** - $80/nuit - ❌ Maintenance

### Chambres Double (5)
- **201** - $120/nuit - Disponible
- **202** - $125/nuit - Disponible
- **203** - $120/nuit - Disponible
- **204** - $130/nuit - Disponible
- **205** - $125/nuit - Disponible

### Suites (3)
- **301** - $200/nuit - Disponible (Jacuzzi)
- **302** - $220/nuit - Disponible (Vue panoramique)
- **303** - $210/nuit - Disponible (2 chambres + kitchenette)

### Chambres Deluxe (3)
- **401** - $180/nuit - Disponible
- **402** - $185/nuit - Disponible (Terrasse)
- **403** - $190/nuit - Disponible (Coin luxe)

---

## 👥 Clients de Test

1. **John Doe** - john.doe@email.com - +1-555-0101
2. **Jane Smith** - jane.smith@email.com - +1-555-0102
3. **Bob Wilson** - bob.wilson@email.com - +1-555-0103
4. **Alice Johnson** - alice.j@email.com - +1-555-0104
5. **Michael Brown** - michael.b@email.com - +1-555-0105
6. **Sarah Davis** - sarah.d@email.com - +1-555-0106

---

## 📅 Réservations Existantes

### Réservations Complétées (2)
1. John Doe - Chambre 101 - Il y a 30 jours (3 nuits) - $240
2. Jane Smith - Chambre 201 - Il y a 20 jours (3 nuits) - $360

### Réservations Confirmées (3)
3. Bob Wilson - Suite 301 - Dans 5 jours (3 nuits) - $600
4. John Doe - Chambre 202 - Dans 10 jours (4 nuits) - $500
5. Alice Johnson - Deluxe 401 - Dans 15 jours (3 nuits) - $540

### Réservations En Attente (2)
6. Michael Brown - Chambre 203 - Dans 20 jours (2 nuits) - $240
7. Sarah Davis - Deluxe 402 - Dans 25 jours (5 nuits) - $925

### Réservations Annulées (1)
8. Jane Smith - Chambre 204 - Annulée (prévu dans 7 jours)

---

## 🚀 Comment Tester

### 1. Se Connecter en tant qu'Admin
```
URL: http://localhost/login
Username: admin
Password: password
```

Fonctionnalités disponibles:
- ✅ Voir toutes les réservations
- ✅ Gérer les chambres (ajouter, modifier, supprimer)
- ✅ Voir tous les clients
- ✅ Confirmer/annuler des réservations

### 2. Se Connecter en tant qu'Utilisateur
```
URL: http://localhost/login
Username: john.doe (ou jane.smith, bob.wilson)
Password: password
```

Fonctionnalités disponibles:
- ✅ Parcourir les chambres
- ✅ Faire une réservation
- ✅ Voir mes réservations
- ✅ Annuler mes réservations

### 3. Créer un Nouveau Compte
```
URL: http://localhost/register
```

---

## 🔄 Réinitialiser les Données

Si vous souhaitez réinitialiser la base de données:

### Option 1: Réexécuter le script
```powershell
docker cp backend/src/main/resources/data.sql hotel-mysql:/tmp/data.sql
docker exec -i hotel-mysql mysql -uroot -proot hotel_db -e "source /tmp/data.sql"
```

### Option 2: Tout réinitialiser
```powershell
# Arrêter les conteneurs
docker-compose down -v

# Redémarrer
docker-compose up -d

# Attendre 30 secondes puis réexécuter le script
```

---

## 📝 Notes Importantes

- **Tous les mots de passe** sont encodés en BCrypt
- **Les dates de réservation** sont relatives à la date actuelle
- **Les prix** sont calculés automatiquement (prix chambre × nombre de nuits)
- **La chambre 104** est marquée comme indisponible (maintenance)

---

## 🧪 Scénarios de Test Suggérés

1. **Recherche de chambre**
   - Filtrer par type (Single, Double, Suite, Deluxe)
   - Filtrer par prix
   - Vérifier la disponibilité

2. **Création de réservation**
   - Sélectionner une chambre disponible
   - Choisir des dates
   - Vérifier le calcul du prix total
   - Confirmer la réservation

3. **Gestion des réservations**
   - Admin: voir toutes les réservations
   - User: voir uniquement ses réservations
   - Annuler une réservation
   - Confirmer une réservation (admin)

4. **Gestion des chambres (Admin uniquement)**
   - Ajouter une nouvelle chambre
   - Modifier une chambre existante
   - Marquer une chambre comme indisponible

---

**Bon test! 🎉**
