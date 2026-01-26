// Map of country codes to Amazon domains
const amazonDomains: Record<string, string> = {
  // Europe
  DE: 'amazon.de',
  AT: 'amazon.de', // Austria uses German Amazon
  CH: 'amazon.de', // Switzerland uses German Amazon
  FR: 'amazon.fr',
  IT: 'amazon.it',
  ES: 'amazon.es',
  NL: 'amazon.nl',
  BE: 'amazon.nl', // Belgium uses Dutch Amazon
  PL: 'amazon.pl',
  SE: 'amazon.se',
  GB: 'amazon.co.uk',
  UK: 'amazon.co.uk',
  IE: 'amazon.co.uk', // Ireland uses UK Amazon
  
  // Other regions
  CA: 'amazon.ca',
  MX: 'amazon.com.mx',
  BR: 'amazon.com.br',
  AU: 'amazon.com.au',
  JP: 'amazon.co.jp',
  IN: 'amazon.in',
  AE: 'amazon.ae',
  SA: 'amazon.sa',
  SG: 'amazon.sg',
  
  // Default
  US: 'amazon.com',
};

// Cache the detected country
let cachedCountry: string | null = null;

// Detect country from browser timezone
function detectCountryFromTimezone(): string {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Map timezones to country codes
    const timezoneToCountry: Record<string, string> = {
      'Europe/Berlin': 'DE',
      'Europe/Vienna': 'AT',
      'Europe/Zurich': 'CH',
      'Europe/Paris': 'FR',
      'Europe/Rome': 'IT',
      'Europe/Madrid': 'ES',
      'Europe/Amsterdam': 'NL',
      'Europe/Brussels': 'BE',
      'Europe/Warsaw': 'PL',
      'Europe/Stockholm': 'SE',
      'Europe/London': 'GB',
      'Europe/Dublin': 'IE',
      'America/Toronto': 'CA',
      'America/Vancouver': 'CA',
      'America/Mexico_City': 'MX',
      'America/Sao_Paulo': 'BR',
      'Australia/Sydney': 'AU',
      'Australia/Melbourne': 'AU',
      'Asia/Tokyo': 'JP',
      'Asia/Kolkata': 'IN',
      'Asia/Dubai': 'AE',
      'Asia/Riyadh': 'SA',
      'Asia/Singapore': 'SG',
    };
    
    return timezoneToCountry[timezone] || 'US';
  } catch {
    return 'US';
  }
}

// Detect country from browser language as fallback
function detectCountryFromLanguage(): string {
  try {
    const language = navigator.language || 'en-US';
    const parts = language.split('-');
    
    if (parts.length >= 2) {
      const region = parts[1].toUpperCase();
      if (amazonDomains[region]) {
        return region;
      }
    }
    
    // Map language codes to likely countries
    const langToCountry: Record<string, string> = {
      de: 'DE',
      fr: 'FR',
      it: 'IT',
      es: 'ES',
      nl: 'NL',
      pl: 'PL',
      sv: 'SE',
      ja: 'JP',
      pt: 'BR',
    };
    
    const langCode = parts[0].toLowerCase();
    return langToCountry[langCode] || 'US';
  } catch {
    return 'US';
  }
}

export function getDetectedCountry(): string {
  if (cachedCountry) {
    return cachedCountry;
  }
  
  // Try timezone first (more accurate), then language
  let country = detectCountryFromTimezone();
  
  // If timezone detection returns US, double-check with language
  if (country === 'US') {
    const langCountry = detectCountryFromLanguage();
    if (langCountry !== 'US') {
      country = langCountry;
    }
  }
  
  cachedCountry = country;
  return country;
}

export function getAmazonDomain(): string {
  const country = getDetectedCountry();
  return amazonDomains[country] || 'amazon.com';
}

export function getAmazonSearchUrl(keyword: string): string {
  const domain = getAmazonDomain();
  return `https://www.${domain}/s?k=${encodeURIComponent(keyword)}`;
}
