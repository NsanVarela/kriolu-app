export interface TranslationRequest {
  text: string;
  sourceLanguage?: 'kr' | 'fr' | 'auto';
}

export interface TranslationResponse {
  translatedText: string;
  glossary: GlossaryEntry[];
  sourceLanguage: 'kr' | 'fr';
  targetLanguage: 'fr' | 'kr';
}

export interface GlossaryEntry {
  word: string;
  meaning: string;
}

export interface SavedPhrase {
  id?: string;
  kriolText: string;
  frenchText: string;
  category: 'Essentiels' | 'Restaurant' | 'Transports' | 'Marché' | 'Mes phrases';
  userId?: string;
  createdAt?: string;
}

export interface PhraseCategory {
  name: 'Essentiels' | 'Restaurant' | 'Transports' | 'Marché' | 'Mes phrases';
  icon?: string;
}
