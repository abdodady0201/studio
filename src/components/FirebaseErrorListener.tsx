'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { useToast } from '@/hooks/use-toast';

export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = errorEmitter.on('permission-error', (error: any) => {
      toast({
        variant: 'destructive',
        title: 'خطأ في الأذونات',
        description: 'ليس لديك الصلاحية الكافية للقيام بهذا الإجراء.',
      });
    });

    return () => unsubscribe();
  }, [toast]);

  return null;
}
