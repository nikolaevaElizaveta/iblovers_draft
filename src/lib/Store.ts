import type { User } from '@supabase/supabase-js';
import { writable } from 'svelte/store';

// Create a writable session store to hold the user data
export const userStore = writable<User | null>(null);
