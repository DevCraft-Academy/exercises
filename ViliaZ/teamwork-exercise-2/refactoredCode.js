const activeUser = [
  {
    name: "TestUser",
    aliasName: "testuser",
    profilePicture: "./img/thumbnails/testuser.jpg",
  },
];

function init() {
  getPostFromLocaleStorage();
  renderSidebar();
  renderProfileScrollbar();
  renderMainFeed();
}

export function renderProfileScrollbar() {
  const profilesScrollbar = document.getElementById("profilesScrollbar");
  profilesScrollbar.innerHTML = "";
  for (let index = 0; index < posts.length; index++) {
    profilesScrollbar.innerHTML += `
                <div class="account">
                    <img src="${posts[index]["profilePicture"]}">
                    <span>${posts[index]["profileName"]}</span>
                </div>
        `;
  }
}

function renderMainFeed() {
  let postsContainer = document.getElementById("postsContainer");
  postsContainer.innerHTML = "";

  for (let i = 0; i < posts.length; i++) {
    postsContainer.innerHTML += generateContainterHTML();
    renderComments(i);
  }
}

function handlePostComment(postNo) {
  const newComment = document.getElementById("commentInput" + postNo).value;

  if (newComment.length < 2) {
    alert("Du kannst keine leeren Kommentare posten.");
  } else {
    posts[postNo].commentText.push(newComment);
  }
  savePostToLocaleStorage();
  renderComments(postNo);
  clearCommentInputfield(postNo);
}

function savePostToLocaleStorage() {
  let postsAsText = JSON.stringify(posts);
  localStorage.setItem("posts", postsAsText);
}

function getPostFromLocaleStorage() {
  let postsAsText = localStorage.getItem("posts");

  if (postsAsText) {
    posts = JSON.parse(postsAsText);
  }
}

function renderComments(postNo) {
  let commentPinboard = document.getElementById("pinnedComment" + postNo);
  commentPinboard.innerHTML = "";

  for (let index = 0; index < posts[i].commentText.length; index++) {
    commentPinboard.innerHTML += `                    
                <span id="commentAuthor">${activeUser[0].name}</span>
                <span id="commentText">${posts[postNo].commentText[index]}</span><br>
                <h4 id="postTime">vor 4 Stunden</h4>
            `;
  }
}

function clearCommentInputfield(postNo) {
  const commentInputfield = document.getElementById("commentInput" + postNo);
  commentInputfield.value = "";
  commentInputfield.focus();
}

function renderSidebar() {
  const sidebar = document.getElementById("sidebar");

  for (let i = 0; i < 3; i++) {
    sidebar.innerHTML += ` 
           <div class="suggestedAccount">
                <div class="profileInfo">
                    <div>
                        <img src="${posts[i]["profilePicture"]}">
                    </div>
                    
                    <div>
                        <a href="">${posts[i]["profileName"]}</a><br>
                        <h4>${posts[i]["info"]}</h4>
                    </div>
                </div>
                    <div>
                        <button>Abonnieren</button>
                    </div>
            </div>
            `;
  }
}

function generateContainterHTML() {
  return `
                <div class="post">
                <!-- HEADER OF EACH POST -->
                <div class="postHeader postMargins">
                    <div class="post-profileInfo">
                        <div><img src="${posts[i]["profilePicture"]}" alt=""></div>
                        <div>
                            <a href="">${posts[i]["profileName"]}</a><br>
                            <span id="postLocation">${posts[i]["postLocation"]}</span>
                        </div>
                    </div>
                    <div><button>...</button></div>
                </div>


                <!-- MAIN IMAGE OF POST -->
                <div><img class="postImage" src="${posts[i]["postImage"]}" alt=""></div>

                <!-- ICONS BELOW IMAGE -->
                <div class="postIconBar postMargins">
                    <div class="postIcons-left">
                        <img class="post-icon" src="./img/icons/4.png">
                        <img class="post-icon" src="./img/icons/1.png">
                        <img class="post-icon" src="./img/icons/7.png">
                    </div>

                    <div class="postIcons-right">
                        <img class="post-icon" src="./img/icons/2.png">
                    </div>
                </div>

                <!-- LIKES -->
                <div class="likes postMargins">
                    <a href="#"><span>Gefällt ${posts[i]["postLikes"]} Mal</span></a>
                </div>

                <!-- INSTAGRM-POST DESCRIPTION-->
                <div class="postMargins">
                    <span id="postAuthor">${posts[i]["profileName"]}</span>
                    <span id="postText">${posts[i]["postText"]}</span><br>
                </div>


                <!-- COMMENTS PINBOARD-->
                <div id="pinnedComment${i}" class="pinnedComment postMargins">
                </div>


                <!-- NEW COMMENT INPUT FORM -->
                <div class="newComment postMargins">
                    <form onsubmit="handlePostComment(${i}); event.stopPropagation(); return false;" >
                        <img class="post-icon" src="./img/icons/3.png">
                        <input class="commentfield" id="commentInput${i}" cols="1" max-rows="1" placeholder="Kommentieren ... " >
                        <input id="btn-submitComment" type="submit" value="Posten" >
                    </form>
                </div>
            </div> `;
}
