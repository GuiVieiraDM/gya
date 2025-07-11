import React from "react";
import { useTranslation, Trans } from 'react-i18next';

const PrivacyModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-2 sm:px-0">
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full flex flex-col items-center relative">
        <h2 className="text-2xl font-bold text-violet-700 mb-4 text-center">{t('privacy.title')}</h2>
        <div className="text-gray-800 text-sm sm:text-base text-left mb-6 space-y-3">
          <p>{t('privacy.p1')}</p>
          <p>{t('privacy.p2')}</p>
          <p><Trans i18nKey="privacy.contact"><a href="mailto:guivieiradm@gmail.com" className="text-violet-700 underline">guivieiradm@gmail.com</a></Trans></p>
        </div>
        <button
          className="bg-violet-700 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-violet-800 transition"
          onClick={onClose}
        >
          {t('privacy.button')}
        </button>
      </div>
    </div>
  );
};

export default PrivacyModal; 