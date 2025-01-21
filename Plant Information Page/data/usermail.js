class User{
    constructor(email){
        this.id = this.generateId();
        this.mail = email;
        [this.usrName, this.emailType] = this.setUsrName(this.mail);
        // console.log(this.usrName, this.emailType);
    }

    generateId(){
        var S4 = ()=>{
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    setUsrName(email){
        email = email.split('@');
        return [email[0], email[1]];
    }
}

let usrArray = JSON.parse(localStorage.getItem('usrdata')) || [];

const subscribeBtn = document.querySelector('.sub-submit');
subscribeBtn.addEventListener('click',()=>{
    let inputStr = document.querySelector('.email').value;
    let usr = new User(inputStr);
    usrArray.push(usr);
    localStorage.setItem('usrdata',JSON.stringify(usrArray));
    document.querySelector('.email').value = '';
})

console.log(usrArray);