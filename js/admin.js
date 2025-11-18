/* ============================================
   ADMIN PANEL - WIDGET MANAGER

   Features:
   - Drag and drop widgets to reorder
   - Save/load widget order from localStorage
   - Show/hide individual widgets
   - Export/import layout configuration
   - Keyboard shortcuts (Ctrl+Shift+A)

   How to use:
   - Click the gear icon or press Ctrl+Shift+A
   - Drag widgets to reorder them
   - Changes save automatically
   ============================================ */

// ========================================
// ADMIN PANEL MANAGER
// Main admin functionality
// ========================================
const AdminPanel = {
    // Storage key for saving widget order
    STORAGE_KEY: 'portfolio_widget_order',
    VISIBILITY_KEY: 'portfolio_widget_visibility',

    // Current drag state
    draggedElement: null,
    draggedIndex: null,

    /**
     * Initialize the admin panel
     */
    init() {
        this.panel = document.getElementById('adminPanel');
        this.toggleBtn = document.getElementById('adminToggle');
        this.closeBtn = document.getElementById('adminClose');
        this.widgetList = document.getElementById('widgetList');
        this.resetBtn = document.getElementById('resetWidgetOrder');
        this.exportBtn = document.getElementById('exportLayout');

        if (!this.panel || !this.toggleBtn) {
            console.warn('[Admin] Admin panel elements not found');
            return;
        }

        // Set up event listeners
        this.setupEventListeners();

        // Load saved widget order
        this.loadWidgetOrder();

        // Populate widget list
        this.populateWidgetList();

        console.log('%c[✓] Admin panel initialized', 'color: #00ff00; font-weight: bold;');
    },

    /**
     * Set up all event listeners
     */
    setupEventListeners() {
        // Toggle button
        this.toggleBtn.addEventListener('click', () => this.togglePanel());

        // Close button
        this.closeBtn.addEventListener('click', () => this.closePanel());

        // Reset button
        this.resetBtn.addEventListener('click', () => this.resetWidgetOrder());

        // Export button
        this.exportBtn.addEventListener('click', () => this.exportLayout());

        // Keyboard shortcut: Ctrl+Shift+A
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'A') {
                e.preventDefault();
                this.togglePanel();
            }

            // Escape to close
            if (e.key === 'Escape' && this.panel.classList.contains('active')) {
                this.closePanel();
            }
        });

        // Close when clicking outside (optional)
        document.addEventListener('click', (e) => {
            if (this.panel.classList.contains('active') &&
                !this.panel.contains(e.target) &&
                !this.toggleBtn.contains(e.target)) {
                // Uncomment to enable click-outside-to-close
                // this.closePanel();
            }
        });
    },

    /**
     * Toggle admin panel open/closed
     */
    togglePanel() {
        this.panel.classList.toggle('active');

        // Log for debugging
        if (this.panel.classList.contains('active')) {
            console.log('[Admin] Panel opened');
            this.populateWidgetList(); // Refresh widget list
        } else {
            console.log('[Admin] Panel closed');
        }
    },

    /**
     * Close admin panel
     */
    closePanel() {
        this.panel.classList.remove('active');
        console.log('[Admin] Panel closed');
    },

    /**
     * Populate the widget list with draggable items
     */
    populateWidgetList() {
        if (!this.widgetList) return;

        // Get all widgets (sections with .widget class, excluding nav and footer)
        const widgets = Array.from(document.querySelectorAll('.widget')).filter(widget => {
            const id = widget.id;
            // Exclude navigation and footer from reordering
            return id && id !== 'navigation' && !widget.classList.contains('widget-footer');
        });

        // Clear existing list
        this.widgetList.innerHTML = '';

        // Load saved order
        const savedOrder = this.getSavedOrder();
        const savedVisibility = this.getSavedVisibility();

        // Sort widgets by saved order
        const orderedWidgets = this.sortWidgetsByOrder(widgets, savedOrder);

        // Create draggable items for each widget
        orderedWidgets.forEach((widget, index) => {
            const item = this.createWidgetItem(widget, index, savedVisibility);
            this.widgetList.appendChild(item);
        });
    },

    /**
     * Create a draggable widget item
     * @param {HTMLElement} widget - The widget element
     * @param {number} index - Widget index
     * @param {Object} visibility - Visibility settings
     * @returns {HTMLElement} Widget item element
     */
    createWidgetItem(widget, index, visibility) {
        const id = widget.id;
        const title = this.getWidgetTitle(widget);
        const isVisible = visibility[id] !== false; // Default to visible

        const item = document.createElement('div');
        item.className = 'widget-item';
        item.draggable = true;
        item.setAttribute('data-widget-id', id);

        item.innerHTML = `
            <span class="widget-order">${index + 1}</span>
            <div class="widget-item-header">
                <span class="widget-drag-handle">⋮⋮</span>
                <span class="widget-item-title">${title}</span>
            </div>
            <div class="widget-item-id">#${id}</div>
            <div class="widget-visibility">
                <input type="checkbox" id="visibility-${id}" ${isVisible ? 'checked' : ''}>
                <label for="visibility-${id}">Visible</label>
            </div>
        `;

        // Add drag event listeners
        this.setupDragListeners(item);

        // Add visibility toggle listener
        const checkbox = item.querySelector(`#visibility-${id}`);
        checkbox.addEventListener('change', (e) => {
            this.toggleWidgetVisibility(id, e.target.checked);
        });

        return item;
    },

    /**
     * Get a readable title for a widget
     * @param {HTMLElement} widget - Widget element
     * @returns {string} Widget title
     */
    getWidgetTitle(widget) {
        const id = widget.id;

        // Map of widget IDs to titles
        const titles = {
            'hero': 'Hero Section',
            'about': 'About Me',
            'skills': 'Skills & Expertise',
            'projects': 'Featured Projects',
            'certifications': 'Certifications',
            'contact': 'Contact Section'
        };

        return titles[id] || id.charAt(0).toUpperCase() + id.slice(1);
    },

    /**
     * Set up drag event listeners for a widget item
     * @param {HTMLElement} item - Widget item element
     */
    setupDragListeners(item) {
        // Drag start
        item.addEventListener('dragstart', (e) => {
            this.draggedElement = item;
            this.draggedIndex = Array.from(this.widgetList.children).indexOf(item);
            item.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', item.innerHTML);
        });

        // Drag end
        item.addEventListener('dragend', (e) => {
            item.classList.remove('dragging');
            this.saveCurrentOrder();
            this.populateWidgetList(); // Refresh to update numbers
        });

        // Drag over
        item.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';

            const afterElement = this.getDragAfterElement(e.clientY);
            const dragging = document.querySelector('.dragging');

            if (afterElement == null) {
                this.widgetList.appendChild(dragging);
            } else {
                this.widgetList.insertBefore(dragging, afterElement);
            }
        });

        // Drag enter
        item.addEventListener('dragenter', (e) => {
            e.preventDefault();
            if (item !== this.draggedElement) {
                item.classList.add('drag-over');
            }
        });

        // Drag leave
        item.addEventListener('dragleave', (e) => {
            item.classList.remove('drag-over');
        });

        // Drop
        item.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            item.classList.remove('drag-over');
        });
    },

    /**
     * Get the element that the dragged item should be inserted after
     * @param {number} y - Mouse Y position
     * @returns {HTMLElement|null} Element to insert after
     */
    getDragAfterElement(y) {
        const draggableElements = [...this.widgetList.querySelectorAll('.widget-item:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;

            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    },

    /**
     * Save the current widget order to localStorage
     */
    saveCurrentOrder() {
        const items = Array.from(this.widgetList.querySelectorAll('.widget-item'));
        const order = items.map(item => item.getAttribute('data-widget-id'));

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(order));
        this.applyWidgetOrder(order);
        this.showMessage('Widget order saved!', 'success');

        console.log('[Admin] Saved order:', order);
    },

    /**
     * Get saved widget order from localStorage
     * @returns {Array} Array of widget IDs
     */
    getSavedOrder() {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    },

    /**
     * Get saved widget visibility from localStorage
     * @returns {Object} Visibility settings
     */
    getSavedVisibility() {
        const saved = localStorage.getItem(this.VISIBILITY_KEY);
        return saved ? JSON.parse(saved) : {};
    },

    /**
     * Sort widgets by saved order
     * @param {Array} widgets - Array of widget elements
     * @param {Array} order - Saved order array
     * @returns {Array} Sorted widget elements
     */
    sortWidgetsByOrder(widgets, order) {
        if (order.length === 0) return widgets;

        return widgets.sort((a, b) => {
            const aIndex = order.indexOf(a.id);
            const bIndex = order.indexOf(b.id);

            // If not in saved order, put at end
            if (aIndex === -1) return 1;
            if (bIndex === -1) return -1;

            return aIndex - bIndex;
        });
    },

    /**
     * Apply widget order to the DOM
     * @param {Array} order - Array of widget IDs
     */
    applyWidgetOrder(order) {
        const body = document.body;
        const nav = document.querySelector('.widget-nav');
        const footer = document.querySelector('.widget-footer');

        order.forEach(widgetId => {
            const widget = document.getElementById(widgetId);
            if (widget && footer) {
                // Insert before footer
                body.insertBefore(widget, footer);
            }
        });
    },

    /**
     * Load and apply saved widget order
     */
    loadWidgetOrder() {
        const order = this.getSavedOrder();
        if (order.length > 0) {
            this.applyWidgetOrder(order);
            console.log('[Admin] Loaded widget order:', order);
        }

        // Load and apply visibility
        const visibility = this.getSavedVisibility();
        Object.keys(visibility).forEach(widgetId => {
            const widget = document.getElementById(widgetId);
            if (widget) {
                if (visibility[widgetId] === false) {
                    widget.style.display = 'none';
                } else {
                    widget.style.display = '';
                }
            }
        });
    },

    /**
     * Toggle widget visibility
     * @param {string} widgetId - Widget ID
     * @param {boolean} visible - Visibility state
     */
    toggleWidgetVisibility(widgetId, visible) {
        const widget = document.getElementById(widgetId);
        if (!widget) return;

        // Update DOM
        widget.style.display = visible ? '' : 'none';

        // Save to localStorage
        const visibility = this.getSavedVisibility();
        visibility[widgetId] = visible;
        localStorage.setItem(this.VISIBILITY_KEY, JSON.stringify(visibility));

        this.showMessage(
            `${this.getWidgetTitle(widget)} ${visible ? 'shown' : 'hidden'}`,
            'info'
        );

        console.log(`[Admin] Widget ${widgetId} visibility:`, visible);
    },

    /**
     * Reset widget order to default
     */
    resetWidgetOrder() {
        if (!confirm('Reset widget order to default? This will reload the page.')) {
            return;
        }

        // Clear saved data
        localStorage.removeItem(this.STORAGE_KEY);
        localStorage.removeItem(this.VISIBILITY_KEY);

        this.showMessage('Widget order reset! Reloading...', 'success');

        // Reload page after short delay
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    },

    /**
     * Export current layout configuration
     */
    exportLayout() {
        const order = this.getSavedOrder();
        const visibility = this.getSavedVisibility();

        const config = {
            order: order,
            visibility: visibility,
            timestamp: new Date().toISOString()
        };

        const json = JSON.stringify(config, null, 2);

        // Copy to clipboard
        navigator.clipboard.writeText(json).then(() => {
            this.showMessage('Layout exported to clipboard!', 'success');
            console.log('[Admin] Exported layout:', config);
        }).catch(err => {
            console.error('[Admin] Failed to copy:', err);
            this.showMessage('Failed to copy to clipboard', 'error');

            // Fallback: show in alert
            alert('Layout configuration:\n\n' + json);
        });
    },

    /**
     * Show a temporary message
     * @param {string} message - Message text
     * @param {string} type - Message type (success, error, info)
     */
    showMessage(message, type = 'info') {
        // Create message element
        const msgEl = document.createElement('div');
        msgEl.className = `admin-message ${type}`;
        msgEl.textContent = message;

        document.body.appendChild(msgEl);

        // Remove after 3 seconds
        setTimeout(() => {
            msgEl.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => msgEl.remove(), 300);
        }, 3000);
    }
};

// ========================================
// AUTO-INITIALIZE
// Initialize when DOM is ready
// ========================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => AdminPanel.init());
} else {
    AdminPanel.init();
}

// ========================================
// EXPORT FOR USE IN OTHER SCRIPTS
// ========================================
if (typeof window !== 'undefined') {
    window.AdminPanel = AdminPanel;
}
