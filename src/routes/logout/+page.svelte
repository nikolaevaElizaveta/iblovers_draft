<script lang="ts">
	import { onMount } from 'svelte';
	import supabase from '$lib/supabase';
	import { goto } from '$app/navigation';

	// Function to handle logout
	const handleLogout = async () => {
		try {
			const { error } = await supabase.auth.signOut();
			if (error) {
				console.error('Error during logout:', error);
				return;
			}
			// Redirect to the login page after successful logout after 1 sec
			const delayInMilliseconds = 1000;
			setTimeout(() => {
				goto('/login');
			}, delayInMilliseconds);
		} catch (error) {
			console.error('Unhandled error during logout:', error);
		}
	};

	onMount(() => {
		handleLogout();
	});
</script>

<main>
	<h1>Logout</h1>
	<p>You have been successfully logged out.</p>
</main>

<style>
	main {
		text-align: center;
		margin-top: 100px;
	}

	h1 {
		font-size: 24px;
		margin-bottom: 16px;
	}

	p {
		font-size: 18px;
	}
</style>
