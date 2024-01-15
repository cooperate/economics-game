'use client';

import { supabaseBrowserClient } from '@/utils/supabase/browser-client';
import { Session } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

const useSupabaseSession = () => {
    const supabase = supabaseBrowserClient();
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                setSession(session);
            } catch (error) {
                console.error('Error fetching session:', error);
            }
        };

        fetchSession();

        // Optionally, set up a listener for session changes
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => {
            listener?.subscription.unsubscribe();
        };
    }, []);

    return session;
};

export default useSupabaseSession;
