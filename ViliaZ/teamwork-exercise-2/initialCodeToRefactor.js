
// Info for Sidebar
let activeUser = [
    {
        'name': 'TestUser',
        'aliasName': 'testuser',
        'profilePicture': './img/thumbnails/testuser.jpg'
    }
];




function init() {
    load();
    renderSidebar();
    renderProfileScrollbar();
    renderFeed();
};

// Render Top Account-Images

function renderProfileScrollbar() {

    let profilesScrollbar = document.getElementById('profilesScrollbar');

    profilesScrollbar.innerHTML = '';

    for (let index = 0; index < posts.length; index++) {

        profilesScrollbar.innerHTML += `
                <div class="account">
                    <img src="${posts[index]['profilePicture']}">
                    <span>${posts[index]['profileName']}</span>
                </div>
        `;
    };
}


// Main Instagram-Feed with all Posts

function renderFeed() {

    let postsContainer = document.getElementById('postsContainer');

    postsContainer.innerHTML = '';

    for (let i = 0; i < posts.length; i++) {
        postsContainer.innerHTML += `
    
                <div class="post">

                <!-- HEADER OF EACH POST -->

                <div class="postHeader postMargins">

                    <div class="post-profileInfo">
                        <div><img src="${posts[i]['profilePicture']}" alt=""></div>
                        <div>
                            <a href="">${posts[i]['profileName']}</a><br>
                            <span id="postLocation">${posts[i]['postLocation']}</span>
                        </div>
                    </div>
                    <div><button>...</button></div>
                </div>


                <!-- MAIN IMAGE OF POST -->

                <div><img class="postImage" src="${posts[i]['postImage']}" alt=""></div>


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
                    <a href="#"><span>Gefällt ${posts[i]['postLikes']} Mal</span></a>
                </div>


                <!-- INSTAGRM-POST DESCRIPTION-->

                <div class="postMargins">
                    <span id="postAuthor">${posts[i]['profileName']}</span>
                    <span id="postText">${posts[i]['postText']}</span><br>
                </div>


                <!-- COMMENTS PINBOARD-->

                <div id="pinnedComment${i}" class="pinnedComment postMargins">
                </div>


                <!-- NEW COMMENT INPUT FORM -->

                <div class="newComment postMargins">
                    <form onsubmit="postComment(${i}); event.stopPropagation(); return false;" >
                        <img class="post-icon" src="./img/icons/3.png">
                        <input class="commentfield" id="commentInput${i}" cols="1" max-rows="1" placeholder="Kommentieren ... " >
                        <input id="btn-submitComment" type="submit" value="Posten" >
                    </form>
                </div>
            </div> `
            ;
        renderComments(i);
    }
};



// EventHandler: Button "Posten"

function postComment(i) {

    let newComment = document.getElementById('commentInput' + i).value;

    if (newComment.length < 2) {
        alert('Du kannst keine leeren Kommentare posten.');
    }
    else {
        posts[i].commentText.push(newComment);
    }

    save();
    renderComments(i);
    clearCommentInputfield(i);
}



// Save Comment to local storage

function save() {

    let postsAsText = JSON.stringify(posts);
    localStorage.setItem('posts', postsAsText);
}


// Load Comments from local storage

function load() {

    let postsAsText = localStorage.getItem('posts');

    if (postsAsText) {
        posts = JSON.parse(postsAsText);
    }
}


// Render Comments 

function renderComments(i) {

    let commentPinboard = document.getElementById('pinnedComment' + i);

    commentPinboard.innerHTML = '';

    for (let index = 0; index < posts[i].commentText.length; index++) {

        commentPinboard.innerHTML += `                    
                <span id="commentAuthor">${activeUser[0].name}</span>
                <span id="commentText">${posts[i].commentText[index]}</span><br>
                <h4 id="postTime">vor 4 Stunden</h4>
            `;
    };
};



// Reset Comment input field: clear & set focus

function clearCommentInputfield(i) {

    let commentInputfield = document.getElementById('commentInput' + i);

    commentInputfield.value = '';
    commentInputfield.focus();
};



function renderSidebar() {

    let sidebar = document.getElementById('sidebar');

    for (let i = 0; i < 3; i++) {

        sidebar.innerHTML += ` 
           <div class="suggestedAccount">
                <div class="profileInfo">
                    <div>
                        <img src="${posts[i]['profilePicture']}">
                    </div>
                    
                    <div>
                        <a href="">${posts[i]['profileName']}</a><br>
                        <h4>${posts[i]['info']}</h4>
                    </div>
                </div>

                    <div>
                        <button>Abonnieren</button>
                    </div>
            </div>
            `;
    }
}