/**
 * Javascript for assignment 1; Dynamic content loading
 * 
 * For clarification and credit, most of this code is taken from the
 * code samples from Lecture 7 - Frontend practice lecture.
 * 
 * @author Jesper Ruud Soløst, Ahmet Soylu
 * @file dynamicContentLoading.js
 */

let limit = 12;
function fetchHomeData() {
    //API Endpoint: https://jsonplaceholder.typicode.com/posts
    //limit = 12;
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Error with the status: " + response.status);
        }
        return response.json();
    })
    .then((posts) => {
        //console.log(posts);

        let container = document.getElementById("main-container");
        container.innerHTML = "";

        let i = 1;
        for (post of posts) {
            if (i <= limit) {
                const article = document.createElement("article");
                const title = document.createElement("h1");
                title.textContent = post.title;
                const body = document.createElement("p");
                body.textContent = post.body;
                article.appendChild(title);
                article.appendChild(body);
                container.appendChild(article);
                if (i % 3 == 0) {
                    const clearfix = document.createElement("div");
                    clearfix.setAttribute("class", "clearfix");
                    container.appendChild(clearfix);
                }
            }
            i++;
        }
    })
}

window.addEventListener('scroll', function() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        limit += 12;
        fetchHomeData();
    }
});

fetchHomeData();
