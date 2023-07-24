<script lang="ts">
	import supabase from '$lib/supabase';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import photoIcon from '$lib/images/photoIcon.png';

	// Route to login page
	async function Goto() {
		goto('/login');
	}

	let id = '';
	let photo_url = '';
	let email = '';
	let password = '';
	let name = '';
	let surname = '';

	// Function to handle Sign up form submission
	const handleRegister = async () => {
		try {
			const { data: userInfo, error } = await supabase.auth.signUp({
				email,
				password
			});

			if (error) {
				console.error('Error during registration:', error);
				return;
			}

			if (userInfo && userInfo.user) {
				id = userInfo.user.id;
				// Upload the photo to Supabase storage
				const fileInput = document.getElementById('real-file') as HTMLInputElement;

				if (fileInput.files && fileInput.files.length > 0) {
					const file = fileInput.files[0];
					const { data, error: fileError } = await supabase.storage
						.from('UserPhotos')
						.upload(`user_${id}_${file.name}`, file); // Using a unique filename to avoid collisions

					let PhotoUrl = `user_${id}_${file.name}`;

					if (fileError) {
						console.error('Error uploading photo:', fileError);
						return;
					} else {
						photo_url = PhotoUrl; // Update 'photo_url' with the URL of the uploaded photo

						// Insert data to supabase users table
						const { error: profileError } = await supabase
							.from('users')
							.insert([{ id, email, name, surname, photo_url }]);
						if (profileError) {
							console.error('Error saving user profile:', profileError);
						} else {
							console.log('User registered successfully:', userInfo.user);
							goto('/blog');
						}
					}
				}
			}
		} catch (error) {
			console.error('Unhandled error during registration:');
		}
	};

	// For creating a button with hidden uploading input
	onMount(() => {
		const realFileBtn = document.getElementById('real-file') as HTMLInputElement;
		const customBtn = document.getElementById('custom-button') as HTMLButtonElement;
		const customTxt = document.getElementById('custom-text') as HTMLSpanElement;

		customBtn.addEventListener('click', function () {
			realFileBtn.click();
		});

		realFileBtn.addEventListener('change', function () {
			if (realFileBtn.value) {
				photo_url = realFileBtn.value;
			} else {
				customTxt.innerHTML = 'No photo chose, yet.';
			}
		});
	});
</script>

<main>
	<h1>SIGN UP</h1>
	<form on:submit|preventDefault={handleRegister} class="form1">
		<div class="items1">
			<input type="file" id="real-file" hidden />
			{#if !photo_url}
				<button type="button" id="custom-button">
					<img src={photoIcon} alt="Icon of camera" id="photoIcon" />
					<p id="photoTxt">Add photo</p>
				</button>
			{:else}
				<button type="button" id="custom-button" style="background: #C0D0CA">
					<p
						id="photoTxt"
						style="font-size: 12px; color: black; text-align: center; padding-top: 10%"
					>
						Photo is uploaded successfully
					</p>
				</button>
			{/if}

			<div class="Nickname">
				<input type="text" id="name" placeholder="Name" bind:value={name} />
				<input type="text" id="surname" placeholder="Surname" bind:value={surname} />
			</div>
		</div>

		<div class="items">
			<input type="email" id="email" placeholder="Email" bind:value={email} />
		</div>

		<div class="items">
			<input type="password" id="password" placeholder="Password" bind:value={password} />
		</div>

		<div class="items">
			<button type="submit" id="signup">Sign up</button>
		</div>

		<div class="itemsLast">
			<p id="account">Already have an account?</p>
			<form on:submit|preventDefault={Goto}>
				<button id="goto">Log in</button>
			</form>
		</div>
	</form>
</main>

<style>
	@import './SignupPage.css';
</style>
