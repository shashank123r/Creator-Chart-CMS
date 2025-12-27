import React, { useEffect } from 'react';

interface Shortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  action: () => void;
  description: string;
}

export const useKeyboardShortcuts = (shortcuts: Shortcut[]) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      shortcuts.forEach(shortcut => {
        const ctrlMatch = shortcut.ctrl ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey;
        const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;
        const altMatch = shortcut.alt ? event.altKey : !event.altKey;
        const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();

        if (ctrlMatch && shiftMatch && altMatch && keyMatch) {
          event.preventDefault();
          shortcut.action();
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};

export const KeyboardShortcutsHelp: React.FC<{ shortcuts: Shortcut[]; onClose?: () => void }> = ({ shortcuts, onClose }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        onClose?.();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.shortcuts-modal')) {
        setIsOpen(false);
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="shortcuts-modal bg-white rounded-lg shadow-xl max-w-2xl w-full p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Keyboard Shortcuts</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>
        <div className="space-y-2">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b">
              <span className="text-sm text-gray-700">{shortcut.description}</span>
              <kbd className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-mono">
                {shortcut.ctrl && 'Ctrl + '}
                {shortcut.shift && 'Shift + '}
                {shortcut.alt && 'Alt + '}
                {shortcut.key.toUpperCase()}
              </kbd>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-gray-500 text-center">
          Press Ctrl+Shift+? to toggle this help
        </p>
      </div>
    </div>
  );
};

