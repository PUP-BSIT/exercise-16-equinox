let nameInput = document.querySelector("#name");
let commentInput = document.querySelector("#comment");
let commentButton = document.querySelector("#comment_button");
let commentsSectionSort = document.querySelector(".group-comment");
let ascendingButton = document.querySelector("#sort_ascending");
let descendingButton = document.querySelector("#sort_descending");
let comments = [];

nameInput.addEventListener("input", toggleCommentButton);
commentInput.addEventListener("input", toggleCommentButton);
commentButton.addEventListener("click", addComment);
ascendingButton.addEventListener("click", sortCommentsAscending);
descendingButton.addEventListener("click", sortCommentsDescending);

function toggleCommentButton() {
    let nameValue = nameInput.value;
    let commentValue = commentInput.value;

    commentButton.disabled = !(nameValue.trim() && commentValue.trim());
}

function addComment() {
    let name = nameInput.value;
    let comment = commentInput.value;

    if (name.trim() || comment.trim()) {
        return;
    }

    let timestamp = new Date().toLocaleString();

    let commentObj = {
        name: name,
        comment: comment,
        timestamp: timestamp,
    };

    comments.push(commentObj);

    nameInput.value = '';
    commentInput.value = '';
    commentButton.setAttribute('disabled', 'true');

    displayComments();
}

function displayComments() {
    commentsSectionSort.innerHTML = '';

    for (let comment of comments) {
        let commentElement = document.createElement('div');
        commentElement.innerHTML = `<p class="input">- <em>${comment.name}: 
        ${comment.comment}</em> (Date: ${comment.timestamp})</p>`
        commentsSectionSort.appendChild(commentElement);
    }
}

function sortCommentsAscending(event) {
    event.preventDefault();

    comments.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    displayComments();
}

function sortCommentsDescending(event) {
    event.preventDefault();

    comments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    displayComments();
}
