import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations, Language } from '@/data/translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('en');

    const t = (key: string): string => {
        const keys = key.split('.');
        let value: any = translations[language];

        // Simple lookup, assumes flat structure for now based on translations.ts
        // If nested, would need traversal.
        // Our translations.ts is flat keys like "nav.home", so direct access works if we type it loosely
        // or we can just access directly if keys are strings.

        // Actually, translations.ts has keys like "nav.home" as direct properties.
        return (value as any)[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
