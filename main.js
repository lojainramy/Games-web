const rowbody=document.getElementById("rowTable")
let btn =document.querySelectorAll(".nav-link")
const modalbody=document.getElementById("modal-body")

async function gamelist(gameName="mmorpg"){
const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${gameName}`;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '77ce2d889amsh01f725abcf250bbp104365jsn728bf5e08957',
		'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);


    function display(result){
    let box="";
    for(let i=0;i<result.length;i++){
    box+=`
     <div class="col-3 ">
     <div class="card border-success border-3 h-100 ">
     <img src="${result[i].thumbnail}" class="card-img-top" alt="...">
     <div class="card-body">
    <h5 class="card-title">${result[i].title}</h5>
    <h6 class="card-title">${result[i].platform}</h6>
    <h6 class="card-title">${result[i].developer}</h6>
    <h6 class="card-title">${result[i].genre}</h6>
    <p class="card-text">${result[i].short_description}</p>
    <a href="#" class="btn btn-dark more-btn " data-id="${result[i].id}"data-bs-toggle="modal" data-bs-target="#exampleModal">More Details</a>
     </div>
     </div>
       </div>
     `
     
 }
 rowbody.innerHTML=box;
 const moreBtns = document.querySelectorAll(".more-btn");
        moreBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const gameId = btn.getAttribute("data-id");
                gameDetails(gameId);
            });
        });
}

display(result);
}
 
catch (error) {
	console.error(error);
}

}
gamelist();


btn.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
        let gameName = btn.innerHTML
        gamelist(gameName);
      })
    });



async function gameDetails(gameId){
  const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '77ce2d889amsh01f725abcf250bbp104365jsn728bf5e08957',
		'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);

function displayDetails(){
  let Details=`
       <img src="${result.thumbnail}" class="w-50 mb-3" alt="">
            <h2>${result.title}</h2>
            <h5>Category: ${result.genre}</h5>
            <h5>Platform: ${result.platform}</h5>
            <h5>Status: ${result.status}</h5>
            <p>${result.description}</p>
            <a href="${result.game_url}" target="_blank" class="btn btn-success mt-2">Play Now</a>
    `
  
  modalbody.innerHTML=Details;
}
displayDetails();


} catch (error) {
	console.error(error);
}
}




