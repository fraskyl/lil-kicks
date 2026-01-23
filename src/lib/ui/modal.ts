/**
 * Modal Module
 * Handles display and interaction with kick detail modals
 */

import type { Kick } from '../storage/kicks';

/**
 * Opens modal with detailed kick times for a specific time period
 * @param {string} title - Modal title (e.g., "9 PM Kicks" or "Monday, Jan 20")
 * @param {Kick[]} kicks - Array of kicks to display
 */
export function openKickModal(title: string, kicks: Kick[]): void {
  const modal = document.getElementById('kickModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  
  if (!modal || !modalTitle || !modalBody) return;
  
  // Set title
  modalTitle.textContent = title;
  
  // Sort kicks by time (most recent first)
  const sortedKicks = [...kicks].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  
  // Generate HTML for kicks
  if (sortedKicks.length === 0) {
    modalBody.innerHTML = '<div class="modal-empty">No kicks recorded</div>';
  } else {
    const kicksHTML = sortedKicks.map(kick => 
      `<span class="modal-kick-item">${kick.time}</span>`
    ).join('');
    modalBody.innerHTML = `
      <div class="modal-kicks-list">
        ${kicksHTML}
      </div>
      <div style="margin-top: 1rem; text-align: center; color: var(--cyan-darker); font-size: 0.9rem;">
        Total: ${sortedKicks.length} kick${sortedKicks.length !== 1 ? 's' : ''}
      </div>
    `;
  }
  
  // Show modal
  modal.classList.add('show');
}

/**
 * Closes the kick detail modal
 */
export function closeKickModal(): void {
  const modal = document.getElementById('kickModal');
  if (modal) {
    modal.classList.remove('show');
  }
}

/**
 * Filters kicks to only those in a specific hour
 * @param {Kick[]} kicks - All kicks to filter
 * @param {number} hour - Hour to filter (0-23)
 * @returns {Kick[]} Kicks that occurred in that hour
 */
export function getKicksForHour(kicks: Kick[], hour: number): Kick[] {
  return kicks.filter(kick => {
    const kickTime = new Date(kick.timestamp);
    return kickTime.getHours() === hour;
  });
}

/**
 * Filters kicks to only those on a specific date
 * @param {Kick[]} kicks - All kicks to filter
 * @param {string} date - Date string to match (from kick.date)
 * @returns {Kick[]} Kicks that occurred on that date
 */
export function getKicksForDate(kicks: Kick[], date: string): Kick[] {
  return kicks.filter(kick => kick.date === date);
}

/**
 * Initializes modal event handlers (close button, backdrop click, escape key)
 * Should be called once when the page loads
 */
export function initializeModalHandlers(): void {
  const modalClose = document.getElementById('modalClose');
  const kickModal = document.getElementById('kickModal');

  // Close button handler
  if (modalClose) {
    modalClose.addEventListener('click', closeKickModal);
  }

  if (kickModal) {
    // Close modal when clicking outside the modal content (backdrop)
    kickModal.addEventListener('click', function(e) {
      if (e.target === kickModal) {
        closeKickModal();
      }
    });
  }
  
  // Close modal on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeKickModal();
    }
  });
}