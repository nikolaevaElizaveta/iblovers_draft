<script lang="ts">
    import './LizaStyle.css';
    import book_sister_carrie_pic from '$lib/images/book_carry_sister_pic.jpg';
    import book_dorian_gray_pic from '$lib/images/book_dorian_gray_pic.jpg';
    import book_great_gatsby_pic from '$lib/images/book_great_gatsby_pic.jpg';
    import book_shining_pic from '$lib/images/book_shining_pic.png';
    import book_flowers_alg_pic from '$lib/images/book_flowers_alg_pic.png';

    import Card from './Card.svelte';

    const bookData = [
      {
          book_name: "Sister Carrie",
          author: "Theodore Dreiser",
          language: "Russian",
          image_url: book_sister_carrie_pic,
          social_media_url: "https://web.telegram.org/k/#@nhefy",
          id: 1,
          comment:"Bought this book a year ago. It is in a good condition. Liked the plot very much"
      },
      {
          book_name: "The Portrait of Dorian Gray",
          author: "Oscar Wilde",
          language: "Russian",
          image_url: book_dorian_gray_pic,
          social_media_url: "https://web.telegram.org/k/#@nhefy",
          id: 2,
          comment:"Bought this book a year ago. It is in a good condition. Liked the plot very much"
      
      },
      {
          book_name: "The Great Gatsby",
          author: "Francis Scott Fitzgerald",
          language: "Russian",
          image_url: book_great_gatsby_pic,
          social_media_url: "https://web.telegram.org/k/#@nhefy",
          id: 3,
          comment:"Bought this book a year ago. It is in a good condition. Liked the plot very much"
      },
      {
          book_name: "The Shining",
          author: "Stephen King",
          language: "Russian",
          image_url: book_shining_pic,
          social_media_url: "https://web.telegram.org/k/#@nhefy",
          id: 4,
          comment:"Bought this book a year ago. It is in a good condition. Liked the plot very much"
      },
      {
          book_name: "Flowers for Algernon",
          author: "Daniel Keyes",
          language: "Russian",
          image_url: book_flowers_alg_pic,
          social_media_url: "https://web.telegram.org/k/#@nhefy",
          id: 5,
          comment:"Bought this book a year ago. It is in a good condition. Liked the plot very much"
      },
    ];

    function getBooksByRemainder(remainder: number) {
        return bookData.filter((book, i) => i % 3 === remainder);
    }

</script>


<svelte:head>
	<title>Book Crossing</title>
</svelte:head>

<main>
    <div class="transparent_container">
        
        <h1 id="book_crossing_title">BOOK CROSSING</h1>
        
        <div class="transparent_container">
            <p id="book_crossing_text">
                Here you can find some books that people are ready to lend out <span class="highlight">for free</span>. 
                To borrow a book, simply contact its owner via Telegram that is linked to the book profile, 
                If you want to lend your book, you can also post it here, but do not forget to take a picture of it!
            </p>
        </div>

        <div class="transparent_container" id="second_par">
            <p id="book_crossing_text">
                If you want to share your book, please, <a id="contact_us_via_tg" href="https://t.me/innobooklovers">contact us via Telegram</a> and send us information about your book. If it does not violate any university rules, we will post it here.
            </p>
        </div>

    </div>

    <div id="container-wrapper">
        <div id="cards" class="card-container">
            {#each Array.from({ length: 3 }) as _, i}
            <div class="column_Container">
                {#each getBooksByRemainder(i) as book}
                    <a href={`/bookCrossing/books/${book.id}`}>
                        <Card
                            book_name={book.book_name}
                            author={book.author}
                            language={book.language}
                            image_url={book.image_url}
                            social_media_url={book.social_media_url}
                            comment={book.comment}
                        />
                    </a>
                {/each}
            </div>
            {/each}
        </div>
    </div>
    
</main>


