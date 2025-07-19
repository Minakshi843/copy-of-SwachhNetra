import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock data for admin dashboard
  const liveVehicles = [
    { id: 1, number: 'MP-09-XX-1234', driver: 'John Doe', zone: 'Zone A', status: 'active', lat: 22.7196, lng: 75.8577 },
    { id: 2, number: 'MP-09-XX-5678', driver: 'Jane Smith', zone: 'Zone B', status: 'active', lat: 22.7236, lng: 75.8600 },
    { id: 3, number: 'MP-09-XX-9012', driver: 'Mike Johnson', zone: 'Zone C', status: 'break', lat: 22.7270, lng: 75.8630 },
  ];

  const alerts = [
    { id: 1, type: 'warning', message: 'Vehicle MP-09-XX-1234 delayed by 15 mins', time: '2 mins ago' },
    { id: 2, type: 'error', message: 'Worker attendance missing in Zone B', time: '5 mins ago' },
    { id: 3, type: 'info', message: 'Route 5 completed successfully', time: '10 mins ago' },
  ];

  const stats = {
    totalVehicles: 12,
    activeVehicles: 8,
    totalWorkers: 156,
    activeWorkers: 142,
    zonesCompleted: 3,
    totalZones: 8,
    efficiency: 89
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={styles.adminAvatar}>
              <View style={styles.adminIcon} />
            </View>
            <View>
              <Text style={styles.welcomeText}>Admin Panel</Text>
              <Text style={styles.adminTitle}>Waste Management Control</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.alertsBtn}>
            <View style={styles.alertIcon} />
            <View style={styles.alertBadge}>
              <Text style={styles.alertCount}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'overview' && styles.activeTab]}
          onPress={() => setSelectedTab('overview')}
        >
          <Text style={[styles.tabText, selectedTab === 'overview' && styles.activeTabText]}>Overview</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'live' && styles.activeTab]}
          onPress={() => setSelectedTab('live')}
        >
          <Text style={[styles.tabText, selectedTab === 'live' && styles.activeTabText]}>Live Tracking</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'alerts' && styles.activeTab]}
          onPress={() => setSelectedTab('alerts')}
        >
          <Text style={[styles.tabText, selectedTab === 'alerts' && styles.activeTabText]}>Alerts</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <View style={styles.statsSection}>
              <Text style={styles.sectionTitle}>System Overview</Text>
              <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                  <View style={[styles.statIcon, { backgroundColor: '#dbeafe' }]}>
                    <View style={[styles.statDot, { backgroundColor: '#3b82f6' }]} />
                  </View>
                  <Text style={styles.statValue}>{stats.activeVehicles}/{stats.totalVehicles}</Text>
                  <Text style={styles.statLabel}>Active Vehicles</Text>
                </View>
                
                <View style={styles.statCard}>
                  <View style={[styles.statIcon, { backgroundColor: '#dcfce7' }]}>
                    <View style={[styles.statDot, { backgroundColor: '#22c55e' }]} />
                  </View>
                  <Text style={styles.statValue}>{stats.activeWorkers}</Text>
                  <Text style={styles.statLabel}>Active Workers</Text>
                </View>
              </View>
              
              <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                  <View style={[styles.statIcon, { backgroundColor: '#fef3c7' }]}>
                    <View style={[styles.statDot, { backgroundColor: '#f59e0b' }]} />
                  </View>
                  <Text style={styles.statValue}>{stats.zonesCompleted}/{stats.totalZones}</Text>
                  <Text style={styles.statLabel}>Zones Complete</Text>
                </View>
                
                <View style={styles.statCard}>
                  <View style={[styles.statIcon, { backgroundColor: '#f3e8ff' }]}>
                    <View style={[styles.statDot, { backgroundColor: '#8b5cf6' }]} />
                  </View>
                  <Text style={styles.statValue}>{stats.efficiency}%</Text>
                  <Text style={styles.statLabel}>Efficiency</Text>
                </View>
              </View>
            </View>

            {/* Performance Chart */}
            <View style={styles.chartSection}>
              <Text style={styles.sectionTitle}>Today's Performance</Text>
              <View style={styles.chartCard}>
                <View style={styles.chartHeader}>
                  <Text style={styles.chartTitle}>Collection Progress</Text>
                  <View style={styles.progressBadge}>
                    <Text style={styles.progressText}>67% Complete</Text>
                  </View>
                </View>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '67%' }]} />
                </View>
                <View style={styles.chartStats}>
                  <View style={styles.chartStat}>
                    <Text style={styles.chartStatValue}>142</Text>
                    <Text style={styles.chartStatLabel}>Workers Active</Text>
                  </View>
                  <View style={styles.chartStat}>
                    <Text style={styles.chartStatValue}>8</Text>
                    <Text style={styles.chartStatLabel}>Vehicles Running</Text>
                  </View>
                  <View style={styles.chartStat}>
                    <Text style={styles.chartStatValue}>3</Text>
                    <Text style={styles.chartStatLabel}>Zones Complete</Text>
                  </View>
                </View>
              </View>
            </View>
          </>
        )}

        {selectedTab === 'live' && (
          <>
            {/* Live Map */}
            <View style={styles.mapSection}>
              <Text style={styles.sectionTitle}>Live Vehicle Tracking</Text>
              <View style={styles.mapCard}>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: 22.7220,
                    longitude: 75.8600,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                  }}
                >
                  {liveVehicles.map((vehicle) => (
                    <Marker
                      key={vehicle.id}
                      coordinate={{ latitude: vehicle.lat, longitude: vehicle.lng }}
                      title={vehicle.number}
                      description={`Driver: ${vehicle.driver} | ${vehicle.zone}`}
                    />
                  ))}
                </MapView>
              </View>
            </View>

            {/* Vehicle List */}
            <View style={styles.vehicleSection}>
              <Text style={styles.sectionTitle}>Vehicle Status</Text>
              {liveVehicles.map((vehicle) => (
                <View key={vehicle.id} style={styles.vehicleCard}>
                  <View style={styles.vehicleHeader}>
                    <View style={styles.vehicleInfo}>
                      <Text style={styles.vehicleNumber}>{vehicle.number}</Text>
                      <Text style={styles.driverName}>{vehicle.driver}</Text>
                    </View>
                    <View style={styles.vehicleStatus}>
                      <View style={[
                        styles.statusDot, 
                        { backgroundColor: vehicle.status === 'active' ? '#22c55e' : '#f59e0b' }
                      ]} />
                      <Text style={styles.statusText}>{vehicle.status.toUpperCase()}</Text>
                    </View>
                  </View>
                  <Text style={styles.vehicleZone}>{vehicle.zone}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {selectedTab === 'alerts' && (
          <View style={styles.alertsSection}>
            <Text style={styles.sectionTitle}>System Alerts</Text>
            {alerts.map((alert) => (
              <View key={alert.id} style={styles.alertCard}>
                <View style={styles.alertHeader}>
                  <View style={[
                    styles.alertTypeIcon,
                    { 
                      backgroundColor: alert.type === 'error' ? '#fef2f2' : 
                                     alert.type === 'warning' ? '#fef3c7' : '#f0f9ff'
                    }
                  ]}>
                    <View style={[
                      styles.alertTypeDot,
                      { 
                        backgroundColor: alert.type === 'error' ? '#ef4444' : 
                                       alert.type === 'warning' ? '#f59e0b' : '#3b82f6'
                      }
                    ]} />
                  </View>
                  <View style={styles.alertContent}>
                    <Text style={styles.alertMessage}>{alert.message}</Text>
                    <Text style={styles.alertTime}>{alert.time}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}


