window.addEventListener("DOMContentLoaded", init);


//if else for search and index page
function init(){
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");

    const id = urlParams.get("id");
    const category = urlParams.get("category");

    if(search){ //if search has a value
        console.log("this is a search result")
        getSearchData();
    }else if(id){ //if id has a value
        getSingleMovie();
    }else if(category){
        //category
        getCategoryData(category)
    } else{ //if neither is true, load this
        console.log("NOT searching")
        getData();
    }
    getNavigation()
}


//get categories for navigation
function getNavigation(){
    fetch("http://georgianadancu.com/wordpress/wp-json/wp/v2/categories?per_page=100")
    .then(res=>res.json())
    .then(data=> {
    //console.log(data)
    data.forEach(addLink)
    })
}


//categories function
function addLink(oneItem){
    //console.log(oneItem.name)

    if(oneItem.parent === 18 && oneItem.count > 0){
    const link = document.createElement("a");
    link.textContent = oneItem.name;
    link.setAttribute("href", "category.html?category="+oneItem.id)
    document.querySelector("nav").appendChild(link);
}
}


//search function
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

function getCategoryData(catId){
    console.log(catId)
    fetch("http://georgianadancu.com/wordpress/wp-json/wp/v2/movies?_embed&categories="+catId)
    .then(res=>res.json())
    .then(handleData)
}

//subpage articles
function getSingleMovie(){

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
//console.log(id)

fetch("http://georgianadancu.com/wordpress/wp-json/wp/v2/movies/"+id)
.then(res=>res.json())
.then (showMovie)


function showMovie(movie){
   // console.log(movie)
    document.querySelector(".subpage_title").textContent = movie.title.rendered;

    document.querySelector(".subpage_content").innerHTML = movie.content.rendered;

    document.querySelector(".subpage_date").textContent = movie.event_date;

    document.querySelector(".subpage_time").textContent = movie.movie_time+"p.m";

    document.querySelector(".subpage_price").textContent = movie.ticket_price+"kr";

    document.querySelector(".subpage_location").textContent = movie.location;

    const img = document.querySelector("img.subpage_cover");
    const imgPath = movie._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url;

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

    const date = postCopy.querySelector(".date");
    date.textContent = post.event_date;

    const time = postCopy.querySelector(".time");
    time.textContent = post.movie_time+"p.m";

    const price = postCopy.querySelector(".price");
    price.textContent = post.ticket_price+"kr";

    const location = postCopy.querySelector(".location");
    location.innerHTML = post.location;

    const img = postCopy.querySelector("img.cover");
    const imgPath = post._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url;
    img.setAttribute("src", imgPath)
    img.setAttribute("alt", "Poster for event" + post.title.rendered)

    const a = postCopy.querySelector("a");
    a.href="sub.html?id="+post.id


    document.querySelector("#posts").appendChild(postCopy)
}
