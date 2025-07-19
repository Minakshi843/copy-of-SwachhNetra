import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');

export default function FeederPointAttendance() {
  const [workerPhoto, setWorkerPhoto] = useState(null);
  const [wastePhoto, setWastePhoto] = useState(null);
  const [scalePhoto, setScalePhoto] = useState(null);
  const [wasteData, setWasteData] = useState({
    totalWaste: '',
    dry: '',
    wet: '',
    mixed: '',
    hazardous: '',
    sanitary: '',
  });
  const [detectedWorker, setDetectedWorker] = useState(null);
  const [reasonAbsent, setReasonAbsent] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [isAbsentMode, setIsAbsentMode] = useState(false);
  const [isRelieverMode, setIsRelieverMode] = useState(false);
  const [submissionLogs, setSubmissionLogs] = useState([]);

  const [relieverType, setRelieverType] = useState('');
  const [relieverName, setRelieverName] = useState('');
  const [relieverId, setRelieverId] = useState('');
  const [relieverPhoto, setRelieverPhoto] = useState(null);

  const mockWorkerDatabase = {
    worker123: {
      id: 'EMP001',
      name: 'Ramesh Kumar',
      feederPoint: 'Feeder Point A',
    },
  };

  const takePhoto = async (type) => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Camera access is required');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });

      if (result.canceled || !result.assets?.[0]?.uri) return;

      const uri = result.assets[0].uri;

      if (type === 'worker') {
        setWorkerPhoto(uri);
        setDetectedWorker(mockWorkerDatabase['worker123']);
      } else if (type === 'waste') {
        setWastePhoto(uri);
      } else if (type === 'scale') {
        setScalePhoto(uri);
      } else if (type === 'reliever') {
        setRelieverPhoto(uri);
      }
    } catch (error) {
      console.error('Camera Error:', error);
      Alert.alert('Camera Error', 'Something went wrong. Please try again.');
    }
  };

  const submitAttendance = () => {
    if (!workerPhoto || !detectedWorker) {
      Alert.alert('Missing Data', 'Please capture the worker photo first.');
      return;
    }

    if (!wastePhoto || !scalePhoto || !wasteData.totalWaste) {
      Alert.alert('Incomplete Info', 'Please complete all details.');
      return;
    }

    const time = new Date().toLocaleTimeString();
    const name = detectedWorker?.name || 'Unknown';
    setSubmissionLogs((prev) => [...prev, { name, status: 'Present', time }]);

    Alert.alert('Attendance Submitted');

    setWorkerPhoto(null);
    setDetectedWorker(null);
    setWastePhoto(null);
    setScalePhoto(null);
    setWasteData({
      totalWaste: '',
      dry: '',
      wet: '',
      mixed: '',
      hazardous: '',
      sanitary: '',
    });
  };

  const submitAbsent = () => {
    if (!reasonAbsent) {
      Alert.alert('Select a reason');
      return;
    }

    const time = new Date().toLocaleTimeString();
    const name = detectedWorker?.name || 'Unknown';
    setSubmissionLogs((prev) => [...prev, { name, status: 'Absent', time }]);

    Alert.alert('Marked Absent');
    setReasonAbsent('');
    setOtherReason('');
    setIsAbsentMode(false);
  };

  const submitReliever = () => {
    if (!relieverType || !relieverName || !relieverId || !relieverPhoto) {
      Alert.alert('Missing Info', 'Please complete all reliever details.');
      return;
    }

    const time = new Date().toLocaleTimeString();
    setSubmissionLogs((prev) => [
      ...prev,
      {
        name: `${relieverName} (Reliever)`,
        status: 'Reliever Attendance',
        time,
      },
    ]);

    Alert.alert('Reliever Attendance Submitted');

    setRelieverType('');
    setRelieverName('');
    setRelieverId('');
    setRelieverPhoto(null);
    setIsRelieverMode(false);
  };

  const renderWasteTypeInput = (type) => (
    <View key={type} style={styles.wasteInputContainer}>
      <TextInput
        placeholder={`${type.charAt(0).toUpperCase() + type.slice(1)} Waste (kg)`}
        placeholderTextColor="#64748b"
        style={styles.wasteInput}
        keyboardType="numeric"
        value={wasteData[type]}
        onChangeText={(v) => setWasteData({ ...wasteData, [type]: v })}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1e293b" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerIcon}>
            <View style={styles.headerIconInner} />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Feeder Point</Text>
            <Text style={styles.subtitle}>Attendance Management</Text>
          </View>
          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Live</Text>
          </View>
        </View>
      </View>

      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {!isAbsentMode && !isRelieverMode && (
          <>
            {/* Worker Photo Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Worker Identification</Text>
                <Text style={styles.sectionSubtitle}>Capture worker photo for verification</Text>
              </View>
              
              <View style={styles.photoRow}>
                <TouchableOpacity onPress={() => takePhoto('worker')} style={styles.photoCard}>
                  {workerPhoto ? (
                    <View style={styles.imagePreview}>
                      <Image source={{ uri: workerPhoto }} style={styles.previewImage} />
                      <View style={styles.imageLabel}>
                        <Text style={styles.imageLabelText}>Worker</Text>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.addPhotoContent}>
                      <View style={styles.addPhotoIcon}>
                        <View style={styles.plusHorizontal} />
                        <View style={styles.plusVertical} />
                      </View>
                      <Text style={styles.addPhotoText}>Add Photo</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>

              {detectedWorker && (
                <View style={styles.workerCard}>
                  <View style={styles.workerCardHeader}>
                    <View style={styles.workerAvatar}>
                      <View style={styles.userIcon} />
                    </View>
                    <View style={styles.workerInfo}>
                      <Text style={styles.workerName}>{detectedWorker.name}</Text>
                      <Text style={styles.workerId}>ID: {detectedWorker.id}</Text>
                    </View>
                    <View style={styles.verifiedBadge}>
                      <Text style={styles.verifiedText}>Verified</Text>
                    </View>
                  </View>
                  <View style={styles.workerDetails}>
                    <Text style={styles.workerLocation}>Location: {detectedWorker.feederPoint}</Text>
                  </View>
                </View>
              )}
            </View>

            {/* Alternative Actions - Only show if NO worker detected */}
            {!detectedWorker && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Alternative Actions</Text>
                  <Text style={styles.sectionSubtitle}>If worker is not present or needs replacement</Text>
                </View>
                
                <View style={styles.alternativeActions}>
                  <TouchableOpacity onPress={() => setIsAbsentMode(true)} style={styles.absentButton}>
                    <Text style={styles.actionButtonText}>Mark Absent</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => setIsRelieverMode(true)} style={styles.relieverButton}>
                    <Text style={styles.actionButtonText}>Reliever Attendance</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {detectedWorker && (
              <>
                {/* Waste Data Section */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Waste Collection Data</Text>
                    <Text style={styles.sectionSubtitle}>Record waste collection details</Text>
                  </View>
                  
                  <View style={styles.totalWasteContainer}>
                    <TextInput
                      placeholder="Total Waste Generated (kg)"
                      placeholderTextColor="#64748b"
                      style={styles.totalWasteInput}
                      keyboardType="numeric"
                      value={wasteData.totalWaste}
                      onChangeText={(v) => setWasteData({ ...wasteData, totalWaste: v })}
                    />
                  </View>

                  <View style={styles.photoGrid}>
                    <TouchableOpacity onPress={() => takePhoto('waste')} style={styles.photoCard}>
                      {wastePhoto ? (
                        <View style={styles.imagePreview}>
                          <Image source={{ uri: wastePhoto }} style={styles.previewImage} />
                          <View style={styles.imageLabel}>
                            <Text style={styles.imageLabelText}>Waste</Text>
                          </View>
                        </View>
                      ) : (
                        <View style={styles.addPhotoContent}>
                          <View style={styles.addPhotoIcon}>
                            <View style={styles.plusHorizontal} />
                            <View style={styles.plusVertical} />
                          </View>
                          <Text style={styles.addPhotoText}>Waste Photo</Text>
                        </View>
                      )}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => takePhoto('scale')} style={styles.photoCard}>
                      {scalePhoto ? (
                        <View style={styles.imagePreview}>
                          <Image source={{ uri: scalePhoto }} style={styles.previewImage} />
                          <View style={styles.imageLabel}>
                            <Text style={styles.imageLabelText}>Scale</Text>
                          </View>
                        </View>
                      ) : (
                        <View style={styles.addPhotoContent}>
                          <View style={styles.addPhotoIcon}>
                            <View style={styles.plusHorizontal} />
                            <View style={styles.plusVertical} />
                          </View>
                          <Text style={styles.addPhotoText}>Scale Photo</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  </View>

                  <View style={styles.wasteBreakdown}>
                    <Text style={styles.breakdownTitle}>Waste Type Breakdown</Text>
                    <View style={styles.wasteInputsGrid}>
                      {['dry', 'wet', 'mixed', 'hazardous', 'sanitary'].map(renderWasteTypeInput)}
                    </View>
                  </View>

                  <View style={styles.actionButtons}>
                    <TouchableOpacity onPress={submitAttendance} style={styles.submitButton}>
                      <Text style={styles.submitButtonText}>Submit Attendance</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </>
        )}

        {isAbsentMode && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Mark Absence</Text>
              <Text style={styles.sectionSubtitle}>Select reason for worker absence</Text>
            </View>
            
            <Text style={styles.reasonTitle}>Absence Reason</Text>
            <View style={styles.reasonOptions}>
              {['Not Available', 'On Leave', 'Medical Emergency'].map((reason) => (
                <TouchableOpacity
                  key={reason}
                  onPress={() => setReasonAbsent(reason)}
                  style={[styles.reasonOption, reasonAbsent === reason && styles.reasonSelected]}
                >
                  <View style={styles.reasonOptionContent}>
                    <View style={[styles.radioButton, reasonAbsent === reason && styles.radioSelected]}>
                      {reasonAbsent === reason && <View style={styles.radioInner} />}
                    </View>
                    <Text style={[styles.reasonText, reasonAbsent === reason && styles.reasonSelectedText]}>
                      {reason}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Additional notes (Optional)"
                placeholderTextColor="#64748b"
                style={styles.input}
                value={otherReason}
                onChangeText={setOtherReason}
                multiline
              />
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={submitAbsent} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit Absence</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setIsAbsentMode(false)} style={styles.backButton}>
                <Text style={styles.backButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {isRelieverMode && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Reliever Attendance</Text>
              <Text style={styles.sectionSubtitle}>Record reliever worker details</Text>
            </View>
            
            <Text style={styles.reasonTitle}>Reliever Type</Text>
            <View style={styles.reasonOptions}>
              {['Registered', 'Unregistered'].map((type) => (
                <TouchableOpacity
                  key={type}
                  onPress={() => setRelieverType(type)}
                  style={[styles.reasonOption, relieverType === type && styles.reasonSelected]}
                >
                  <View style={styles.reasonOptionContent}>
                    <View style={[styles.radioButton, relieverType === type && styles.radioSelected]}>
                      {relieverType === type && <View style={styles.radioInner} />}
                    </View>
                    <Text style={[styles.reasonText, relieverType === type && styles.reasonSelectedText]}>
                      {type}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.relieverInputs}>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Reliever Name"
                  placeholderTextColor="#64748b"
                  style={styles.input}
                  value={relieverName}
                  onChangeText={setRelieverName}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Reliever ID"
                  placeholderTextColor="#64748b"
                  style={styles.input}
                  value={relieverId}
                  onChangeText={setRelieverId}
                />
              </View>
            </View>

            <TouchableOpacity onPress={() => takePhoto('reliever')} style={styles.secondaryButton}>
              <View style={styles.secondaryButtonContent}>
                <Text style={styles.secondaryButtonText}>Capture Reliever Photo</Text>
              </View>
            </TouchableOpacity>

            {relieverPhoto && (
              <View style={styles.imageContainer}>
                <Image source={{ uri: relieverPhoto }} style={styles.image} />
                <View style={styles.imageOverlay}>
                  <Text style={styles.imageLabel}>Reliever Photo</Text>
                </View>
              </View>
            )}

            <View style={styles.wasteBreakdown}>
              <Text style={styles.breakdownTitle}>Waste Type Breakdown</Text>
              <View style={styles.wasteInputsGrid}>
                {['dry', 'wet', 'mixed', 'hazardous', 'sanitary'].map(renderWasteTypeInput)}
              </View>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={submitReliever} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit Reliever</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setIsRelieverMode(false)} style={styles.backButton}>
                <Text style={styles.backButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Submission Logs */}
        {submissionLogs.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Today's Submissions</Text>
              <Text style={styles.sectionSubtitle}>Recent attendance records</Text>
            </View>
            
            <View style={styles.logsContainer}>
              {submissionLogs.map((log, index) => (
                <View key={index} style={styles.logCard}>
                  <View style={styles.logHeader}>
                    <View style={styles.logAvatar}>
                      <View style={styles.logAvatarIcon} />
                    </View>
                    <View style={styles.logInfo}>
                      <Text style={styles.logName}>{log.name}</Text>
                      <Text style={styles.logTime}>{log.time}</Text>
                    </View>
                    <View style={[styles.logStatus, log.status === 'Present' ? styles.logPresent : styles.logAbsent]}>
                      <Text style={styles.logStatusText}>{log.status}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1e293b',
  },
  header: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  headerIconInner: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#3b82f6',
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '500',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22c55e',
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#22c55e',
  },
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  scrollContent: {
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  sectionHeader: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  photoButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  photoButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  photoIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  plusIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  plusHorizontal: {
    width: 24,
    height: 2,
    backgroundColor: '#ffffff',
  },
  plusVertical: {
    width: 2,
    height: 24,
    backgroundColor: '#ffffff',
  },
  photoButtonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  photoButtonArrow: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  imageLabel: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  smallImageContainer: {
    position: 'relative',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  smallImage: {
    width: 100,
    height: 100,
  },
  smallImageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  smallImageLabel: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  workerCard: {
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  workerCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  workerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  userIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
  workerInfo: {
    flex: 1,
  },
  workerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 2,
  },
  workerId: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
  },
  verifiedBadge: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  verifiedText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#ffffff',
  },
  workerDetails: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#bbf7d0',
  },
  workerLocation: {
    fontSize: 13,
    color: '#16a34a',
    fontWeight: '500',
  },
  totalWasteContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  totalWasteInput: {
    paddingVertical: 16,
    fontSize: 16,
    color: '#0f172a',
    fontWeight: '500',
  },
  secondaryButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  secondaryButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },
  wasteBreakdown: {
    marginBottom: 16,
  },
  breakdownTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  wasteInputsGrid: {
    gap: 10,
  },
  wasteInputContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  wasteInput: {
    paddingVertical: 14,
    fontSize: 15,
    color: '#0f172a',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#22c55e',
    borderRadius: 12,
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  actionButtons: {
    gap: 12,
  },
  absentButton: {
    backgroundColor: '#f59e0b',
    borderRadius: 12,
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  relieverButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  actionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },
  reasonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  reasonOptions: {
    gap: 10,
    marginBottom: 16,
  },
  reasonOption: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  reasonSelected: {
    backgroundColor: '#dbeafe',
    borderColor: '#3b82f6',
  },
  reasonOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  radioButton: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioSelected: {
    borderColor: '#3b82f6',
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3b82f6',
  },
  reasonText: {
    fontSize: 15,
    color: '#374151',
    fontWeight: '500',
  },
  reasonSelectedText: {
    color: '#1e40af',
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#0f172a',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  backButton: {
    flex: 1,
    backgroundColor: '#6b7280',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },
  relieverInputs: {
    marginBottom: 16,
  },
  logsContainer: {
    gap: 10,
  },
  logCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  logHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ddd6fe',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logAvatarIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#8b5cf6',
  },
  logInfo: {
    flex: 1,
  },
  logName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 2,
  },
  logTime: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  logStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  logPresent: {
    backgroundColor: '#dcfce7',
  },
  logAbsent: {
    backgroundColor: '#fef2f2',
  },
  logStatusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#374151',
  },
  photoRow: {
    marginBottom: 20,
  },
  photoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  photoCard: {
    flex: 1,
    height: 120,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imageLabel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  imageLabelText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  addPhotoContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  addPhotoIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  plusHorizontal: {
    position: 'absolute',
    width: 16,
    height: 2,
    backgroundColor: '#64748b',
    borderRadius: 1,
  },
  plusVertical: {
    position: 'absolute',
    width: 2,
    height: 16,
    backgroundColor: '#64748b',
    borderRadius: 1,
  },
  addPhotoText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    textAlign: 'center',
  },
  actionButtons: {
    marginTop: 24,
  },
  submitButton: {
    backgroundColor: '#22c55e',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryActions: {
    flexDirection: 'row',
    gap: 12,
  },
  absentButton: {
    flex: 1,
    backgroundColor: '#f59e0b',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  relieverButton: {
    flex: 1,
    backgroundColor: '#8b5cf6',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});
