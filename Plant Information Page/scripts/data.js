import { formatDate } from "../../Smaller Projects/Weather/scripts/formatters.js";
const API_KEY = "vCLAp9pWaoATQPJ7PO7iHgzM80N5DHhSQIjb7Fxg";
let dailyNews = [];

// GET DAILY NEWS
async function getNews(articlePerPage) {
    const api_url = `https://api.thenewsapi.com/v1/news/all?api_token=${API_KEY}&language=en&limit=3&page=${articlePerPage}`;

    try {
        let response = await fetch(api_url);
        let newsData = await response.json();
        dailyNews.push(newsData);
        if (articlePerPage === 4) {
            renderNews(dailyNews);
        }
    }
    catch (err) {
        console.log(err);
    }

}

function renderNews(dailyNews) {
    console.log(dailyNews);
    const addDailyNews = document.querySelector('.news');
    addDailyNews.innerHTML = '';
    for (let i = 0; i < dailyNews.length; i++) {
        console.log(i, dailyNews.length);
        dailyNews[i].data.forEach((newsArticle) => {
            addDailyNews.innerHTML += `<div class="article">
                    <img src=${newsArticle.image_url} class="img" alt="">
                    <div class="desc">
                        <h3>${newsArticle.title}</h3>
                        <p class="preview">${newsArticle.description}...</p>
                        <div class="other-details">
                            <span>${newsArticle.published_at.split('T')[0]}</span><span>&bull;</span>
                            <span>Source:<a class="article-link"
                                    href="${newsArticle.url}">
                                    ${newsArticle.source}</a></span>
                        </div>
                    </div>
                </div>`;
        })
    }
}

// getNews(1);
// GET TOP NEWS

(async function getTopNews() {
    const api_url = `https://api.thenewsapi.com/v1/news/top?api_token=${API_KEY}&locale=in&categories=general&limit=3`;

    try {
        let response = await fetch(api_url);
        let topNews = await response.json();

        renderTopNews(topNews);
    }
    catch (err) {
        console.log(err);
    }

})();


function renderTopNews(topNews) {
    const addTopNews = document.querySelector('.top-news');
    addTopNews.innerHTML = '';
    let newsArray = topNews.data;
    for (let i = 0; i < newsArray.length; i++) {
        addTopNews.innerHTML += `<a href="${newsArray[i].url}"><div><img class="news-img"src="${newsArray[i].image_url}">
        <p>${newsArray[i].title}</p></div><hr class="separator"></a>`;
    }
    console.log(topNews.data);
}

(function articlesPerPage() {
    for (let i = 0; i < 4; i++) {
        getNews(i + 1);
    }
})();





