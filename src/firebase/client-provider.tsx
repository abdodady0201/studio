
'use client';

import React, { useMemo } from 'react';
import { initializeFirebase } from './index';
import { FirebaseProvider } from './provider';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';

/**
 * Client-side provider that initializes Firebase and handles error listeners.
 * Moving initialization here prevents Server Components from attempting to 
 * execute client-side Firebase logic.
 */
export function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Memoize services so they are initialized once per client mount
  // This is safe because it only runs in the browser ('use client')
  const services = useMemo(() => initializeFirebase(), []);

  return (
    <FirebaseProvider 
      firebaseApp={services.firebaseApp} 
      firestore={services.firestore} 
      auth={services.auth}
    >
      <FirebaseErrorListener />
      {children}
    </FirebaseProvider>
  );
}
