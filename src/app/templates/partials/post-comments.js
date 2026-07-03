import { escapeHtml } from '../utils/helpers.js';
import { formatSiteDate } from '../../../lib/site-dates.js';

const MAX_REPLY_DEPTH = 3;

function replyFormHtml(parentId, authorName) {
  const safeParentId = escapeHtml(parentId);
  const safeAuthor = escapeHtml(authorName);

  return `
    <form class="blogpost__comment-reply-form" data-parent-id="${safeParentId}" hidden>
      <p class="blogpost__comment-reply-to">Replying to <strong>${safeAuthor}</strong></p>
      <div class="blogpost__comment-form-row blogpost__comment-form-row--2">
        <label class="blogpost__comment-field">
          <span class="blogpost__comment-label">Name</span>
          <input type="text" name="authorName" maxlength="255" placeholder="Your name" autocomplete="name" />
        </label>
        <label class="blogpost__comment-field">
          <span class="blogpost__comment-label">Email</span>
          <input type="email" name="authorEmail" maxlength="255" placeholder="you@example.com" autocomplete="email" />
        </label>
      </div>
      <label class="blogpost__comment-field">
        <span class="blogpost__comment-label">Comment</span>
        <textarea name="content" rows="4" required minlength="2" maxlength="5000" placeholder="Write your reply…"></textarea>
      </label>
      <input type="text" name="website" class="blogpost__comment-honeypot" tabindex="-1" autocomplete="off" aria-hidden="true" />
      <div class="blogpost__comment-reply-actions">
        <button type="submit" class="blogpost__comment-submit">Post reply</button>
        <button type="button" class="blogpost__comment-reply-cancel">Cancel</button>
      </div>
    </form>
  `;
}

function renderCommentTree(comments = [], siteSettings = {}, depth = 0) {
  return comments.map((comment) => {
    const id = escapeHtml(comment.id);
    const name = escapeHtml(comment.authorName || 'Anonymous');
    const date = escapeHtml(formatSiteDate(comment.createdAt, siteSettings));
    const content = escapeHtml(comment.content || '');
    const canReply = depth < MAX_REPLY_DEPTH;
    const replyControls = canReply
      ? `
        <div class="blogpost__comment-actions">
          <button type="button" class="blogpost__comment-reply-btn" data-comment-id="${id}" data-author="${name}">Reply</button>
        </div>
        ${replyFormHtml(comment.id, comment.authorName || 'Anonymous')}
      `
      : '';
    const replies = comment.replies?.length
      ? `<div class="blogpost__comment-replies">${renderCommentTree(comment.replies, siteSettings, depth + 1)}</div>`
      : '';

    return `
      <article class="blogpost__comment${depth > 0 ? ' blogpost__comment--reply' : ''}" data-comment-id="${id}">
        <header class="blogpost__comment-header">
          <span class="blogpost__comment-author">${name}</span>
          <time class="blogpost__comment-date" datetime="${escapeHtml(comment.createdAt || '')}">${date}</time>
        </header>
        <p class="blogpost__comment-body">${content}</p>
        ${replyControls}
        ${replies}
      </article>
    `;
  }).join('');
}

/**
 * Comments list + new comment form (rendered inside .blogpost__content only).
 */
