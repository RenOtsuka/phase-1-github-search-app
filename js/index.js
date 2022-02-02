function grabInput(){
    const form = document.getElementById('github-form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        let input = document.getElementById('search').value;
        searchGithub(input);
    });
}

function searchGithub(input){
    fetch(`https://api.github.com/search/users?q=${input}`)
    .then(resp => resp.json())
    .then(obj => loadUsersList(obj));
}

function loadUsersList(obj){
    const userList = document.getElementById('user-list');
    userList.textContent = '';
    document.getElementById('repos-list').textContent = '';

    for(let key in obj.items){
        let li = loadUser(obj.items[key]);
        userList.appendChild(li);  
        userList.appendChild(document.createElement('br'));
    }
}

function loadUser(userObj){
    const li = document.createElement('li');
    li.className = 'user';

    const userImg = document.createElement('img');
    userImg.setAttribute('src', `${userObj.avatar_url}`)
    userImg.className = 'user-img';

    const userName = document.createElement('footer');
    userName.textContent = userObj.login;


    const userGithubPage = document.createElement('a');
    userGithubPage.setAttribute('href', `${userObj.html_url}`);
    userGithubPage.textContent = `${userObj.login}'s Github Page`;

    li.appendChild(userImg);
    li.appendChild(userName);
    li.appendChild(userGithubPage);
    
    li.addEventListener('click', () => getRepo(userObj.login));

    return li;
}

function getRepo(userName){
    fetch(`https://api.github.com/users/${userName}/repos`)
    .then(resp => resp.json())
    .then(obj => loadRepos(obj, userName));
}


function loadRepos(userRepoList, userName){
    const repoList = document.getElementById('repos-list');
    repoList.textContent = '';

    const title = document.createElement('h4');
    if(userRepoList.length >= 2){
         title.textContent = `${userName}'s Repositories`;
    }
    else{
        title.textContent = `${userName}'s Repository`;
    }
    repoList.appendChild(title);

    for(let key in userRepoList){
        //console.log(userRepoObj[key]);
        let li = addRepo(userRepoList[key]);
        repoList.appendChild(li);
    }

}

function addRepo(repoObj){
    const li = document.createElement('li');
    li.className = 'repo';

    const repo = document.createElement('a');
    repo.setAttribute('href', `${repoObj.html_url}`)
    repo.textContent = `${repoObj.name}`;

    li.appendChild(repo);

    return li;
}



document.addEventListener('DOMContentLoaded', () => {
    grabInput();
})