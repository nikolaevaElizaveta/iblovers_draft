<script lang="ts">
  
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
  
    import book_sister_carrie_pic from '$lib/images/book_carry_sister_pic.jpg';
    import book_dorian_gray_pic from '$lib/images/book_dorian_gray_pic.jpg';
    import book_great_gatsby_pic from '$lib/images/book_great_gatsby_pic.jpg';
    import book_shining_pic from '$lib/images/book_shining_pic.png';
    import book_flowers_alg_pic from '$lib/images/book_flowers_alg_pic.png';
  
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
  
    interface Book {
      id: number; 
      book_name: string;
      author: string;
      language: string;
      image_url: string;
      social_media_url: string;
      comment: string;
    }
  
    let book: Book | null;
  
    onMount(() => {
  
      const id = parseInt($page.params.id);
      book = bookData.find((b) => b.id === id) || null;
      if (!book) {
        goto("/"); // Redirect to homepage
        // or
        // goto("/404"); // Redirect to a custom 404 page
      }
    });
  </script>
    
  <main>
    <div class="transparent_container">
        
        <h1 id="book_crossing_title">BOOK CROSSING</h1>
        
    </div>
    <div class="transparent_container">
        <a href='\bookCrossing' class='Liza-button-separate-page'>← Back to catalog</a>
    </div>

    <div class="Liza-card-separate-page">

        {#if book}
            <div class="card-on-separate-page">
                <img class='Liza-separate-page-img' src={book.image_url} alt="{book.book_name} Book Cover">
                
                <div class='text-container-on-separate-page'>
                
                    <h1 class='book-name-on-separate-page'>{book.book_name}</h1>
                    <p class='author-on-separate-page'>Author: <span class="highlight-on-separate-page">{book.author}</span></p>
                    <p class='language-on-separate-page'>Language: <span class='highlight-lang-on-separate-page'>{book.language}</span></p>

                    <p class='author-on-separate-page'>Comments by the owner:</p>
                    <p class='comment-about-book'>
                        {#if book.comment}
                            {book.comment}
                        {:else}
                            No comments about book.
                        {/if}
                        
                    </p>

                    
                    <a href={book.social_media_url} target="_blank">
                        <button class='button-on-separate-page'>Contact Owner</button>
                    </a>
                    
                </div>
            </div>
        {:else}
        <p>Book not found</p>
        {/if}

    </div>  
  </main>
    
