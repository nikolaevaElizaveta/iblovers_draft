<script lang="ts">
	import photo from '$lib/images/mainphoto.jpg';
	import { goto } from '$app/navigation';
	import supabase from '$lib/supabase';
	import { onMount } from 'svelte';

	// Fetch user session
	onMount(async () => {
		try {
			const {
				data: { user }
			} = await supabase.auth.getUser();
			// Fetch the current session user id
			const { data, error } = await supabase.from('users').select('*').eq('id', user?.id);

			if (error) {
				console.error('Error fetching user data:', error.message);
			}
		} catch (error) {
			console.error('Error fetching user data:');
		}
	});

	// Route to login page
	async function Goto() {
		goto('/login');
	}
</script>

<head>
	<title>InnoBookLovers: Main page</title>
</head>

<body>
	<div class="main">
		<div class="imageContainer">
			<img src={photo} class="mainphoto" alt="That's us" />
		</div>

		<div class="textContainer">
			<h1 class="pageName">INNOBOOKLOVERS</h1>

			<div class="whoAreWe">
				<div class="hd2"><h2>Who are we?</h2></div>
				<p>
					We are Innopolis reading club. We share our passion for books and everyone is welcome to
					join us! Our club is a place for students with passion for reading who are looking for
					like-minded people.
				</p>
			</div>

			<div class="whatIsThis">
				<div class="hd2"><h2>What is this?</h2></div>
				<p>
					This is our website! Here you can find all the information about us, our events, read and
					post in our blog, and cross your books with other club members!
				</p>
			</div>

			<div class="container">
				<form on:submit|preventDefault={Goto}>
					<button>Log in</button>
				</form>
			</div>
		</div>
	</div>
</body>

<style>
	@import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;600;800&display=swap');
	body {
		overflow: hidden;
	}

	/*properties for the main page*/
	.mainphoto {
		width: 530px;
		border-radius: 30px;
		margin-left: 30px;
		/* margin-top: 35px; */
		float: left;
		box-shadow: 5px 5px 10px gray;
	}
	.pageName {
		color: rgba(115, 116, 74, 1);
		font-weight: 900px;
		text-align: left;
		margin-left: 40px;
		margin-top: 40px;
		font-size: 60px;
	}
	.whoAreWe {
		margin-top: 70px;
		margin-left: 40px;
		margin-right: 450px;
	}
	.whatIsThis {
		margin-top: 60px;
		margin-left: 440px;
		margin-right: 30px;
	}
	.container {
		position: absolute;
		bottom: 20%;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		justify-content: center;
		align-items: center;
		top: 128%;
	}
	.hd2 {
		padding-bottom: 10px;
		font-weight: 600px;
	}
	.textContainer {
		position: relative;
		margin-left: 560px;
	}

	/*button decoration*/
	button {
		align-items: center;
		list-style: none;
		display: inline-block;
		background: black;
		border-radius: 999px;
		box-sizing: border-box;
		cursor: pointer;
		padding: 15px 40px;
		border: 0;
		transition: 0.3s;
		color: white;
		text-decoration: none;
	}
	button:hover {
		background-color: rgba(115, 116, 74, 1);
	}
</style>
