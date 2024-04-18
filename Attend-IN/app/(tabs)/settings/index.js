import React, { useEffect, useState } from 'react';
import { Stack, Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, Button } from 'react-native';
import { supabase } from '../../lib/supabase';

export default function SettingsPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  console.log(user);

  async function doLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert(error);
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: 'Settings' }} />
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Settings Tab</Text>
          <Link href={'/settings/ACCOUNT'} style={styles.link}>
            <Text style={styles.linkText}>Go to Account Settings</Text>
          </Link>
          <Link href={'/settings/resetPassword'} style={styles.link}>
            <Text style={styles.linkText}>Update Password</Text>
          </Link>
          <Button title="Logout" onPress={() => doLogout()} />
        </View>
        <StatusBar style="auto" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1044a9', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  link: {
    marginBottom: 10,
  },
  linkText: {
    fontSize: 16,
    color: '#007bff',
  },
});