export function postComments({
  slug,
  comments = [],
  commentsEnabled = true,
  moderateComments = false,
  siteSettings = {},
} = {}) {
  if (!commentsEnabled) return '';

  const listHtml = comments.length
    ? renderCommentTree(comments, siteSettings)
    : '<p class="blogpost__comments-empty">No comments yet. Be the first to share your thoughts.</p>';

  return `
    <section class="blogpost__comments" id="comments" aria-labelledby="comments-heading">
      <h4 id="comments-heading" class="blogpost__comments-title">Comments</h4>
      <div class="blogpost__comments-list" id="comments-list">
        ${listHtml}
      </div>
      <form class="blogpost__comment-form" id="comment-form" novalidate>
        <h5 class="blogpost__comment-form-title">Leave a comment</h5>
        <div class="blogpost__comment-form-row blogpost__comment-form-row--2">
          <label class="blogpost__comment-field">
            <span class="blogpost__comment-label">Name</span>
            <input type="text" name="authorName" maxlength="255" placeholder="Your name" autocomplete="name" />
          </label>
          <label class="blogpost__comment-field">
            <span class="blogpost__comment-label">Email</span>
            <input type="email" name="authorEmail" maxlength="255" placeholder="you@example.com" autocomplete="email" />
          </label>
        </div>
        <label class="blogpost__comment-field">
          <span class="blogpost__comment-label">Comment</span>
          <textarea name="content" rows="5" required minlength="2" maxlength="5000" placeholder="Write your comment…"></textarea>
        </label>
        <input type="text" name="website" class="blogpost__comment-honeypot" tabindex="-1" autocomplete="off" aria-hidden="true" />
        <p class="blogpost__comment-feedback" id="comment-feedback" hidden role="status"></p>
        <button type="submit" class="blogpost__comment-submit">Post comment</button>
        ${moderateComments ? '<p class="blogpost__comment-note">Comments are moderated and may take a moment to appear.</p>' : ''}
      </form>
    </section>
    <script>
      (function () {
        const form = document.getElementById('comment-form');
        const list = document.getElementById('comments-list');
        const feedback = document.getElementById('comment-feedback');
        if (!form || !list) return;

        const slug = ${JSON.stringify(slug)};
        const moderate = ${moderateComments ? 'true' : 'false'};
        const maxReplyDepth = ${MAX_REPLY_DEPTH};

        function showFeedback(message, isError) {
          if (!feedback) return;
          feedback.hidden = false;
          feedback.textContent = message;
          feedback.classList.toggle('blogpost__comment-feedback--error', !!isError);
        }

        function clearFeedback() {
          if (!feedback) return;
          feedback.hidden = true;
          feedback.textContent = '';
          feedback.classList.remove('blogpost__comment-feedback--error');
        }

        function closeReplyForms(except) {
          list.querySelectorAll('.blogpost__comment-reply-form').forEach(function (replyForm) {
            if (replyForm !== except) replyForm.hidden = true;
          });
        }

        function escapeText(value) {
          return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
        }

        function formatDate(value) {
          const date = new Date(value);
          if (Number.isNaN(date.getTime())) return '';
          return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
        }

        function replyFormTemplate(parentId, authorName) {
          const safeId = escapeText(parentId);
          const safeAuthor = escapeText(authorName);
          return '<form class="blogpost__comment-reply-form" data-parent-id="' + safeId + '" hidden>' +
            '<p class="blogpost__comment-reply-to">Replying to <strong>' + safeAuthor + '</strong></p>' +
            '<div class="blogpost__comment-form-row blogpost__comment-form-row--2">' +
            '<label class="blogpost__comment-field"><span class="blogpost__comment-label">Name</span>' +
            '<input type="text" name="authorName" maxlength="255" placeholder="Your name" autocomplete="name" /></label>' +
            '<label class="blogpost__comment-field"><span class="blogpost__comment-label">Email</span>' +
            '<input type="email" name="authorEmail" maxlength="255" placeholder="you@example.com" autocomplete="email" /></label>' +
            '</div>' +
            '<label class="blogpost__comment-field"><span class="blogpost__comment-label">Comment</span>' +
            '<textarea name="content" rows="4" required minlength="2" maxlength="5000" placeholder="Write your reply…"></textarea></label>' +
            '<input type="text" name="website" class="blogpost__comment-honeypot" tabindex="-1" autocomplete="off" aria-hidden="true" />' +
            '<div class="blogpost__comment-reply-actions">' +
            '<button type="submit" class="blogpost__comment-submit">Post reply</button>' +
            '<button type="button" class="blogpost__comment-reply-cancel">Cancel</button>' +
            '</div></form>';
        }

        function renderCommentHtml(comment, depth) {
          const id = escapeText(comment.id);
          const name = escapeText(comment.authorName || 'Anonymous');
          const canReply = depth < maxReplyDepth;
          const replyControls = canReply
            ? '<div class="blogpost__comment-actions"><button type="button" class="blogpost__comment-reply-btn" data-comment-id="' + id + '" data-author="' + name + '">Reply</button></div>' + replyFormTemplate(comment.id, comment.authorName || 'Anonymous')
            : '';
          const replies = (comment.replies || []).length
            ? '<div class="blogpost__comment-replies">' + comment.replies.map(function (reply) { return renderCommentHtml(reply, depth + 1); }).join('') + '</div>'
            : '';

          return '<article class="blogpost__comment' + (depth > 0 ? ' blogpost__comment--reply' : '') + '" data-comment-id="' + id + '">' +
            '<header class="blogpost__comment-header"><span class="blogpost__comment-author">' + name + '</span>' +
            '<time class="blogpost__comment-date" datetime="' + escapeText(comment.createdAt) + '">' + formatDate(comment.createdAt) + '</time></header>' +
            '<p class="blogpost__comment-body">' + escapeText(comment.content) + '</p>' +
            replyControls + replies + '</article>';
        }

        async function reloadComments() {
          const res = await fetch('/api/v1/posts/' + encodeURIComponent(slug) + '/comments?limit=50');
          if (!res.ok) return;
          const payload = await res.json();
          const comments = payload.data || [];
          list.innerHTML = comments.length
            ? comments.map(function (comment) { return renderCommentHtml(comment, 0); }).join('')
            : '<p class="blogpost__comments-empty">No comments yet. Be the first to share your thoughts.</p>';
        }

        async function submitComment(formEl, parentId) {
          clearFeedback();
          const data = new FormData(formEl);
          const content = String(data.get('content') || '').trim();
          if (content.length < 2) {
            showFeedback('Please enter a comment with at least 2 characters.', true);
            return;
          }

          const submitBtn = formEl.querySelector('.blogpost__comment-submit');
          if (submitBtn) submitBtn.disabled = true;

          try {
            const payloadBody = {
              postSlug: slug,
              authorName: String(data.get('authorName') || '').trim() || undefined,
              authorEmail: String(data.get('authorEmail') || '').trim() || undefined,
              content,
              website: String(data.get('website') || ''),
            };
            if (parentId) payloadBody.parentId = parentId;

            const res = await fetch('/api/v1/comments', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
              body: JSON.stringify(payloadBody),
            });

            const payload = await res.json().catch(function () { return {}; });
            if (!res.ok) {
              showFeedback(payload.message || 'Could not post your comment. Please try again.', true);
              return;
            }

            formEl.reset();
            closeReplyForms();
            showFeedback(payload.message || 'Comment posted.', false);

            if (!moderate) {
              await reloadComments();
            }
          } catch (error) {
            showFeedback('Could not post your comment. Please try again.', true);
          } finally {
            if (submitBtn) submitBtn.disabled = false;
          }
        }

        list.addEventListener('click', function (event) {
          const replyBtn = event.target.closest('.blogpost__comment-reply-btn');
          if (replyBtn) {
            const article = replyBtn.closest('.blogpost__comment');
            const replyForm = article && article.querySelector('.blogpost__comment-reply-form');
            if (!replyForm) return;
            const isOpen = !replyForm.hidden;
            closeReplyForms();
            replyForm.hidden = isOpen;
            if (!isOpen) replyForm.querySelector('textarea')?.focus();
            return;
          }

          const cancelBtn = event.target.closest('.blogpost__comment-reply-cancel');
          if (cancelBtn) {
            const replyForm = cancelBtn.closest('.blogpost__comment-reply-form');
            if (replyForm) replyForm.hidden = true;
          }
        });

        list.addEventListener('submit', function (event) {
          const replyForm = event.target.closest('.blogpost__comment-reply-form');
          if (!replyForm) return;
          event.preventDefault();
          submitComment(replyForm, replyForm.dataset.parentId || null);
        });

        form.addEventListener('submit', function (event) {
          event.preventDefault();
          submitComment(form, null);
        });
      })();
    </script>
  `;
}
