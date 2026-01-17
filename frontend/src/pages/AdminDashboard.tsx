import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { roomService } from '../services/roomService';
import { reservationService } from '../services/reservationService';
import { guestService } from '../services/guestService';
import { Reservation } from '../utils/types';
import '../styles/AdminDashboard.css';

interface DashboardStats {
  totalRooms: number;
  availableRooms: number;
  occupiedRooms: number;
  totalReservations: number;
  confirmedReservations: number;
  pendingReservations: number;
  completedReservations: number;
  cancelledReservations: number;
  totalGuests: number;
  totalRevenue: number;
  monthlyRevenue: number;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalRooms: 0,
    availableRooms: 0,
    occupiedRooms: 0,
    totalReservations: 0,
    confirmedReservations: 0,
    pendingReservations: 0,
    completedReservations: 0,
    cancelledReservations: 0,
    totalGuests: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
  });
  const [recentReservations, setRecentReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load all data
      const [rooms, reservations, guests] = await Promise.all([
        roomService.getAllRooms(),
        reservationService.getAllReservations(),
        guestService.getAllGuests(),
      ]);

      // Calculate stats
      const availableRooms = rooms.filter(r => r.isAvailable).length;
      const confirmedReservations = reservations.filter(r => r.status === 'CONFIRMED').length;
      const pendingReservations = reservations.filter(r => r.status === 'PENDING').length;
      const completedReservations = reservations.filter(r => r.status === 'COMPLETED').length;
      const cancelledReservations = reservations.filter(r => r.status === 'CANCELLED').length;
      
      // Calculate revenue
      const totalRevenue = reservations
        .filter(r => r.status === 'COMPLETED' || r.status === 'CONFIRMED')
        .reduce((sum, r) => sum + r.totalPrice, 0);

      // Calculate monthly revenue (current month)
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const monthlyRevenue = reservations
        .filter(r => {
          const reservationDate = new Date(r.checkInDate);
          return (r.status === 'COMPLETED' || r.status === 'CONFIRMED') &&
                 reservationDate.getMonth() === currentMonth &&
                 reservationDate.getFullYear() === currentYear;
        })
        .reduce((sum, r) => sum + r.totalPrice, 0);

      setStats({
        totalRooms: rooms.length,
        availableRooms,
        occupiedRooms: rooms.length - availableRooms,
        totalReservations: reservations.length,
        confirmedReservations,
        pendingReservations,
        completedReservations,
        cancelledReservations,
        totalGuests: guests.length,
        totalRevenue,
        monthlyRevenue,
      });

      // Get recent reservations (last 5)
      const sortedReservations = [...reservations]
        .sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime())
        .slice(0, 5);
      setRecentReservations(sortedReservations);

    } catch (error) {
      toast.error('Échec du chargement des données du tableau de bord');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Chargement du tableau de bord...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>📊 Tableau de Bord Administrateur</h1>
        <Link to="/admin/manage" className="btn btn-primary">
          Gérer l'Hôtel
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        {/* Room Stats */}
        <div className="stat-card rooms">
          <div className="stat-icon">🏨</div>
          <div className="stat-content">
            <h3>Chambres</h3>
            <div className="stat-number">{stats.totalRooms}</div>
            <div className="stat-details">
              <span className="stat-item available">✓ {stats.availableRooms} Disponibles</span>
              <span className="stat-item occupied">✗ {stats.occupiedRooms} Occupées</span>
            </div>
          </div>
        </div>

        {/* Reservation Stats */}
        <div className="stat-card reservations">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>Réservations</h3>
            <div className="stat-number">{stats.totalReservations}</div>
            <div className="stat-details">
              <span className="stat-item confirmed">✓ {stats.confirmedReservations} Confirmées</span>
              <span className="stat-item pending">⏳ {stats.pendingReservations} En attente</span>
            </div>
          </div>
        </div>

        {/* Guest Stats */}
        <div className="stat-card guests">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Clients</h3>
            <div className="stat-number">{stats.totalGuests}</div>
            <div className="stat-details">
              <span className="stat-item">Total enregistrés</span>
            </div>
          </div>
        </div>

        {/* Revenue Stats */}
        <div className="stat-card revenue">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Revenus</h3>
            <div className="stat-number">{stats.totalRevenue.toLocaleString()} CFA</div>
            <div className="stat-details">
              <span className="stat-item">Ce mois: {stats.monthlyRevenue.toLocaleString()} CFA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reservation Status Overview */}
      <div className="status-overview">
        <h2>État des Réservations</h2>
        <div className="status-bars">
          <div className="status-bar">
            <label>Confirmées ({stats.confirmedReservations})</label>
            <div className="progress-bar">
              <div 
                className="progress confirmed" 
                style={{ width: `${(stats.confirmedReservations / stats.totalReservations) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="status-bar">
            <label>En attente ({stats.pendingReservations})</label>
            <div className="progress-bar">
              <div 
                className="progress pending" 
                style={{ width: `${(stats.pendingReservations / stats.totalReservations) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="status-bar">
            <label>Terminées ({stats.completedReservations})</label>
            <div className="progress-bar">
              <div 
                className="progress completed" 
                style={{ width: `${(stats.completedReservations / stats.totalReservations) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="status-bar">
            <label>Annulées ({stats.cancelledReservations})</label>
            <div className="progress-bar">
              <div 
                className="progress cancelled" 
                style={{ width: `${(stats.cancelledReservations / stats.totalReservations) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reservations */}
      <div className="recent-reservations">
        <h2>Réservations Récentes</h2>
        {recentReservations.length === 0 ? (
          <p className="no-data">Aucune réservation récente</p>
        ) : (
          <div className="reservations-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Client</th>
                  <th>Chambre</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
                  <th>Montant</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {recentReservations.map(reservation => (
                  <tr key={reservation.id}>
                    <td>#{reservation.id}</td>
                    <td>{reservation.guestName}</td>
                    <td>Chambre {reservation.roomNumber}</td>
                    <td>{new Date(reservation.checkInDate).toLocaleDateString('fr-FR')}</td>
                    <td>{new Date(reservation.checkOutDate).toLocaleDateString('fr-FR')}</td>
                    <td>{reservation.totalPrice.toLocaleString()} CFA</td>
                    <td>
                      <span className={`status-badge ${reservation.status.toLowerCase()}`}>
                        {reservation.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Actions Rapides</h2>
        <div className="actions-grid">
          <Link to="/admin/manage?tab=rooms" className="action-card">
            <div className="action-icon">🛏️</div>
            <h3>Gérer les Chambres</h3>
            <p>Ajouter, modifier ou supprimer des chambres</p>
          </Link>
          <Link to="/admin/manage?tab=reservations" className="action-card">
            <div className="action-icon">📋</div>
            <h3>Gérer les Réservations</h3>
            <p>Voir et gérer toutes les réservations</p>
          </Link>
          <Link to="/admin/manage?tab=guests" className="action-card">
            <div className="action-icon">👤</div>
            <h3>Gérer les Clients</h3>
            <p>Voir et gérer les profils clients</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
