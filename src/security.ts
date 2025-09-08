// Security protection utilities
export class SecurityProtection {
  private static instance: SecurityProtection;
  private isDevToolsOpen = false;
  private checkInterval: NodeJS.Timeout | null = null;

  private constructor() {
    this.initProtection();
  }

  public static getInstance(): SecurityProtection {
    if (!SecurityProtection.instance) {
      SecurityProtection.instance = new SecurityProtection();
    }
    return SecurityProtection.instance;
  }

  private initProtection(): void {
    // Disable right-click context menu
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.showWarning('Right-click disabled for security');
      return false;
    });

    // Disable F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S
    document.addEventListener('keydown', (e) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault();
        this.showWarning('Developer tools access denied');
        return false;
      }
      
      // Ctrl+Shift+I (DevTools)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        this.showWarning('Developer tools access denied');
        return false;
      }
      
      // Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        this.showWarning('Console access denied');
        return false;
      }
      
      // Ctrl+U (View Source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        this.showWarning('Source code access denied');
        return false;
      }
      
      // Ctrl+S (Save Page)
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        this.showWarning('Page saving disabled');
        return false;
      }
      
      // Ctrl+A (Select All)
      if (e.ctrlKey && e.key === 'a') {
        e.preventDefault();
        this.showWarning('Text selection disabled');
        return false;
      }
      
      // Ctrl+P (Print)
      if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        this.showWarning('Printing disabled');
        return false;
      }
    });

    // Disable text selection
    document.addEventListener('selectstart', (e) => {
      e.preventDefault();
      return false;
    });

    // Disable drag and drop
    document.addEventListener('dragstart', (e) => {
      e.preventDefault();
      return false;
    });

    // Monitor for developer tools
    this.startDevToolsDetection();

    // Disable console methods
    this.disableConsole();

    // Clear console periodically
    this.clearConsoleInterval();

    // Obfuscate source code
    this.obfuscateSource();
  }

  private startDevToolsDetection(): void {
    const threshold = 160;
    
    this.checkInterval = setInterval(() => {
      if (
        window.outerHeight - window.innerHeight > threshold ||
        window.outerWidth - window.innerWidth > threshold
      ) {
        if (!this.isDevToolsOpen) {
          this.isDevToolsOpen = true;
          this.handleDevToolsOpen();
        }
      } else {
        this.isDevToolsOpen = false;
      }
    }, 500);
  }

  private handleDevToolsOpen(): void {
    // Clear the page content
    document.body.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        color: #ff0000;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: monospace;
        font-size: 24px;
        z-index: 999999;
        text-align: center;
      ">
        <div>
          <div style="font-size: 48px; margin-bottom: 20px;">⚠️</div>
          <div>UNAUTHORIZED ACCESS DETECTED</div>
          <div style="font-size: 16px; margin-top: 20px; color: #888;">
            Developer tools usage is prohibited
          </div>
        </div>
      </div>
    `;
    
    // Redirect after delay
    setTimeout(() => {
      window.location.href = 'about:blank';
    }, 3000);
  }

  private disableConsole(): void {
    const noop = () => {};
    const methods = [
      'log', 'debug', 'info', 'warn', 'error', 'assert', 'dir', 'dirxml',
      'group', 'groupEnd', 'time', 'timeEnd', 'count', 'trace', 'profile', 'profileEnd'
    ];

    methods.forEach(method => {
      (console as any)[method] = noop;
    });

    // Override console object
    Object.defineProperty(window, 'console', {
      value: new Proxy(console, {
        get: () => noop,
        set: () => false
      }),
      writable: false,
      configurable: false
    });
  }

  private clearConsoleInterval(): void {
    setInterval(() => {
      try {
        console.clear();
      } catch (e) {
        // Ignore errors
      }
    }, 1000);
  }

  private obfuscateSource(): void {
    // Remove comments and format source
    const scripts = document.querySelectorAll('script');
    scripts.forEach(script => {
      if (script.src) return;
      
      const content = script.textContent || '';
      const obfuscated = content
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\/\/.*$/gm, '')
        .replace(/\s+/g, ' ')
        .trim();
      
      script.textContent = obfuscated;
    });
  }

  private showWarning(message: string): void {
    const warning = document.createElement('div');
    warning.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #ff4444, #cc0000);
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      font-family: monospace;
      font-size: 14px;
      z-index: 999999;
      box-shadow: 0 4px 20px rgba(255, 68, 68, 0.3);
      border: 1px solid #ff6666;
      animation: slideIn 0.3s ease-out;
    `;
    
    warning.textContent = `🔒 ${message}`;
    document.body.appendChild(warning);
    
    setTimeout(() => {
      warning.remove();
    }, 3000);
  }

  public destroy(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
  }
}

// CSS for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  * {
    -webkit-user-select: none !important;
    -moz-user-select: none !important;
    -ms-user-select: none !important;
    user-select: none !important;
    -webkit-touch-callout: none !important;
    -webkit-tap-highlight-color: transparent !important;
  }
  
  body {
    -webkit-user-select: none !important;
    -moz-user-select: none !important;
    -ms-user-select: none !important;
    user-select: none !important;
  }
`;
document.head.appendChild(style);