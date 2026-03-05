export default function ({ app, $axios }, inject) {
  if (!process.client) return
  
  let currentVersion = null
  let checkInterval = null
  let failedChecks = 0
  const MAX_FAILED_CHECKS = 3
  const NOTIFICATION_ID = 'app-update-notification'

  fetchVersion()
  
  startVersionChecking()

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      console.log('[VersionCheck] Tab active, checking...')
      fetchVersion()
    }
  })
  
  function startVersionChecking() {
    if (checkInterval) clearInterval(checkInterval)
    checkInterval = setInterval(() => fetchVersion(), 60000)
  }
  
  async function fetchVersion() {
    if (document.getElementById(NOTIFICATION_ID)) return

    try {
      const data = await $axios.$get('/v1/api/version', {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      })

      failedChecks = 0

      if (!currentVersion) {
        currentVersion = data.version
        console.log('[VersionCheck] Initial version set:', currentVersion)
        return
      }


      if (currentVersion !== data.version) {
        console.log(`[VersionCheck] Update found: ${currentVersion} → ${data.version}`)

        clearInterval(checkInterval)
        
        showUpdateNotification(data.version)
      }
      
    } catch (error) {
      console.error('[VersionCheck] Request failed:', error)
      failedChecks++

      if (failedChecks >= MAX_FAILED_CHECKS) {
        console.warn('[VersionCheck] Max failures reached. Throttling checks.')
        clearInterval(checkInterval)
        checkInterval = setInterval(() => fetchVersion(), 300000)
      }
    }
  }
  
  function showUpdateNotification(newVersion) {
    if (document.getElementById(NOTIFICATION_ID)) {
      return
    }

    if (!document.getElementById('update-notification-styles')) {
      const style = document.createElement('style')
      style.id = 'update-notification-styles'
      style.textContent = `
        @keyframes slideInUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        #${NOTIFICATION_ID} {
          position: fixed; bottom: 20px; right: 20px;
          background: #2D3748; color: white;
          padding: 20px; border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          z-index: 2147483647; /* Max possible z-index */
          font-family: system-ui, -apple-system, sans-serif;
          display: flex; align-items: center; gap: 20px;
          animation: slideInUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid rgba(255,255,255,0.1);
        }
        #${NOTIFICATION_ID} button {
          background: #4CAF50; color: white; border: none;
          padding: 10px 18px; border-radius: 6px;
          cursor: pointer; font-weight: 600; transition: background 0.2s;
        }
        #${NOTIFICATION_ID} button:hover { background: #45a049; }
      `
      document.head.appendChild(style)
    }

    const notification = document.createElement('div')
    notification.id = NOTIFICATION_ID
    notification.innerHTML = `
      <div>
        <div style="font-weight: bold; font-size: 16px;">🚀 New Version Ready</div>
        <div id="countdown-text" style="font-size: 13px; color: #A0AEC0; margin-top: 4px;">
          Auto-refreshing in 5 seconds...
        </div>
      </div>
      <button id="refresh-btn">Update Now</button>
    `
    document.body.appendChild(notification)

    let secondsLeft = 5
    const timer = setInterval(() => {
      secondsLeft--
      const textEl = document.getElementById('countdown-text')
      if (textEl) {
        textEl.textContent = `Auto-refreshing in ${secondsLeft} seconds...`
      }
      
      if (secondsLeft <= 0) {
        clearInterval(timer)
        forceReload()
      }
    }, 1000)

    document.getElementById('refresh-btn').onclick = () => {
      clearInterval(timer)
      forceReload()
    }
  }
  
  function forceReload() {
    console.log('[VersionCheck] Executing hard reload...')
    try {
      sessionStorage.setItem('lastVersion', currentVersion)
      sessionStorage.setItem('reloadReason', 'version-update')
    } catch (e) {}

    window.location.reload(true)
  }
}