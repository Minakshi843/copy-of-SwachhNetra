import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [empIdOrEmail, setEmpIdOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const isEmail = (text: string) => /\S+@\S+\.\S+/.test(text);

  const handleLogin = () => {
    if (empIdOrEmail.trim() === '' || password.trim() === '') {
      Alert.alert('Missing Info', 'Please enter both Employee ID / Email and Password');
      return;
    }

    if (!/^\d+$/.test(empIdOrEmail) && !isEmail(empIdOrEmail)) {
      Alert.alert('Invalid Input', 'Enter a valid Employee ID (numbers only) or Email');
      return;
    }

    Alert.alert('Login Successful', `Welcome, ${empIdOrEmail}`);
    router.replace('/dashboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Animated Background */}
      <View style={styles.backgroundContainer}>
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />
        <View style={[styles.circle, styles.circle3]} />
      </View>
      
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logoIconContainer}>
            <Text style={styles.logoIcon}>🚛</Text>
          </View>
          <Text style={styles.logoText}>WasteCollect</Text>
        </View>
        <Text style={styles.subtitle}>Smart Waste Management System</Text>
      </View>

      {/* Login Card */}
      <View style={styles.loginCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.description}>Sign in to continue to your dashboard</Text>
        </View>
        
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <View style={styles.inputIconContainer}>
              <Text style={styles.inputIcon}>👤</Text>
            </View>
            <TextInput
              placeholder="Employee ID or Email"
              placeholderTextColor="#9ca3af"
              value={empIdOrEmail}
              onChangeText={setEmpIdOrEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
          <View style={styles.inputWrapper}>
            <View style={styles.inputIconContainer}>
              <Text style={styles.inputIcon}>🔒</Text>
            </View>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#9ca3af"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Sign In</Text>
          <View style={styles.loginButtonIconContainer}>
            <Text style={styles.loginButtonIcon}>→</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerDots}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
        <Text style={styles.footerText}>Secure • Reliable • Efficient</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  backgroundContainer: {
    position: 'absolute',
    width: width,
    height: height,
    overflow: 'hidden',
  },
  circle: {
    position: 'absolute',
    borderRadius: 1000,
    opacity: 0.1,
  },
  circle1: {
    width: 300,
    height: 300,
    backgroundColor: '#22c55e',
    top: -150,
    right: -150,
  },
  circle2: {
    width: 200,
    height: 200,
    backgroundColor: '#3b82f6',
    bottom: 100,
    left: -100,
  },
  circle3: {
    width: 150,
    height: 150,
    backgroundColor: '#f59e0b',
    top: height * 0.3,
    right: 50,
  },
  header: {
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 60,
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logoIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.2)',
  },
  logoIcon: {
    fontSize: 36,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: -1,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#9ca3af',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 24,
  },
  loginCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    marginHorizontal: 20,
    borderRadius: 32,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 30,
    },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  inputContainer: {
    marginBottom: 32,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  inputIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  inputIcon: {
    fontSize: 18,
  },
  input: {
    flex: 1,
    paddingVertical: 20,
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#22c55e',
    borderRadius: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#22c55e',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
    marginBottom: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginRight: 12,
  },
  loginButtonIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonIcon: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  forgotPassword: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  forgotPasswordText: {
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
  },
  footerDots: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(156, 163, 175, 0.3)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#22c55e',
    width: 24,
  },
  footerText: {
    color: '#9ca3af',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});
