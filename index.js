window.addEventListener("DOMContentLoaded", init);


//if else for search and index page
function init(){
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");

    const id = urlParams.get("id");

    if(search){
        console.log("this is a search result")
        getSearchData();
    }else if(id){
        getSingleMovie();
    } else{
        console.log("NOT searching")
        getData();
    }
}


//search
function getSearchData(){
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    //console.log("getData")
    fetch("http://georgianadancu.com/wordpress/wp-json/wp/v2/movies?_embed&search="+search)
    .then(res=>res.json())
    .then(handleData)
}



function getData(){
    //console.log("getData")
    fetch("http://georgianadancu.com/wordpress/wp-json/wp/v2/movies?_embed")
    .then(res=>res.json())
    .then(handleData)
}


//subpage articles
function getSingleMovie(){

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

    document.querySelector(".date").textContent = movie.event_date;

    //const img = document.querySelector("img.cover");
    //const imgPath = movie._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url;

}
}


//main template post
function handleData(myData){
    myData.forEach(showPost)
}
function showPost(post){
    console.log(post)

    const template = document.querySelector(".postTemplate").content;
    const postCopy = template.cloneNode(true);

    const title = postCopy.querySelector(".title");
    title.textContent = post.title.rendered;

    const img = postCopy.querySelector("img.cover");
    const imgPath = post._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url;
    img.setAttribute("src", imgPath)
    img.setAttribute("alt", "Poster for event" + post.title.rendered)

    const a = postCopy.querySelector("a");
    a.href="sub.html?id="+post.id
    //const content = postCopy.querySelector("section");
    //content.innerHTML = post.content.rendered;

    document.querySelector("#posts").appendChild(postCopy)
}
