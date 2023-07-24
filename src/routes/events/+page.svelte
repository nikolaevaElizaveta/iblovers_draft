<script lang="ts">
	import bookPhoto from '$lib/images/teaeven.png';
	import dorianPhoto from '$lib/images/dorian.png';
	import bookPhoto2 from '$lib/images/readeven1.png';
</script>

<head>
	<title>Events</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;500;600;800&family=Montserrat:wght@300&family=Raleway:wght@200;800&display=swap"
		rel="stylesheet"
	/>
</head>
<body>
	<div class="block">
		<div class="main__text">
			<h1 class="main">UPCOMING EVENTS</h1>
			<p class="text_main">
				Our club often makes interesting events, including books discussions, collaborations with
				other clubs, reading evenings, and many others! Here you can find a full list of upcoming
				events and check in if you want to come!
			</p>
		</div>
	</div>
	<div class="events_list">
		<ul class="list">
			<li class="card">
				<div class="img">
					<img src={bookPhoto} alt="there is a book with tea" />
				</div>
				<div class="text">
					<h1 class="name">Tea Club collab</h1>
					<p class="text_card">
						The meeting with the tea club will include discussion of books, of course, drinking tea
						and eating snacks.
						<br />When: July 30, 2023<br />Where: university, green stairs
					</p>
				</div>
			</li>
			<li class="card">
				<div class="img">
					<!-- svelte-ignore a11y-img-redundant-alt -->
					<img src={dorianPhoto} alt="there is a photo of Dorian Gray" />
				</div>
				<div class="text">
					<h1 class="name">“The Portrait of Dorian Gray” discussion</h1>
					<p class="text_card">
						Discussion of Oscar Wilde's great novel "The Portrait of Dorian Gray"
						<br />When: July 26, 2023<br />Where: ArtSpace, room TBA
					</p>
				</div>
			</li>
			<li class="card">
				<div class="img">
					<img src={bookPhoto2} alt="there is a book" />
				</div>
				<div class="text">
					<h1 class="name">Reading evening</h1>
					<p class="text_card">
						A reading evening is a delightful and relaxing activity that brings together individuals
						who share a passion for books and reading. It is an occasion where friends, family
						members, or even strangers gather in a comfortable and inviting setting to indulge in
						the pleasure of reading.
						<br />When: July 23, 2023<br />Where: university, reading hall 3rd floor
					</p>
				</div>
			</li>
		</ul>
	</div>
</body>

<style>
	body {
		width: 100%;
		height: 100vh;
		position: relative;
		background: conic-gradient(
			from 3.1416rad at 30% 43%,
			rgba(160, 172, 168, 1) 10deg,
			rgba(210, 235, 227, 1) 190deg,
			rgba(210, 235, 227, 1) 250deg,
			rgba(243, 209, 197, 1),
			330deg,
			rgba(160, 172, 168, 1)
		);
		background-attachment: fixed;
		overflow: auto;
	}
	.main {
		font-family: 'League Spartan', sans-serif;
		font-size: 48px;
		color: #73744a;
		padding-left: 22px;
	}
	.text_main {
		padding-left: 21px;
		font-family: 'League Spartan', sans-serif;
		font-size: 20px;
		color: black;
		padding-bottom: 35px;
	}
	.block {
		margin-left: 32px;
		margin-top: 26px;
		margin-right: 32px;
	}
	.card {
		background-color: white;
		border-radius: 20px;
		margin-right: 32px;
		margin-left: 32px;
		display: flex;
		margin-bottom: 20px;
	}
	.img {
		padding: 19px 19px 19px 19px;
	}
	.name {
		font-family: 'League Spartan', sans-serif;
		font-size: 32px;
		font-weight: 500;
		padding-top: 19px;
	}
	.text {
		font-family: 'League Spartan', sans-serif;
		font-size: 20px;
		padding-right: 20px;
	}
</style>
