const APIURL = "https://api.github.com/users/";
let main = document.querySelector("main");
let searchBox = document.querySelector("#search");
let searchBtn = document.querySelector("#search-icon");

let getUser = async (username) => {
  let response = await fetch(APIURL + username);
  let data = await response.json();
  let card = `
    <div class="card">
                        <div class="user">
                <div class="u_img">
                    <img class="avatar" src="${data.avatar_url}" alt="profile-img" />
                </div>

                <div class="u_info">
                    <h2>${data.name}</h2>
                    <p>${data.bio}</p>

                    <ul class="info">
                        <li><strong>Followers: </strong> <span class="follow"> &emsp; ${data.followers}</span></li>
                        <li><strong>Following: </strong> <span class="follow"> &emsp; ${data.following}</span></li>
                    </ul>
                </div>
            </div>

            <div class='repository_container'>
                <ul class="repo_info">
                    <li><strong class="repo-heading">Public Repositories: </strong> <span class="pubrepos"> &emsp; ${data.public_repos}</span></li>
                </ul>
            </div>
        </div>
        `;
  main.innerHTML = card;
  getRepos(username);
};

// init call
getUser("abdulrehmanghub");

let getRepos = async (username) => {
  let repos = document.querySelector(".repository_container");
  let response = await fetch(APIURL + username + "/repos");
  let data = await response.json();
  data.forEach((item) => {
    let elem = document.createElement("a");
    elem.classList.add("repos");
    elem.href = item.html_url;
    elem.innerText = item.name;
    elem.target = "_blank";
    repos.appendChild(elem);
  });
};
let formSubmit = () => {
  if (searchBox.value != "") {
    getUser(searchBox.value);
    searchBox.value = "";
  }
  return false;
};

searchBox.addEventListener("keypress", function () {
  if (event.key == "ENTER") {
    formSubmit();
  }
});

searchBtn.addEventListener("click", function () {
  formSubmit();
});
