const searchForm = document.querySelector("#github-form")
const userContainer = document.querySelector("#user-list")
const repoContainer = document.querySelector("#repos-list")
const infoContainer = document.querySelector("#info")
const searchChoice = document.querySelector("#options")
const userName = document.createElement("h2")
const userLink = document.createElement("a")
const userPic = document.createElement("img")
let searchingForUser = true
userLink.append(userPic)
infoContainer.append(userLink,userName)



searchForm.addEventListener("submit",(event)=>{
    event.preventDefault()
    repoContainer.innerHTML=""
    userName.textContent = ""
    userLink.href = ""
    userPic.src = ""
    handleSearch(event.target.search.value)
})

searchChoice.addEventListener("change",()=>{
    searchChoice.value === "userSearch" ? searchingForUser = true : searchingForUser = false
})

const loadUserData = (user) =>{
    
    getUserData(user)
    .then(body =>{
        addUserDataToPage(body)
    })
}

const getUserData = (user) =>{
    return fetch(`https://api.github.com/search/users?q=${user}`,{
        headers:{
            "Accept" : "application/vnd.github.v3+json"
        }
    })
    .then(resp => resp.json())
    .then(body => body)
}

const addUserDataToPage = (user) =>{
    const newUser = document.createElement("li")
    const userData = user.items[0]
    newUser.textContent = userData.login
    userContainer.append(newUser)
    newUser.addEventListener("click",()=>{
        repoContainer.innerHTML=""
        userName.textContent = userData.login
        userPic.src = userData['avatar_url']
        userLink.href = userData['html_url']
        loadRepoData(userData['login'])
    })
}

const getRepoData = (user) =>{
    return fetch(`https://api.github.com/users/${user}/repos`,{
        headers:{
            "Accept" : "application/vnd.github.v3+json"
        }
    })
    .then(resp => resp.json())
    .then(body => {
        return body;
    })
}

const loadRepoData = (user) =>{

    getRepoData(user)
    .then(addReposToPage)
}

const addReposToPage = (repos) =>{
    repos.forEach((repo)=>{
        const repoTitle = document.createElement("p")
        const repoLink = document.createElement("a")
        repoLink.href = repo['svn_url']
        repoTitle.textContent = repo['name']
        repoLink.append(repoTitle)
        repoContainer.append(repoLink)
    })
}

const handleSearch = (keyword) =>{
    if(searchingForUser){
        loadUserData(keyword)
    }else{
        fetch(`https://api.github.com/search/repositories?q=${keyword}`,{
            headers:{
                "Accept" : "application/vnd.github.v3+json"
            }
        })
        .then(resp => resp.json())
        .then(repos => addReposToPage(repos.items))
    }
}

// addUserDataToPage({items:[{"login":"test"}]})
/*[
    {
        "login": "dader34",
        "id": 56900960,
        "node_id": "MDQ6VXNlcjU2OTAwOTYw",
        "avatar_url": "https://avatars.githubusercontent.com/u/56900960?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/dader34",
        "html_url": "https://github.com/dader34",
        "followers_url": "https://api.github.com/users/dader34/followers",
        "following_url": "https://api.github.com/users/dader34/following{/other_user}",
        "gists_url": "https://api.github.com/users/dader34/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/dader34/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/dader34/subscriptions",
        "organizations_url": "https://api.github.com/users/dader34/orgs",
        "repos_url": "https://api.github.com/users/dader34/repos",
        "events_url": "https://api.github.com/users/dader34/events{/privacy}",
        "received_events_url": "https://api.github.com/users/dader34/received_events",
        "type": "User",
        "site_admin": false,
        "score": 1
    }
] */

