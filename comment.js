function supportsLocalStorage () {
return typeof localStorage !== 'undefined';
}

function getComments() {
return JSON.parse(localStorage.getItem('comments')) || [];
}

function saveComment (comments, commentStr, action) {
if (!commentStr && comments.indexOf(commentStr) < 0) {
    action(err);
}

action(undefined, commentStr);

}

function appendToStream(stream, str, index) {
var li = document.createElement('LI');
li.setAttribute('data-index', index);
li.innerHTML = str;
stream.appendChild(li);
}

function loadComments(stream) {
var comments = getComments();
if (comments) {
    for (var i = 0; i < comments.length; i++) {
    appendToStream(stream, comments[i], i);
    }    
}
}

function clearComments(stream) {
localStorage.removeItem('comments');
stream.innerHTML = '';
}


var commentForm = document.getElementById('comment-form'),
    commentList = document.getElementById('comment-stream'),
    commentInput = document.getElementById('comment-input')

loadComments(commentList);

commentForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var commStr = commentInput.value,
        comments = getComments();
    
    saveComment(comments, commStr, function(err, value) {
    
    if (err) {
        return;
    }
    
    comments.push(value);
    localStorage.setItem('comments', JSON.stringify(comments));  
    appendToStream(commentList, commStr);
    commentInput.value = '';      
    });
    
}, true);
