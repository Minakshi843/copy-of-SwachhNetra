import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, SafeAreaView, StatusBar } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function Dashboard() {
  const router = useRouter();

  const feederPoints = [
    { name: 'Feeder Point A', latitude: 22.7196, longitude: 75.8577 },
    { name: 'Feeder Point B', latitude: 22.7236, longitude: 75.8600 },
    { name: 'Feeder Point C', latitude: 22.7270, longitude: 75.8630 },
  ];

  const routeCoordinates = feederPoints.map(point => ({
    latitude: point.latitude,
    longitude: point.longitude,
  }));

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      
      {/* Professional Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.profileSection}>
            <View style={styles.profileAvatar}>
              <View style={styles.avatarIcon} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.welcomeText}>Welcome back</Text>
              <Text style={styles.driverTitle}>Driver Dashboard</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationBtn}>
            <View style={styles.bellIcon} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: '#dbeafe' }]}>
              <View style={[styles.iconShape, { backgroundColor: '#3b82f6' }]} />
            </View>
            <Text style={styles.statValue}>Zone A</Text>
            <Text style={styles.statTitle}>Current Zone</Text>
          </View>
          
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: '#dcfce7' }]}>
              <View style={[styles.iconShape, { backgroundColor: '#22c55e' }]} />
            </View>
            <Text style={styles.statValue}>Ward 12</Text>
            <Text style={styles.statTitle}>Active Ward</Text>
          </View>
          
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: '#fef3c7' }]}>
              <View style={[styles.iconShape, { backgroundColor: '#f59e0b' }]} />
            </View>
            <Text style={styles.statValue}>36</Text>
            <Text style={styles.statTitle}>Total Workers</Text>
          </View>
        </View>

        {/* Vehicle Status Card */}
        <View style={styles.vehicleCard}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitle}>
              <View style={styles.vehicleIcon}>
                <View style={styles.truckIcon} />
              </View>
              <View>
                <Text style={styles.cardTitleText}>Vehicle Status</Text>
                <Text style={styles.cardSubtext}>Real-time monitoring</Text>
              </View>
            </View>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>ACTIVE</Text>
            </View>
          </View>
          
          <View style={styles.vehicleDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Vehicle Number</Text>
              <Text style={styles.detailValue}>MP-09-XX-1234</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Assigned Route</Text>
              <Text style={styles.detailValue}>Route 5 – Zone A</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Feeder Points</Text>
              <Text style={styles.detailValue}>{feederPoints.length} Points</Text>
            </View>
          </View>
        </View>

        {/* Map Section */}
        <View style={styles.mapSection}>
          <View style={styles.mapHeader}>
            <Text style={styles.mapTitle}>Live Route Tracking</Text>
            <View style={styles.liveIndicator}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          </View>

          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 22.7220,
                longitude: 75.8600,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              {feederPoints.map((point, index) => (
                <Marker
                  key={index}
                  coordinate={{ latitude: point.latitude, longitude: point.longitude }}
                  title={point.name}
                />
              ))}
              <Polyline
                coordinates={routeCoordinates}
                strokeColor="#3b82f6"
                strokeWidth={4}
              />
            </MapView>
            
            <View style={styles.mapOverlay}>
              <Text style={styles.mapOverlayText}>{feederPoints.length} Stops</Text>
            </View>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push('/feeder-point')}
          activeOpacity={0.9}
        >
          <View style={styles.actionContent}>
            <View style={styles.actionIcon}>
              <View style={styles.locationIcon} />
            </View>
            <View style={styles.actionText}>
              <Text style={styles.actionTitle}>Arrived at Feeder Point</Text>
              <Text style={styles.actionSubtitle}>Tap to record attendance</Text>
            </View>
            <View style={styles.actionArrow}>
              <View style={styles.arrowIcon} />
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

