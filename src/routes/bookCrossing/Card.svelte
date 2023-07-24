<script lang="ts">
  export let book_name: string;
  export let author: string;
  export let language: string;
  export let image_url: string;
  export let social_media_url: string;
  export let comment: string;
  let id: number;

</script>
  
<div class="card">
  <img src={image_url} alt="{book_name} Book Cover">
  <div class="card-content">
    <h2>{book_name}</h2>
    <p class="author">Author: {author}</p>
    <p class="language">Language: {language}</p>
    <a href={social_media_url} target="_blank">
      <button class="Liza-contact-button">Contact Owner</button>
    </a>
  </div>
</div>

  
