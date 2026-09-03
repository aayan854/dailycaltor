const fs = require('fs');
const path = require('path');

const locales = ['en', 'de', 'pt-br', 'hi', 'es', 'fr', 'it', 'ja', 'ar', 'ko'];
const translations = {
  'en': 'Work Hours Calculator',
  'de': 'Arbeitszeitrechner',
  'pt-br': 'Calculadora de Horas de Trabalho',
  'es': 'Calculadora de Horas de Trabajo',
  'fr': 'Calculateur d\'Heures de Travail',
  'it': 'Calcolatore di Ore Lavorative',
  'hi': 'कार्य घंटे कैलकुलेटर',
  'ja': '労働時間計算機',
  'ar': 'حاسبة ساعات العمل',
  'ko': '근무 시간 계산기'
};

locales.forEach(loc => {
  const filePath = path.join(__dirname, 'messages', loc + '.json');
  if (fs.existsSync(filePath)) {
    let raw = fs.readFileSync(filePath, 'utf8');
    if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
    const data = JSON.parse(raw);
    data.Tools['work-hours-calculator'] = translations[loc];
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log('Updated ' + loc);
  }
});
