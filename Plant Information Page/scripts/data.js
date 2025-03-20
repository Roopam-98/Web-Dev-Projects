import { formatDate } from "../../Smaller Projects/Weather/scripts/formatters.js";
const API_KEY = "vCLAp9pWaoATQPJ7PO7iHgzM80N5DHhSQIjb7Fxg";
let dailyNews = [];

// GET DAILY NEWS
export async function getNews(articlePerPage, locale, lang) {
    const api_url = `https://api.thenewsapi.com/v1/news/all?api_token=${API_KEY}&locale=${locale}&language=${lang}&limit=3&page=${articlePerPage}`;

    fetch(api_url).then((response) => {
        response.json().then((newsData) => {
            dailyNews.push(newsData);
            console.log(dailyNews.length);
            if (articlePerPage === 4) {
                renderNews(dailyNews);
            }
        }).catch(err => {
            console.log(err);
        })
    })

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

    dailyNews = [];
}

// getNews(1);
// GET TOP NEWS

export async function getTopNews(locale, lang) {
    const api_url = `https://api.thenewsapi.com/v1/news/top?api_token=${API_KEY}&locale=${locale}&language=${lang}&limit=3`;

    try {
        let response = await fetch(api_url);
        let topNews = await response.json();

        renderTopNews(topNews);
    }
    catch (err) {
        console.log(err);
    }

};


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
        getNews(i + 1, "us", "en");
    }
})();

getTopNews('us', 'en');






