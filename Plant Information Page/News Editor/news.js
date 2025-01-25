class NewsObject{
    constructor(title,link,author,date,desc,content,country){
        this.id = this.generateId();
        this.title = title;
        this.resource = link;
        this.author = author;
        this.date = date;
        this.description = desc;
        this.content = content;
        this.country = country;
    }

    generateId(){
        var S4 = ()=>{
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
}


let articleArray=JSON.parse(localStorage.getItem('articles'))||[];

const submitBtn = document.querySelector('.submit');
submitBtn.addEventListener('click',()=>{
    let title = document.getElementById('title').value;
    let resource = document.getElementById('resource').value;
    let author = document.getElementById('author').value;
    let date = document.getElementById('date').value;
    let country = document.getElementById('country').value;
    let description = document.getElementById('description').value;
    let content = document.getElementById('content').value;
    let article = new NewsObject(title,resource,author,date,description,content,country);
    articleArray.push(article);
    localStorage.setItem("articles",JSON.stringify(articleArray));
})

console.log(articleArray);