/*{
    "id": 396183506,
    "node_id": "MDEwOlJlcG9zaXRvcnkzOTYxODM1MDY=",
    "name": "fracCalcHTML",
    "full_name": "dader34/fracCalcHTML",
    "private": false,
    "owner": {
      "login": "dader34",
      "id": 56900960,
      "node_id": "MDQ6VXNlcjU2OTAwOTYw",
      "avatar_url": "https://avatars.githubusercontent.com/u/56900960?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/dader34",
      "html_url": "https://github.com/dader34",
      "followers_url": "https://api.github.com/users/dader34/followers",
      "following_url": "https://api.github.com/users/dader34/following{/other_user}",
      "gists_url": "https://api.github.com/users/dader34/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/dader34/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/dader34/subscriptions",
      "organizations_url": "https://api.github.com/users/dader34/orgs",
      "repos_url": "https://api.github.com/users/dader34/repos",
      "events_url": "https://api.github.com/users/dader34/events{/privacy}",
      "received_events_url": "https://api.github.com/users/dader34/received_events",
      "type": "User",
      "site_admin": false
    },
    "html_url": "https://github.com/dader34/fracCalcHTML",
    "description": null,
    "fork": false,
    "url": "https://api.github.com/repos/dader34/fracCalcHTML",
    "forks_url": "https://api.github.com/repos/dader34/fracCalcHTML/forks",
    "keys_url": "https://api.github.com/repos/dader34/fracCalcHTML/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/dader34/fracCalcHTML/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/dader34/fracCalcHTML/teams",
    "hooks_url": "https://api.github.com/repos/dader34/fracCalcHTML/hooks",
    "issue_events_url": "https://api.github.com/repos/dader34/fracCalcHTML/issues/events{/number}",
    "events_url": "https://api.github.com/repos/dader34/fracCalcHTML/events",
    "assignees_url": "https://api.github.com/repos/dader34/fracCalcHTML/assignees{/user}",
    "branches_url": "https://api.github.com/repos/dader34/fracCalcHTML/branches{/branch}",
    "tags_url": "https://api.github.com/repos/dader34/fracCalcHTML/tags",
    "blobs_url": "https://api.github.com/repos/dader34/fracCalcHTML/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/dader34/fracCalcHTML/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/dader34/fracCalcHTML/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/dader34/fracCalcHTML/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/dader34/fracCalcHTML/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/dader34/fracCalcHTML/languages",
    "stargazers_url": "https://api.github.com/repos/dader34/fracCalcHTML/stargazers",
    "contributors_url": "https://api.github.com/repos/dader34/fracCalcHTML/contributors",
    "subscribers_url": "https://api.github.com/repos/dader34/fracCalcHTML/subscribers",
    "subscription_url": "https://api.github.com/repos/dader34/fracCalcHTML/subscription",
    "commits_url": "https://api.github.com/repos/dader34/fracCalcHTML/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/dader34/fracCalcHTML/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/dader34/fracCalcHTML/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/dader34/fracCalcHTML/issues/comments{/number}",
    "contents_url": "https://api.github.com/repos/dader34/fracCalcHTML/contents/{+path}",
    "compare_url": "https://api.github.com/repos/dader34/fracCalcHTML/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/dader34/fracCalcHTML/merges",
    "archive_url": "https://api.github.com/repos/dader34/fracCalcHTML/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/dader34/fracCalcHTML/downloads",
    "issues_url": "https://api.github.com/repos/dader34/fracCalcHTML/issues{/number}",
    "pulls_url": "https://api.github.com/repos/dader34/fracCalcHTML/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/dader34/fracCalcHTML/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/dader34/fracCalcHTML/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/dader34/fracCalcHTML/labels{/name}",
    "releases_url": "https://api.github.com/repos/dader34/fracCalcHTML/releases{/id}",
    "deployments_url": "https://api.github.com/repos/dader34/fracCalcHTML/deployments",
    "created_at": "2021-08-15T01:45:15Z",
    "updated_at": "2021-08-15T01:58:42Z",
    "pushed_at": "2021-08-15T01:58:39Z",
    "git_url": "git://github.com/dader34/fracCalcHTML.git",
    "ssh_url": "git@github.com:dader34/fracCalcHTML.git",
    "clone_url": "https://github.com/dader34/fracCalcHTML.git",
    "svn_url": "https://github.com/dader34/fracCalcHTML",
    "homepage": null,
    "size": 3,
    "stargazers_count": 0,
    "watchers_count": 0,
    "language": "JavaScript",
    "has_issues": true,
    "has_projects": true,
    "has_downloads": true,
    "has_wiki": true,
    "has_pages": false,
    "has_discussions": false,
    "forks_count": 0,
    "mirror_url": null,
    "archived": false,
    "disabled": false,
    "open_issues_count": 0,
    "license": null,
    "allow_forking": true,
    "is_template": false,
    "web_commit_signoff_required": false,
    "topics": [

    ],
    "visibility": "public",
    "forks": 0,
    "open_issues": 0,
    "watchers": 0,
    "default_branch": "master"
  },
  {
    "id": 390230200,
    "node_id": "MDEwOlJlcG9zaXRvcnkzOTAyMzAyMDA=",
    "name": "fracCalcv2",
    "full_name": "dader34/fracCalcv2",
    "private": false,
    "owner": {
      "login": "dader34",
      "id": 56900960,
      "node_id": "MDQ6VXNlcjU2OTAwOTYw",
      "avatar_url": "https://avatars.githubusercontent.com/u/56900960?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/dader34",
      "html_url": "https://github.com/dader34",
      "followers_url": "https://api.github.com/users/dader34/followers",
      "following_url": "https://api.github.com/users/dader34/following{/other_user}",
      "gists_url": "https://api.github.com/users/dader34/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/dader34/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/dader34/subscriptions",
      "organizations_url": "https://api.github.com/users/dader34/orgs",
      "repos_url": "https://api.github.com/users/dader34/repos",
      "events_url": "https://api.github.com/users/dader34/events{/privacy}",
      "received_events_url": "https://api.github.com/users/dader34/received_events",
      "type": "User",
      "site_admin": false
    },
    "html_url": "https://github.com/dader34/fracCalcv2",
    "description": null,
    "fork": false,
    "url": "https://api.github.com/repos/dader34/fracCalcv2",
    "forks_url": "https://api.github.com/repos/dader34/fracCalcv2/forks",
    "keys_url": "https://api.github.com/repos/dader34/fracCalcv2/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/dader34/fracCalcv2/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/dader34/fracCalcv2/teams",
    "hooks_url": "https://api.github.com/repos/dader34/fracCalcv2/hooks",
    "issue_events_url": "https://api.github.com/repos/dader34/fracCalcv2/issues/events{/number}",
    "events_url": "https://api.github.com/repos/dader34/fracCalcv2/events",
    "assignees_url": "https://api.github.com/repos/dader34/fracCalcv2/assignees{/user}",
    "branches_url": "https://api.github.com/repos/dader34/fracCalcv2/branches{/branch}",
    "tags_url": "https://api.github.com/repos/dader34/fracCalcv2/tags",
    "blobs_url": "https://api.github.com/repos/dader34/fracCalcv2/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/dader34/fracCalcv2/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/dader34/fracCalcv2/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/dader34/fracCalcv2/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/dader34/fracCalcv2/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/dader34/fracCalcv2/languages",
    "stargazers_url": "https://api.github.com/repos/dader34/fracCalcv2/stargazers",
    "contributors_url": "https://api.github.com/repos/dader34/fracCalcv2/contributors",
    "subscribers_url": "https://api.github.com/repos/dader34/fracCalcv2/subscribers",
    "subscription_url": "https://api.github.com/repos/dader34/fracCalcv2/subscription",
    "commits_url": "https://api.github.com/repos/dader34/fracCalcv2/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/dader34/fracCalcv2/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/dader34/fracCalcv2/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/dader34/fracCalcv2/issues/comments{/number}",
    "contents_url": "https://api.github.com/repos/dader34/fracCalcv2/contents/{+path}",
    "compare_url": "https://api.github.com/repos/dader34/fracCalcv2/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/dader34/fracCalcv2/merges",
    "archive_url": "https://api.github.com/repos/dader34/fracCalcv2/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/dader34/fracCalcv2/downloads",
    "issues_url": "https://api.github.com/repos/dader34/fracCalcv2/issues{/number}",
    "pulls_url": "https://api.github.com/repos/dader34/fracCalcv2/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/dader34/fracCalcv2/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/dader34/fracCalcv2/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/dader34/fracCalcv2/labels{/name}",
    "releases_url": "https://api.github.com/repos/dader34/fracCalcv2/releases{/id}",
    "deployments_url": "https://api.github.com/repos/dader34/fracCalcv2/deployments",
    "created_at": "2021-07-28T05:50:45Z",
    "updated_at": "2021-09-04T04:28:08Z",
    "pushed_at": "2021-09-04T04:28:06Z",
    "git_url": "git://github.com/dader34/fracCalcv2.git",
    "ssh_url": "git@github.com:dader34/fracCalcv2.git",
    "clone_url": "https://github.com/dader34/fracCalcv2.git",
    "svn_url": "https://github.com/dader34/fracCalcv2",
    "homepage": null,
    "size": 14,
    "stargazers_count": 0,
    "watchers_count": 0,
    "language": "JavaScript",
    "has_issues": true,
    "has_projects": true,
    "has_downloads": true,
    "has_wiki": true,
    "has_pages": false,
    "has_discussions": false,
    "forks_count": 0,
    "mirror_url": null,
    "archived": false,
    "disabled": false,
    "open_issues_count": 0,
    "license": null,
    "allow_forking": true,
    "is_template": false,
    "web_commit_signoff_required": false,
    "topics": [

    ],
    "visibility": "public",
    "forks": 0,
    "open_issues": 0,
    "watchers": 0,
    "default_branch": "master"
  },
  */