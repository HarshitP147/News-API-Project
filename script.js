'use strict'

// import { config } from "dotenv";

// config();

// const api = {
//     "apiKey": 'c69de3c808454aa38f7cb9895f385679',
//     "baseUrl": 'https://newsapi.org/v2/',
//     "sampleUrl": 'https://newsapi.org/v2/top-headlines?apiKey=c69de3c808454aa38f7cb9895f385679&country=in'
// }
// const api = {
//     "apiKey": process.env.VITE_NEWS_API_KEY,
//     'baseUrl': process.env.VITE_NEWS_BASE_URL,
//     'sampleUrl': process.env.VITE_NEWS_SAMPLE_URL
// }
const api = {
    'apiKey': import.meta.env.VITE_NEWS_API_KEY,
    'baseUrl': import.meta.env.VITE_NEWS_BASE_URL,
    'sampleUrl': import.meta.env.VITE_NEWS_SAMPLE_URL
}



// all DOM objects selected here
const btn = document.getElementById("getNews");
let scr = document.querySelector("i");
let mainArea = document.querySelector("div.row");


// function to generate random numbers
let random = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// logic behind the scroll on top button
window.onscroll = (e) => {
    if (window.scrollY < 85) {
        // this is 85 but change it to some other value once the actual news and parameters have been added
        scr.classList.add("d-none");
    }
    else {
        scr.classList.remove("d-none");
        scr.addEventListener("click", () => {
            window.scrollTo(0, 0);
        })
    }
}

// this is the function for adding and creating BootStrap cards
let addCards = function (x) {
    let col = document.createElement("div")
    col.setAttribute("class", "col");

    // adding bootstrap card inside the col element
    let card = document.createElement("div");
    card.classList.add("card", "lh-base", "p-2", "shadow");

    let nImg = document.createElement("img");
    nImg.setAttribute("class", "card-img-top");
    nImg.setAttribute("id", `newsImg${x}`);
    card.appendChild(nImg);

    let title = document.createElement("h5");
    title.classList.add("card-title-1", "pt-1");
    title.setAttribute("id", `nTte${x}`);
    card.appendChild(title);

    let content = document.createElement("p");
    content.classList.add("card-content", 'p-3');
    content.setAttribute("id", `nCont${x}`);
    card.appendChild(content);

    let footer = document.createElement("div");
    footer.classList.add("card-footer", "d-flex");

    // adding card footer elements
    let href = document.createElement("a");
    href.setAttribute("target", "_blank");
    href.classList.add("btn", "btn-primary", "fs-6");
    href.setAttribute("id", `nMore${x}`);
    href.innerText = "Read more..."
    footer.appendChild(href);

    let source = document.createElement("p");
    source.classList.add("card-text", "ms-auto", "mt-1");

    let small = document.createElement("small");
    small.setAttribute("id", `source${x}`)
    small.setAttribute("class", "text-muted");
    source.appendChild(small);

    footer.appendChild(source);

    card.appendChild(footer);

    // putting the card inside the col element
    col.appendChild(card);
    // now adding the full news card col into the main row
    mainArea.appendChild(col);
}

// function to put the news inside the card
let putNews = function (x, news) {
    let title = document.getElementById(`nTte${x}`);
    let readMore = document.getElementById(`nMore${x}`);
    let author = document.getElementById(`source${x}`);

    title.innerText = news['title'];
    readMore.setAttribute('href', news.url);

    // href.setAttribute("src", news['url']);
    author.innerText = new Date(news['publishedAt']).toDateString();

}

// fetching data whenever the dummy button is clicked
btn.addEventListener("click", () => {
    fetch(api['sampleUrl'])
        .then(res => res.json())
        .then(data => {

            /*
            since the number of cards might varry due to different number of articles
            we have to first know the number of articles to be displayed and then make the news cards accordingly
            */

            let articles = data['articles'];  // array of all the articles

            // rendering and selecting news elements
            for (let i = 0; i < articles.length; i++) {
                // looping thru each of the articles and putting them in the news card
                addCards(i);  // appending each of the cards one by one

                let news = articles[i];

                // after adding cards we now put the news inside
                putNews(i, news);


            }

        })
}
)
