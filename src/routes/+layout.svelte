<script lang="ts">
	import '../global.css';
	import supabase from '$lib/supabase';
	import logo from '$lib/images/logo.png';
	import telegram from '$lib/images/telegram.png';
	import { onMount } from 'svelte';

	let User: { name: string; surname: string } | null = null;

	// Fetch userdata from supabase auth
	onMount(async () => {
		try {
			const {
				data: { user }
			} = await supabase.auth.getUser();

			// Fetch the current user id
			const { data, error } = await supabase.from('users').select('*').eq('id', user?.id);
			if (error) {
				console.error('Error fetching user data:', error.message);
			} else {
				if (data.length > 0) {
					User = data[0];
				}
			}
		} catch (error) {
			console.error('Error fetching user data');
		}
	});
</script>

<header class="header">
	<base href="/BookClub-app/" />
	<img src={logo} class="logo" alt="The logo" />
	<nav class="nav-links">
		<ul>
			<li><a href="/">Main page</a></li>
			<li><a href="/bookCrossing">Book crossing</a></li>
			<li><a href="/blog">Blog</a></li>
			<li><a href="/events">Events</a></li>
			<li>
				{#if User}
					<a href="/logout"><p style="color:red">Log out</p></a>
				{:else}
					<a href="/login">Log in</a>
				{/if}
			</li>
			<li>
				<a href="https://t.me/innobooklovers">
					<img class="telegram" src={telegram} alt="The telegram channel link" />
				</a>
			</li>
		</ul>
	</nav>
</header>

<slot />

<style>
	header {
		background-color: white;
		background-size: 100%;
		margin-top: 15px;
		margin-left: 30px;
		margin-right: 30px;
		border-radius: 20px;
		border-width: 0px;
		border-color: white;
		padding: 1px;
		display: flex;
		justify-content: space-between;
		z-index: 100;
	}
	nav {
		width: 80%;
		position: sticky;
		margin: 10px auto;
		z-index: 1;
		display: flex;
		margin-right: 0px;
	}
	nav.nav-links {
		width: 80%;
		position: sticky;
		margin: 10px auto;
		z-index: 1;
		display: flex;
		margin-right: 0px;
		justify-content: flex-end;
	}
	.nav-links ul li {
		list-style: none;
		display: inline-block;
		margin: 0 25px;
	}
	.nav-links ul li a {
		color: black;
		text-decoration: none;
		transition: 0.3s;
	}
	.nav-links ul li a:hover {
		color: rgba(115, 116, 74, 1);
	}
	.telegram {
		width: 20px;
		margin-bottom: -5px;
	}
	.logo {
		width: 60px;
		height: 27px;
		margin-left: 25px;
		margin-top: 7px;
		float: left;
	}
</style>
