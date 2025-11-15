fetch("../../assets/experiences_new.json")
  .then((response) => response.json())
  .then((data) => {
    for (let key in data) {
      let cont = document.querySelector(
        `.${key} .carousel-container .carousel`
      );
      if (cont) {
        for (let item in data[key]) {
          let title = data[key][item].Title;
          let description = data[key][item].Description;

          cont.innerHTML += `<div class="card">
                        <div class="card-body">
                        <h3 class="card-title">${title}</h3>
                        <p class="card-text">${description}</p>
                        </div>
                        </div>`;
        }
      } else if (key == "About") {
        let cont = document.querySelector(`.${key}`);
        for (let item in data[key]) {
          let description = data[key][item].Description;
          cont.innerHTML += `<div class="aboutMe">
                <p>${description}</p>
                </div>`;
        }
      }
    }
    /*  */

    document.querySelectorAll(".card").forEach((el) => {
      el.addEventListener("click", () => {
       enableActive(el);
      //  
      });
    });
  });

  async function enableActive(el){
    el.classList.add("active");
    document.querySelector(".card-blur").classList.add("show");
    await sleep(500);
    document.querySelector("body").addEventListener("click", disableActive);
  }

  function disableActive(){
    
    document.querySelector("body").removeEventListener("click", disableActive);
    document.querySelector(".active").classList.remove("active");
    document.querySelector(".card-blur").classList.remove("show");
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }