import { useState, FormEvent } from 'react';
import { KeyRound, Check } from 'lucide-react';
import { Language } from '../types.ts';
import { getSavedPassword, savePassword } from '../utils/storage.ts';

interface PasswordSettingsModalProps {
  onClose: () => void;
  lang: Language;
}

export function PasswordSettingsModal({ onClose, lang }: PasswordSettingsModalProps) {
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState('');

  const isHy = lang === 'hy';

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    const actualCurrent = getSavedPassword();
    if (currentPw !== actualCurrent && (actualCurrent || currentPw !== 'lusine')) {
      setError(isHy ? 'Ընթացիկ գաղտնաբառը սխալ է:' : 'Current passcode does not match.');
      return;
    }
    if (newPw.trim().length < 2) {
      setError(isHy ? 'Նոր գաղտնաբառը պետք է ունենա առնվազն 2 նիշ:' : 'New passcode must be at least 2 characters.');
      return;
    }
    savePassword(newPw.trim());
    setSavedSuccess(true);
    setTimeout(() => onClose(), 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-5 w-full max-w-sm shadow-xl border border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
              {isHy ? 'Փոխել գաղտնաբառը' : 'Change Passcode'}
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">✕</button>
        </div>

        {savedSuccess ? (
          <div className="text-center py-4 text-emerald-600">
            <Check className="w-8 h-8 mx-auto mb-1" />
            <p className="text-sm font-bold">{isHy ? 'Գաղտնաբառը թարմացվեց:' : 'Passcode updated successfully!'}</p>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                {isHy ? 'Ընթացիկ գաղտնաբառ' : 'Current Passcode'}
              </label>
              <input
                type="password"
                required
                value={currentPw}
                onChange={(e) => { setCurrentPw(e.target.value); setError(''); }}
                placeholder={isHy ? 'Լռելյայն՝ lusine' : 'Default: lusine'}
                className="w-full text-xs p-2 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                {isHy ? 'Նոր գաղտնաբառ' : 'New Passcode'}
              </label>
              <input
                type="text"
                required
                value={newPw}
                onChange={(e) => { setNewPw(e.target.value); setError(''); }}
                placeholder={isHy ? 'Նոր գաղտնաբառ...' : 'Your secret code...'}
                className="w-full text-xs p-2 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>
            {error && <p className="text-[11px] text-rose-600 font-semibold">{error}</p>}
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={onClose} className="px-3 py-1.5 text-xs text-gray-500">
                {isHy ? 'Չեղարկել' : 'Cancel'}
              </button>
              <button type="submit" className="px-4 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
                {isHy ? 'Թարմացնել' : 'Update'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
