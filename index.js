window.addEventListener("DOMContentLoaded", getData);


function getData(){
    console.log("getData")
    fetch("http://georgianadancu.com/wordpress/wp-json/wp/v2/movies?_embed")
    .then(res=>res.json())
    .then(handleData)
}
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
