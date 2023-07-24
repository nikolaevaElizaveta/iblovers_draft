<script lang="ts">
	import supabase from '$lib/supabase';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { readable } from 'svelte/store';
	import Photo from '$lib/images/NoPhoto.webp';
	import bookPhoto from '$lib/images/teaeven.png';
	import dorianPhoto from '$lib/images/dorian.png';

	let User: { name: string; surname: string; photo_url: string } | null = null;

	// Function to fetch a current session user
	onMount(async () => {
		try {
			const {
				data: { user }
			} = await supabase.auth.getUser();
			// Fetch the user with the curent session user id
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

	// Route to login page
	async function Goto() {
		goto('/login');
	}

	// Function to add posts to blog
	async function addPost(e: Event) {
		// Prevent the form submission from refreshing the page
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		let title = User!.name;
		let surname = User!.surname;
		let photo_url = User!.photo_url;
		const content = formData.get('content') as string;

		if (content.trim() === '') {
			return;
		}

		// Insert post into supabase
		const { data, error } = await supabase.from('posts').insert({
			title,
			surname,
			content,
			photo_url
		});
		// To update blog
		location.reload();
	}

	// Fetch posts from supabase
	const posts = readable<null | any[]>(null, (set) => {
		supabase
			.from('posts')
			.select('*')
			.then(({ data }: { error: any; data: any[] | null }) => set(data));
	});

	// Function to calculate the time difference and return a formatted string - for posts
	function getTimeAgo(timestamp: string): string {
		const currentDate = new Date();
		const postDate = new Date(timestamp);
		const timeDiff = currentDate.getTime() - postDate.getTime();

		const seconds = Math.floor(timeDiff / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);

		if (days > 0) {
			return `${days} day${days === 1 ? '' : 's'} ago`;
		} else if (hours > 0) {
			return `${hours} hour${hours === 1 ? '' : 's'} ago`;
		} else if (minutes > 0) {
			return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
		} else {
			return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
		}
	}

	// Fetch Photo from supabase storage and returning url of photo
	async function fetchPhoto(photoUrl: string): Promise<string | null> {
		try {
			const storage = supabase.storage.from('UserPhotos');
			const response = await storage.download(photoUrl);

			// Check if the response contains data and it's not null
			if (response.data !== null) {
				const fileData = await response.data.arrayBuffer();
				const fileUrl = URL.createObjectURL(new Blob([fileData]));
				return fileUrl;
			} else {
				return null;
			}
		} catch (error) {
			console.error('Error fetching photo from Supabase storage:');
			return null;
		}
	}
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<body>
	<main>
		{#if User}
			<div id="column1">
				{#await fetchPhoto(User.photo_url)}
					<p>Loading photo...</p>
				{:then photoUrl}
					<!-- svelte-ignore a11y-img-redundant-alt -->
					<img src={photoUrl} alt="User Photo" class="UserPhotoLeftColumn" />
				{:catch error}
					<p>Error loading photo</p>
				{/await}
				<p class="PersonalInfo">{User.name} {User.surname}</p>
			</div>
		{:else}
			<div id="column1">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img src={Photo} alt="User Photo" class="UserPhotoLeftColumn" />
				<p class="PersonalInfo">Name Surname</p>
			</div>
		{/if}

		<div id="column2">
			<div class="column2Item">
				{#if User}
					<form on:submit|preventDefault={addPost} class="column2ItemWindow">
						<input placeholder="{User.name} {User.surname}" name="title" readonly />
						<textarea placeholder="Type something" name="content" />
						<button>Post</button>
					</form>
				{:else}
					<form on:submit|preventDefault={Goto} class="column2ItemWindow">
						<input placeholder="Your nickname" name="title" readonly />
						<textarea placeholder="Type something" name="content" readonly />
						<button>Log in/sign up to post</button>
					</form>
				{/if}
			</div>

			<div class="column2Posts">
				{#if $posts !== null}
					{#each $posts as post}
						<div id="Post">
							<div class="PostHeader">
								<!-- svelte-ignore a11y-img-redundant-alt -->
								{#await fetchPhoto(post.photo_url)}
									<img src={Photo} alt="User Photo" class="UserPhoto" />
								{:then photoUrl}
									<img src={photoUrl} alt="User Photo" class="UserPhoto" />
								{:catch error}
									<p>Error loading photo</p>
								{/await}
								<div class="NameHeader">
									<h3 id="NickName">{post.title} {post.surname}</h3>
									<p id="Time">Posted {getTimeAgo(post.created_at)}</p>
								</div>
							</div>
							<p id="ScrollContent">{post.content}</p>
						</div>
					{/each}
				{:else}
					<p>Loading..</p>
				{/if}
			</div>
		</div>

		<div id="column3">
			<div class="column1Item">
				<h1 class="Events">Upcoming events</h1>
				<div class="first">
					<a href="https://t.me/innobooklovers/5" target="_blank"><img src={bookPhoto} alt="there is a book with tea" style="width: 200px; height: 130px;"/></a>
					<div class="bottomtext1">Tea Club collab</div>
				</div>
				<div class="second">
					<a href="https://t.me/innobooklovers/6" target="_blank"><img src={dorianPhoto} alt="there is a photo of Dorian Gray" style="width: 200px; height: 130px;"/></a>
					<div class="bottomtext2">“The Portrait of Dorian Gray” discussion</div>
				</div>
			</div>
		</div>
	</main>
</body>

<style>
	@import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;500&display=swap');
	main {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-around;
		align-items: stretch;
		margin: 0px;
		padding: 0px;
		outline: none;
		height: 100%;
		width: 100%;

		padding-top: 100px;
		padding-bottom: 100px;
	}

	.Events {
		font-family: 'League Spartan', sans-serif;
		font-weight: 500;
		font-size: 24px;
	}

	.first {
		position: relative;
	    	text-align: center;
	}
	.second {
		position: relative;
	    	text-align: center;
	}
	.bottomtext1 {
		font-family: 'League Spartan', sans-serif;
		font-weight: 500;
		font-size: 18px;
		position: absolute;
		bottom: 12px;
		left: 12px;
		color: white;
	}
	.bottomtext2 {
		font-family: 'League Spartan', sans-serif;
		font-weight: 500;
		font-size: 18px;
		position: absolute;
		bottom: 12px;
		left: 10px;
		color: white;
	}
	#column1 {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: stretch;

		font-family: 'League Spartan', sans-serif;
		font-weight: 400;
		width: 182px;
		gap: 20px;
	}
	.PersonalInfo {
		word-wrap: break-word;
		max-width: 182px;
	}

	#column2 {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: stretch;
		gap: 30px;

		font-family: 'League Spartan', sans-serif;
		font-weight: 400;
		width: 525px;
	}

	#column3 {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: stretch;

		font-family: 'League Spartan', sans-serif;
		font-weight: 500;

		width: 186px;
	}
	.column2ItemWindow {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: stretch;
		gap: 10px;

		width: 525px;
		height: auto;
	}
	.column2Item {
		background-color: white;
		border-radius: 20px;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: stretch;
		gap: 10px;
	}
	.column2Posts {
		background-color: white;
		border-radius: 20px;
		display: flex;
		flex-direction: column-reverse;
		flex-wrap: nowrap;
		align-items: center;
		gap: 10px;
		padding-top: 20px;
		padding-bottom: 20px;
	}
	#Post {
		background-color: #f5f5f5;
		width: 462px;
		height: auto;
		border-radius: 20px;
		padding-left: 15px;
	}
	#ScrollContent {
		overflow: auto;
		min-height: 50px;
		max-height: 150px;
		width: 100%;
		padding-bottom: 20px;
		padding-top: 8px;
	}

	.PostHeader {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: left;
		width: 100%;
		height: 50px;
		gap: 8px;
		margin-top: 10px;
	}

	.UserPhoto {
		width: 42px;
		height: 42px;
		border-radius: 50%;
	}

	.UserPhotoLeftColumn {
		width: 182px;
		height: 175px;
		border-radius: 20px;
	}

	.NameHeader {
		display: flex;
		flex-direction: column;
		align-items: left;
		gap: 4px;
	}

	#NickName {
		margin: 0%;

		font-family: 'League Spartan', sans-serif;
		font-weight: 400;
	}

	#Time {
		margin: 0%;

		font-family: 'League Spartan', sans-serif;
		font-weight: 400;
		font-size: 13px;
		color: #a1a1a1;
	}

	textarea {
		max-width: 513px;
		min-width: 513px;
		height: 80px;
		line-height: 1.5;
		border: none;
		outline: none;
		padding-left: 10px;

		font-family: 'League Spartan', sans-serif;
		font-weight: 500;
		font-size: 1rem;
	}

	input {
		max-width: 525px;
		line-height: 2.5;
		border-radius: 20px 20px 0px 0px;
		border-top: none;
		border-left: none;
		border-right: none;
		outline: none;
		padding-left: 10px;

		font-family: 'League Spartan', sans-serif;
		font-weight: 500;
		font-size: 1rem;
	}

	button {
		align-self: flex-end;
		width: auto;
		height: 30px;
		padding: 7px 24px 6px 23px;
		border-radius: 20px;
		background-color: #989872;
		border: none;
		cursor: pointer;
		margin-bottom: 10px;
		margin-right: 10px;

		font-family: 'League Spartan', sans-serif;
		font-size: 18px;
	}

	button:hover {
		background: #bdbd8e;
		transform: scale(1.05, 1.05);

		/* background: rgba(0,0,0,0);
		color: #000000;
		box-shadow: inset 0 0 0 3px #989872; */
	}

	button:active {
		background: #bdbd8e;
	}

	::placeholder {
		font-family: 'League Spartan', sans-serif;
		font-weight: 500;
		font-size: 1rem;
		color: #a1a1a1;
	}
</style>
