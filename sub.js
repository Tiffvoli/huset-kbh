//subpage event
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log(id)

fetch("http://georgianadancu.com/wordpress/wp-json/wp/v2/movies/"+id)
.then(res=>res.json())
.then (showMovie)


function showMovie(movie){
    console.log(movie)
    document.querySelector(".subpage_title").textContent = movie.title.rendered;

    document.querySelector(".subpage_content").textContent = movie.content.rendered;

    //const img = document.querySelector("img.cover");
    //const imgPath = movie._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url;

}

