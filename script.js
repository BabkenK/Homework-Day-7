const comments = [
  { id: 1, text: "This is the first comment", parentId: null, replies: [ { id: 2, text: "This is a reply to the first comment", parentId: 1, replies: [ { id: 3, text: "This is a nested reply", parentId: 2, replies: [] } ] } ] },
  { id: 4, text: "This is an independent comment", parentId: null, replies: [] }
];

function generateCommentHtml(comment, nestingLevel) {
  const commentDiv = document.createElement('div');
  commentDiv.classList.add('comment');
  commentDiv.textContent = comment.text;
  if (comment.replies.length > 0) {
    comment.replies.forEach(reply => {
      const replyHtml = generateCommentHtml(reply, nestingLevel + 1);
      commentDiv.appendChild(replyHtml);
    });
  }
  return commentDiv;
}
function appendCommentsToContainer(commentsArray, container, nestingLevel) {
  container.innerHTML = '';
  commentsArray.forEach(comment => {
    if (comment.parentId === null) {
      const commentHtml = generateCommentHtml(comment, nestingLevel);
      container.appendChild(commentHtml);
    }
  });
}
const commentsContainer = document.getElementById('commentsContainer');
appendCommentsToContainer(comments, commentsContainer, 0);
