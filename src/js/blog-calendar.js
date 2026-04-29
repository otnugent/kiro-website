/**
 * Blog calendar widget.
 * Reads post dates from data-date attributes on .timeline__entry elements,
 * renders an interactive monthly calendar, and highlights days with posts.
 */

export function initBlogCalendar() {
  const calDays    = document.getElementById('cal-days');
  const calLabel   = document.getElementById('cal-month-label');
  const calPosts   = document.getElementById('cal-posts');
  const postsLabel = document.getElementById('cal-posts-label');
  const postsList  = document.getElementById('cal-posts-list');
  const prevBtn    = document.getElementById('cal-prev');
  const nextBtn    = document.getElementById('cal-next');
  const jumpWeek   = document.getElementById('jump-week');
  const jumpMonth  = document.getElementById('jump-month');

  if (!calDays) return; // blog section not present

  // ── Collect post data from the timeline ──────────────────────────────────
  const entries = Array.from(document.querySelectorAll('.timeline__entry[data-date]'));
  const postsByDate = {}; // { 'YYYY-MM-DD': [{ title, link }] }

  entries.forEach(entry => {
    const dateStr = entry.getAttribute('data-date'); // YYYY-MM-DD
    const titleEl = entry.querySelector('.timeline__title');
    const linkEl  = entry.querySelector('.timeline__link');
    if (!dateStr || !titleEl) return;
    if (!postsByDate[dateStr]) postsByDate[dateStr] = [];
    postsByDate[dateStr].push({
      title: titleEl.textContent.trim(),
      link:  linkEl ? linkEl.getAttribute('href') : null,
      entry,
    });
  });

  // ── State ─────────────────────────────────────────────────────────────────
  const today    = new Date();
  let   viewYear = today.getFullYear();
  let   viewMonth = today.getMonth(); // 0-indexed
  let   selectedDate = null;

  // ── Render ────────────────────────────────────────────────────────────────
  function render() {
    const monthNames = [
      'January','February','March','April','May','June',
      'July','August','September','October','November','December'
    ];
    calLabel.textContent = `${monthNames[viewMonth]} ${viewYear}`;

    calDays.innerHTML = '';

    const firstDay = new Date(viewYear, viewMonth, 1).getDay(); // 0=Sun
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    // Leading empty cells
    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement('span');
      empty.className = 'cal__day cal__day--empty';
      empty.setAttribute('aria-hidden', 'true');
      calDays.appendChild(empty);
    }

    // Day cells
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const btn = document.createElement('button');
      btn.className = 'cal__day';
      btn.textContent = d;
      btn.setAttribute('aria-label', dateStr);
      btn.setAttribute('role', 'gridcell');

      const isToday = (
        d === today.getDate() &&
        viewMonth === today.getMonth() &&
        viewYear === today.getFullYear()
      );
      if (isToday) btn.classList.add('cal__day--today');

      if (postsByDate[dateStr]) {
        btn.classList.add('cal__day--has-post');
        btn.setAttribute('aria-label', `${dateStr} — ${postsByDate[dateStr].length} post(s)`);
      }

      if (selectedDate === dateStr) btn.classList.add('cal__day--selected');

      btn.addEventListener('click', () => selectDate(dateStr, btn));
      calDays.appendChild(btn);
    }
  }

  function selectDate(dateStr, btn) {
    selectedDate = dateStr;
    render(); // re-render to update selected state

    const posts = postsByDate[dateStr];
    if (!posts || posts.length === 0) {
      calPosts.hidden = true;
      return;
    }

    // Format display date
    const [y, m, d] = dateStr.split('-').map(Number);
    const display = new Date(y, m - 1, d).toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric'
    });

    postsLabel.textContent = `Posts on ${display}`;
    postsList.innerHTML = '';

    posts.forEach(({ title, link }) => {
      const li = document.createElement('li');
      li.className = 'cal__posts-item';
      if (link) {
        const a = document.createElement('a');
        a.href = link;
        a.textContent = title;
        a.className = 'cal__posts-link';
        li.appendChild(a);
      } else {
        li.textContent = title;
      }
      postsList.appendChild(li);
    });

    calPosts.hidden = false;

    // Scroll the matching timeline entry into view
    posts[0].entry.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // ── Navigation ────────────────────────────────────────────────────────────
  prevBtn.addEventListener('click', () => {
    viewMonth--;
    if (viewMonth < 0) { viewMonth = 11; viewYear--; }
    selectedDate = null;
    calPosts.hidden = true;
    render();
  });

  nextBtn.addEventListener('click', () => {
    viewMonth++;
    if (viewMonth > 11) { viewMonth = 0; viewYear++; }
    selectedDate = null;
    calPosts.hidden = true;
    render();
  });

  // ── Quick jump ────────────────────────────────────────────────────────────
  jumpWeek.addEventListener('click', () => {
    viewYear  = today.getFullYear();
    viewMonth = today.getMonth();
    render();
    // Find the nearest post within 7 days
    const nearest = entries.find(e => {
      const d = new Date(e.getAttribute('data-date'));
      const diff = Math.abs(today - d) / 86400000;
      return diff <= 7;
    });
    if (nearest) nearest.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  jumpMonth.addEventListener('click', () => {
    viewYear  = today.getFullYear();
    viewMonth = today.getMonth();
    render();
    const nearest = entries.find(e => {
      const d = new Date(e.getAttribute('data-date'));
      return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
    });
    if (nearest) nearest.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  // ── Initial render ────────────────────────────────────────────────────────
  render();
}
