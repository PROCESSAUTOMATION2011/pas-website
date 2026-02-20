# Testing the 15 Years Anniversary Popup

## Issue: Popup not appearing

### Quick Fix - Clear localStorage

The popup uses localStorage to remember if you've seen it. To see it again:

1. **Open Browser Console** (F12)
2. **Run this command:**
   ```javascript
   localStorage.removeItem('pas_15years_popup_seen');
   ```
3. **Refresh the page** (F5)

The popup should appear after 1 second.

---

### Alternative: Force Show in Development

If you want to always show it in development mode, edit `src/components/AnniversaryPopup.jsx`:

Find this line (around line 13):
```javascript
const hasSeenPopup = localStorage.getItem('pas_15years_popup_seen');
```

Add this line right after it:
```javascript
localStorage.removeItem('pas_15years_popup_seen'); // Force show for testing
```

Then rebuild:
```bash
npm run build
npm run server
```

---

### Check Console for Debug Messages

The popup logs messages to console:
- `🎉 Showing 15 Years Anniversary Popup!` - Popup is showing
- `ℹ️ Popup already seen...` - Popup is hidden because localStorage flag is set

---

### Verify Component is Loaded

1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for any error messages
4. Check if `AnniversaryPopup` component is in the React component tree

---

### Manual Test

To manually trigger the popup, add this to browser console:
```javascript
// Force show popup
const event = new CustomEvent('showAnniversaryPopup');
window.dispatchEvent(event);
```

Then refresh the page.





