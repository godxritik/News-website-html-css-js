const API_KEY = '643eac18738946469100fff2ab673007';
const url = "https://newsapi.org/v2/everything?q=";
const btn = document.querySelector(".search-btn");
const qry = document.querySelector("#news-inp");

window.addEventListener('load' , () => fetchNews("trending news"));
btn.addEventListener('click' , () => fetchNews(qry.value));

async function fetchNews(query){
   
   const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
   const data = await res.json();
   bindData(data.articles);
    console.log(data.articles);
}

    function bindData(articles){
        
        const cardsContainer = document.getElementById("cards-container");

        const newsTemplate = document.getElementById("template-news-card");

        cardsContainer.innerHTML="";

        articles.forEach((article) => {

            if(!article.urlToImage) return;

            const clone = newsTemplate.content.cloneNode(true);
            fillData(clone , article);
            cardsContainer.appendChild(clone);
            
        });  
 }

 function fillData(clone , article){
    const newsImg = clone.querySelector("#news-img");
    const newstitle = clone.querySelector("#news-title") ; 
    const newsSource = clone.querySelector("#news-source") ; 
    const newsDesc = clone.querySelector("#news-desc") ;

    newsImg.src = article.urlToImage;
    newstitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US" , {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML  = `${article.source.name} -> ${date}`;

    clone.firstElementChild.addEventListener("click" , () => {
        window.open(article.url , "_black");
    });
 }

 function clicked(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
 }