/* 
// COMMENTED OUT - OLD DASHBOARD CODE
const OldDashboard = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      // Floating Header
      <View style={styles.floatingHeader}>
        <View style={styles.headerGradient}>
          <View style={styles.headerContent}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>🚛</Text>
            </View>
            <View style={styles.headerTextContainer}>
              <Text style={styles.greeting}>Good Morning</Text>
              <Text style={styles.driverName}>Driver Dashboard</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Text style={styles.notificationIcon}>🔔</Text>
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        // Quick Stats
        <View style={styles.quickStats}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Text style={styles.statIcon}>📍</Text>
            </View>
            <Text style={styles.statNumber}>Zone A</Text>
            <Text style={styles.statLabel}>Current Zone</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Text style={styles.statIcon}>🏘️</Text>
            </View>
            <Text style={styles.statNumber}>Ward 12</Text>
            <Text style={styles.statLabel}>Active Ward</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Text style={styles.statIcon}>👥</Text>
            </View>
            <Text style={styles.statNumber}>36</Text>
            <Text style={styles.statLabel}>Total Workers</Text>
          </View>
        </View>

        // Vehicle Info Card
        <View style={styles.vehicleCard}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleContainer}>
              <View style={styles.cardIconContainer}>
                <Text style={styles.cardIcon}>🚚</Text>
              </View>
              <View>
                <Text style={styles.cardTitle}>Vehicle Information</Text>
                <Text style={styles.cardSubtitle}>Real-time status</Text>
              </View>
            </View>
            <View style={styles.statusIndicator}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Active</Text>
            </View>
          </View>
          
          <View style={styles.vehicleDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Vehicle Number</Text>
              <Text style={styles.value}>MP-09-XX-1234</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Assigned Route</Text>
              <Text style={styles.value}>Route 5 – Zone A</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Feeder Points Assigned</Text>
              <Text style={styles.value}>{feederPoints.length}</Text>
            </View>
          </View>
        </View>

        // Map Section
        <View style={styles.mapSection}>
          <View style={styles.mapHeader}>
            <Text style={styles.subHeader}>🗺️ Route Map</Text>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          </View>

          <View style={styles.mapWrapper}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 22.7220,
                longitude: 75.8600,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              {feederPoints.map((point, index) => (
                <Marker
                  key={index}
                  coordinate={{ latitude: point.latitude, longitude: point.longitude }}
                  title={point.name}
                />
              ))}
              <Polyline
                coordinates={routeCoordinates}
                strokeColor="#6366f1"
                strokeWidth={4}
              />
            </MapView>
            
            // Map Overlay
            <View style={styles.mapOverlay}>
              <View style={styles.mapStats}>
                <Text style={styles.mapStatsText}>{feederPoints.length} Points</Text>
              </View>
            </View>
          </View>
        </View>

        // Action Button
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push('/feeder-point')}
          activeOpacity={0.8}
        >
          <View style={styles.actionButtonGradient}>
            <View style={styles.actionButtonContent}>
              <View style={styles.actionIconContainer}>
                <Text style={styles.actionIcon}>📍</Text>
              </View>
              <Text style={styles.actionText}>Arrived at Feeder Point</Text>
              <View style={styles.actionArrow}>
                <Text style={styles.arrowIcon}>→</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
*/



const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  header: {
    backgroundColor: '#0f172a',
    paddingTop: StatusBar.currentHeight || 44,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  profileInfo: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '500',
  },
  driverTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 2,
  },
  notificationBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bellIcon: {
    width: 16,
    height: 16,
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
  notificationDot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  statItem: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  iconShape: {
    width: 16,
    height: 16,
    borderRadius: 3,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
    textAlign: 'center',
  },
  vehicleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  vehicleIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#f0fdf4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  truckIcon: {
    width: 20,
    height: 14,
    backgroundColor: '#22c55e',
    borderRadius: 3,
  },
  cardTitleText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  cardSubtext: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22c55e',
    marginRight: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#16a34a',
    letterSpacing: 0.5,
  },
  vehicleDetails: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  mapSection: {
    marginBottom: 24,
  },
  mapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ef4444',
    marginRight: 6,
  },
  liveText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#dc2626',
    letterSpacing: 0.5,
  },
  mapContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 10,
    position: 'relative',
  },
  map: {
    width: width - 40,
    height: 280,
  },
  mapOverlay: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  mapOverlayText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1e293b',
  },
  actionButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 20,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  locationIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  actionSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
    marginTop: 2,
  },
  actionArrow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    width: 8,
    height: 8,
    backgroundColor: '#ffffff',
    transform: [{ rotate: '45deg' }],
  },
});
