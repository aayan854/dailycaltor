const fs = require('fs');
const path = require('path');

const locales = ['de', 'pt-br', 'hi', 'es', 'fr', 'it', 'ja', 'ar', 'ko'];

const translations = {
  'de': {
    inputs: "Eingaben", results: "Ergebnisse", optional: "(Optional)", calculate: "Berechnen",
    weightKg: "Gewicht (kg)", heightCm: "Größe (cm)", age: "Alter", sex: "Geschlecht", male: "Männlich", female: "Weiblich",
    cpa: { title: "Werbekampagnen-Eingaben", desc: "Geben Sie Ihre Werbekennzahlen ein", adSpend: "Gesamte Werbeausgaben", clicks: "Klicks", conversions: "Conversions (Käufe/Leads)", aov: "Durchschnittlicher Bestellwert", margin: "Nettogewinnmarge (%)", cpa: "CPA (Kosten pro Akquisition)", roas: "ROAS", convRate: "Conversion-Rate", revenue: "Gesamtumsatz", profit: "Nettogewinn (nach Werbung)" },
    bmi: { title: "Ihre Körperwerte", desc: "Geben Sie Gewicht und Größe ein, um den BMI zu berechnen.", bmi: "Body Mass Index (BMI)", category: "Kategorie", info1: "Der BMI ist eine einfache Berechnung aus Größe und Gewicht.", info2: "Standardkategorien:", under: "Untergewicht", normal: "Normalgewicht", over: "Übergewicht", obese: "Adipositas" },
    ecommerce: { title: "Produkt- & Verkaufsdaten", desc: "Geben Sie Produktkosten und Verkaufskennzahlen ein", price: "Verkaufspreis", cogs: "Produktkosten (COGS)", qty: "Verkaufte Menge", shipping: "Versandkosten pro Artikel", paymentFeePct: "Zahlungsanbieter-Gebühr (%)", paymentFeeFix: "Zahlungsanbieter-Gebühr (Fix)", platformFeePct: "Plattform-Gebühr (%)", platformFeeFix: "Plattform-Gebühr (Fix)", adSpend: "Werbeausgaben", refunds: "Rückerstattungsrate (%)", discount: "Rabatt (%)", fixedCosts: "Sonstige Fixkosten", grossProfit: "Bruttogewinn", netProfit: "Nettogewinn", margin: "Nettomarge", profitPerOrder: "Gewinn pro Bestellung", breakEven: "Break-Even Bestellungen" },
    saas: { title: "SaaS-Kennzahlen", desc: "Geben Sie Ihre Software-Geschäftskennzahlen ein", arpu: "Durchschnittlicher Umsatz pro Nutzer (ARPU)", cac: "Kundenakquisitionskosten (CAC)", churn: "Monatliche Churn-Rate (%)", grossMargin: "Bruttomarge (%)", customers: "Gesamtkunden", fixedCosts: "Feste monatliche Kosten", ltv: "Customer Lifetime Value (LTV)", ltvCac: "LTV:CAC Verhältnis", mrr: "Monatlich wiederkehrender Umsatz (MRR)", runway: "Monate zur Amortisation des CAC" },
    profitMargin: { title: "Kosten & Umsatz", desc: "Berechnen Sie Ihre Margen", cost: "Gesamtkosten", revenue: "Gesamtumsatz", gross: "Bruttomarge", markup: "Aufschlag", profit: "Gewinn" },
    roas: { title: "Marge & Kosten", desc: "Berechnen Sie die Break-Even Werbeausgaben", price: "Produktpreis", cogs: "Herstellungskosten", shipping: "Versandkosten", fees: "Sonstige Gebühren", breakevenRoas: "Break-Even ROAS", breakevenCpa: "Break-Even CPA", profitPerSale: "Gewinn pro Verkauf" },
    nutrition: { title: "Ihr Profil", desc: "Geben Sie Ihre Daten ein", foods: "Heute gegessene Lebensmittel", noFoods: "Noch keine Lebensmittel hinzugefügt.", disclaimer: "Ernährungshinweis: DailyCaltor bietet allgemeine Ernährungsinformationen nur zu Bildungszwecken.", calories: "Kalorien", protein: "Protein (g)", carbs: "Kohlenhydrate (g)", fat: "Fett (g)", status: "Geschätzter Nährstoffstatus", micro: "Mikronährstoffe", onTrack: "Auf Kurs", gap: "Mittlere Lücke", low: "Niedriger als Referenzwert" },
    meal: { title: "Diätziele", desc: "Geben Sie Ihre täglichen Makro-Ziele ein", targetCal: "Zielkalorien (kcal)", targetPro: "Zielprotein (g)", mealsPerDay: "Mahlzeiten pro Tag", generate: "Mahlzeitenplan erstellen", yourPlan: "Ihr Mahlzeitenplan", totalCal: "Gesamtkalorien", totalPro: "Gesamtprotein (g)" }
  },
  'pt-br': {
    inputs: "Entradas", results: "Resultados", optional: "(Opcional)", calculate: "Calcular",
    weightKg: "Peso (kg)", heightCm: "Altura (cm)", age: "Idade", sex: "Sexo", male: "Masculino", female: "Feminino",
    cpa: { title: "Entradas da Campanha", desc: "Insira suas métricas de publicidade", adSpend: "Gasto Total com Anúncios", clicks: "Cliques", conversions: "Conversões (Compras/Leads)", aov: "Valor Médio do Pedido", margin: "Margem de Lucro Líquido (%)", cpa: "CPA (Custo por Aquisição)", roas: "ROAS", convRate: "Taxa de Conversão", revenue: "Receita Total", profit: "Lucro Líquido (Após Anúncios)" },
    bmi: { title: "Suas Métricas Corporais", desc: "Insira seu peso e altura para calcular o IMC.", bmi: "Índice de Massa Corporal (IMC)", category: "Categoria", info1: "O IMC é um cálculo simples usando altura e peso.", info2: "Categorias Padrão:", under: "Abaixo do peso", normal: "Peso normal", over: "Sobrepeso", obese: "Obeso" },
    ecommerce: { title: "Dados de Produtos e Vendas", desc: "Insira custos e métricas de vendas", price: "Preço de Venda", cogs: "Custo do Produto (COGS)", qty: "Quantidade Vendida", shipping: "Custo de Envio por Item", paymentFeePct: "Taxa de Pagamento (%)", paymentFeeFix: "Taxa de Pagamento (Fixa)", platformFeePct: "Taxa da Plataforma (%)", platformFeeFix: "Taxa da Plataforma (Fixa)", adSpend: "Gasto com Publicidade", refunds: "Taxa de Reembolso (%)", discount: "Desconto (%)", fixedCosts: "Outras Despesas Fixas", grossProfit: "Lucro Bruto", netProfit: "Lucro Líquido", margin: "Margem Líquida", profitPerOrder: "Lucro por Pedido", breakEven: "Pedidos para Break-Even" },
    saas: { title: "Métricas de SaaS", desc: "Insira as métricas do seu negócio", arpu: "Receita Média por Usuário (ARPU)", cac: "Custo de Aquisição de Clientes (CAC)", churn: "Taxa de Churn Mensal (%)", grossMargin: "Margem Bruta (%)", customers: "Total de Clientes", fixedCosts: "Custos Fixos Mensais", ltv: "Valor do Tempo de Vida (LTV)", ltvCac: "Relação LTV:CAC", mrr: "Receita Recorrente Mensal (MRR)", runway: "Meses para Recuperar o CAC" },
    profitMargin: { title: "Custos e Receitas", desc: "Calcule suas margens", cost: "Custo Total", revenue: "Receita Total", gross: "Margem Bruta", markup: "Markup", profit: "Lucro" },
    roas: { title: "Margem e Custos", desc: "Calcule o break-even", price: "Preço do Produto", cogs: "Custo das Mercadorias", shipping: "Custo de Envio", fees: "Taxas Diversas", breakevenRoas: "ROAS de Break-Even", breakevenCpa: "CPA de Break-Even", profitPerSale: "Lucro por Venda" },
    nutrition: { title: "Seu Perfil", desc: "Insira seus dados", foods: "Alimentos Consumidos Hoje", noFoods: "Nenhum alimento adicionado.", disclaimer: "Aviso de Nutrição: O DailyCaltor fornece informações apenas para fins educacionais.", calories: "Calorias", protein: "Proteína (g)", carbs: "Carboidratos (g)", fat: "Gordura (g)", status: "Status de Nutrientes", micro: "Micronutrientes", onTrack: "No Caminho", gap: "Lacuna Moderada", low: "Abaixo da Referência" },
    meal: { title: "Metas de Dieta", desc: "Insira suas metas diárias", targetCal: "Calorias Alvo (kcal)", targetPro: "Proteína Alvo (g)", mealsPerDay: "Refeições por Dia", generate: "Gerar Plano de Refeições", yourPlan: "Seu Plano de Refeições", totalCal: "Total de Calorias", totalPro: "Total de Proteína (g)" }
  },
  'es': {
    inputs: "Entradas", results: "Resultados", optional: "(Opcional)", calculate: "Calcular",
    weightKg: "Peso (kg)", heightCm: "Altura (cm)", age: "Edad", sex: "Sexo", male: "Hombre", female: "Mujer",
    cpa: { title: "Datos de la Campaña", desc: "Ingrese sus métricas de publicidad", adSpend: "Gasto en Publicidad", clicks: "Clics", conversions: "Conversiones", aov: "Valor Medio del Pedido", margin: "Margen de Beneficio Neto (%)", cpa: "CPA", roas: "ROAS", convRate: "Tasa de Conversión", revenue: "Ingresos Totales", profit: "Beneficio Neto (Después de Anuncios)" },
    bmi: { title: "Tus Métricas Corporales", desc: "Ingresa tu peso y altura.", bmi: "Índice de Masa Corporal (IMC)", category: "Categoría", info1: "El IMC es un cálculo sencillo.", info2: "Categorías Estándar:", under: "Bajo peso", normal: "Peso normal", over: "Sobrepeso", obese: "Obeso" },
    ecommerce: { title: "Datos de Productos", desc: "Ingrese costos y ventas", price: "Precio de Venta", cogs: "Costo del Producto", qty: "Cantidad Vendida", shipping: "Costo de Envío", paymentFeePct: "Tarifa de Pago (%)", paymentFeeFix: "Tarifa de Pago (Fijo)", platformFeePct: "Tarifa de Plataforma (%)", platformFeeFix: "Tarifa de Plataforma (Fijo)", adSpend: "Gasto en Publicidad", refunds: "Tasa de Reembolso (%)", discount: "Descuento (%)", fixedCosts: "Gastos Fijos", grossProfit: "Beneficio Bruto", netProfit: "Beneficio Neto", margin: "Margen Neto", profitPerOrder: "Beneficio por Pedido", breakEven: "Pedidos para Break-Even" },
    saas: { title: "Métricas SaaS", desc: "Ingrese las métricas de su software", arpu: "ARPU", cac: "CAC", churn: "Tasa de Churn (%)", grossMargin: "Margen Bruto (%)", customers: "Clientes Totales", fixedCosts: "Costos Fijos", ltv: "LTV", ltvCac: "Ratio LTV:CAC", mrr: "MRR", runway: "Meses para Recuperar CAC" },
    profitMargin: { title: "Costos y Beneficios", desc: "Calcule sus márgenes", cost: "Costo Total", revenue: "Ingresos Totales", gross: "Margen Bruto", markup: "Margen de Beneficio", profit: "Beneficio" },
    roas: { title: "Margem y Costos", desc: "Calcule el ROAS de equilibrio", price: "Precio del Producto", cogs: "Costo de los Bienes Vendidos", shipping: "Costo de Envío", fees: "Tarifas Diversas", breakevenRoas: "ROAS de Equilibrio", breakevenCpa: "CPA de Equilibrio", profitPerSale: "Beneficio por Venta" },
    nutrition: { title: "Tu Perfil", desc: "Ingresa tus detalles", foods: "Alimentos Consumidos", noFoods: "No hay alimentos.", disclaimer: "Aviso: Información educativa.", calories: "Calorías", protein: "Proteína (g)", carbs: "Carbohidratos (g)", fat: "Grasa (g)", status: "Estado Nutricional", micro: "Micronutrientes", onTrack: "En Camino", gap: "Brecha Moderada", low: "Por Debajo" },
    meal: { title: "Metas de Dieta", desc: "Metas diarias", targetCal: "Calorías Objetivo", targetPro: "Proteína Objetivo (g)", mealsPerDay: "Comidas por Día", generate: "Generar Plan", yourPlan: "Tu Plan de Comidas", totalCal: "Calorías Totales", totalPro: "Proteína Total (g)" }
  },
  'fr': {
    inputs: "Entrées", results: "Résultats", optional: "(Optionnel)", calculate: "Calculer",
    weightKg: "Poids (kg)", heightCm: "Taille (cm)", age: "Âge", sex: "Sexe", male: "Homme", female: "Femme",
    cpa: { title: "Données de la Campagne", desc: "Vos mesures publicitaires", adSpend: "Dépenses Publicitaires", clicks: "Clics", conversions: "Conversions", aov: "Panier Moyen", margin: "Marge Nette (%)", cpa: "CPA", roas: "ROAS", convRate: "Taux de Conversion", revenue: "Revenu Total", profit: "Bénéfice Net" },
    bmi: { title: "Vos Mesures", desc: "Entrez votre poids et taille.", bmi: "IMC", category: "Catégorie", info1: "L'IMC est un calcul simple.", info2: "Catégories Standard:", under: "Insuffisance pondérale", normal: "Poids normal", over: "Surpoids", obese: "Obèse" },
    ecommerce: { title: "Produits et Ventes", desc: "Coûts et ventes", price: "Prix de Vente", cogs: "Coût du Produit", qty: "Quantité Vendue", shipping: "Frais de Port", paymentFeePct: "Frais de Paiement (%)", paymentFeeFix: "Frais de Paiement (Fixe)", platformFeePct: "Frais de Plateforme (%)", platformFeeFix: "Frais de Plateforme (Fixe)", adSpend: "Dépenses Publicitaires", refunds: "Taux de Remboursement (%)", discount: "Réduction (%)", fixedCosts: "Frais Fixes", grossProfit: "Bénéfice Brut", netProfit: "Bénéfice Net", margin: "Marge Nette", profitPerOrder: "Bénéfice par Commande", breakEven: "Commandes de Seuil de Rentabilité" },
    saas: { title: "Métriques SaaS", desc: "Vos mesures logicielles", arpu: "ARPU", cac: "CAC", churn: "Taux de Désabonnement (%)", grossMargin: "Marge Brute (%)", customers: "Clients Totaux", fixedCosts: "Coûts Fixes", ltv: "LTV", ltvCac: "Ratio LTV:CAC", mrr: "MRR", runway: "Mois pour récupérer le CAC" },
    profitMargin: { title: "Coûts et Revenus", desc: "Calculez vos marges", cost: "Coût Total", revenue: "Revenu Total", gross: "Marge Brute", markup: "Marge Commerciale", profit: "Bénéfice" },
    roas: { title: "Marge et Coûts", desc: "Calculer le ROAS d'équilibre", price: "Prix du Produit", cogs: "Coût des Marchandises", shipping: "Frais de Port", fees: "Frais Divers", breakevenRoas: "ROAS d'Équilibre", breakevenCpa: "CPA d'Équilibre", profitPerSale: "Bénéfice par Vente" },
    nutrition: { title: "Votre Profil", desc: "Entrez vos détails", foods: "Alimentos Consommés", noFoods: "Aucun aliment.", disclaimer: "Avis: Informations éducatives.", calories: "Calories", protein: "Protéines (g)", carbs: "Glucides (g)", fat: "Lipides (g)", status: "Statut Nutritionnel", micro: "Micronutriments", onTrack: "En Bonne Voie", gap: "Écart Modéré", low: "Inférieur" },
    meal: { title: "Objectifs de Régime", desc: "Objectifs quotidiens", targetCal: "Calories Cibles", targetPro: "Protéines Cibles (g)", mealsPerDay: "Repas par Jour", generate: "Générer un Plan", yourPlan: "Votre Plan de Repas", totalCal: "Calories Totales", totalPro: "Protéines Totales (g)" }
  },
  'it': {
    inputs: "Dati", results: "Risultati", optional: "(Opzionale)", calculate: "Calcola",
    weightKg: "Peso (kg)", heightCm: "Altezza (cm)", age: "Età", sex: "Sesso", male: "Maschio", female: "Femmina",
    cpa: { title: "Dati Campagna", desc: "Inserisci metriche pubblicitarie", adSpend: "Spesa Pubblicitaria", clicks: "Clic", conversions: "Conversioni", aov: "Valore Medio Ordine", margin: "Margine Netto (%)", cpa: "CPA", roas: "ROAS", convRate: "Tasso di Conversione", revenue: "Entrate Totali", profit: "Profitto Netto" },
    bmi: { title: "Tua Metriche", desc: "Inserisci peso e altezza.", bmi: "IMC", category: "Categoria", info1: "L'IMC è un calcolo semplice.", info2: "Categorie Standard:", under: "Sottopeso", normal: "Normopeso", over: "Sovrappeso", obese: "Obeso" },
    ecommerce: { title: "Dati Prodotti", desc: "Costi e vendite", price: "Prezzo di Vendita", cogs: "Costo Prodotto", qty: "Quantità", shipping: "Costo Spedizione", paymentFeePct: "Tariffa Pagamento (%)", paymentFeeFix: "Tariffa Pagamento (Fissa)", platformFeePct: "Tariffa Piattaforma (%)", platformFeeFix: "Tariffa Piattaforma (Fissa)", adSpend: "Spesa Pubblicitaria", refunds: "Tasso Rimborso (%)", discount: "Sconto (%)", fixedCosts: "Costi Fissi", grossProfit: "Profitto Lordo", netProfit: "Profitto Netto", margin: "Margine Netto", profitPerOrder: "Profitto per Ordine", breakEven: "Ordini Pareggio" },
    saas: { title: "Metriche SaaS", desc: "Le tue metriche", arpu: "ARPU", cac: "CAC", churn: "Tasso Abbandono (%)", grossMargin: "Margine Lordo (%)", customers: "Clienti Totali", fixedCosts: "Costi Fissi", ltv: "LTV", ltvCac: "Rapporto LTV:CAC", mrr: "MRR", runway: "Mesi per recuperare CAC" },
    profitMargin: { title: "Costi ed Entrate", desc: "Calcola i margini", cost: "Costo Totale", revenue: "Entrate Totali", gross: "Margine Lordo", markup: "Ricarico", profit: "Profitto" },
    roas: { title: "Margine e Costi", desc: "Calcola il ROAS di pareggio", price: "Prezzo Prodotto", cogs: "Costo Merci", shipping: "Costo Spedizione", fees: "Commissioni Varie", breakevenRoas: "ROAS Pareggio", breakevenCpa: "CPA Pareggio", profitPerSale: "Profitto per Vendita" },
    nutrition: { title: "Tuo Profilo", desc: "Inserisci dettagli", foods: "Alimenti Consumati", noFoods: "Nessun alimento.", disclaimer: "Avviso: Solo scopo educativo.", calories: "Calorie", protein: "Proteine (g)", carbs: "Carboidrati (g)", fat: "Grassi (g)", status: "Stato Nutrizionale", micro: "Micronutrienti", onTrack: "In Linea", gap: "Divario Moderato", low: "Inferiore" },
    meal: { title: "Obiettivi Dieta", desc: "Obiettivi giornalieri", targetCal: "Calorie Obiettivo", targetPro: "Proteine Obiettivo (g)", mealsPerDay: "Pasti al Giorno", generate: "Genera Piano", yourPlan: "Tuo Piano Pasti", totalCal: "Calorie Totali", totalPro: "Proteine Totali (g)" }
  },
  'hi': {
    inputs: "इनपुट्स", results: "परिणाम", optional: "(वैकल्पिक)", calculate: "गणना करें",
    weightKg: "वज़न (kg)", heightCm: "लंबाई (cm)", age: "उम्र", sex: "लिंग", male: "पुरुष", female: "महिला",
    cpa: { title: "विज्ञापन अभियान", desc: "विज्ञापन मेट्रिक्स दर्ज करें", adSpend: "कुल विज्ञापन खर्च", clicks: "क्लिक्स", conversions: "कनवर्ज़न", aov: "औसत ऑर्डर वैल्यू", margin: "नेट प्रॉफिट मार्जिन (%)", cpa: "CPA", roas: "ROAS", convRate: "कनवर्ज़न रेट", revenue: "कुल राजस्व", profit: "शुद्ध लाभ" },
    bmi: { title: "बॉडी मेट्रिक्स", desc: "BMI की गणना करें", bmi: "BMI", category: "श्रेणी", info1: "BMI एक सरल गणना है।", info2: "मानक श्रेणियां:", under: "कम वज़न", normal: "सामान्य वज़न", over: "अधिक वज़न", obese: "मोटापा" },
    ecommerce: { title: "उत्पाद डेटा", desc: "लागत और बिक्री दर्ज करें", price: "बिक्री मूल्य", cogs: "उत्पाद लागत", qty: "बेची गई मात्रा", shipping: "शिपिंग लागत", paymentFeePct: "पेमेंट फीस (%)", paymentFeeFix: "पेमेंट फीस (निश्चित)", platformFeePct: "प्लेटफ़ॉर्म फीस (%)", platformFeeFix: "प्लेटफ़ॉर्म फीस (निश्चित)", adSpend: "विज्ञापन खर्च", refunds: "रिफंड दर (%)", discount: "छूट (%)", fixedCosts: "अन्य निश्चित खर्च", grossProfit: "सकल लाभ", netProfit: "शुद्ध लाभ", margin: "नेट मार्जिन", profitPerOrder: "प्रति ऑर्डर लाभ", breakEven: "ब्रेक-ईवन ऑर्डर्स" },
    saas: { title: "SaaS मेट्रिक्स", desc: "सॉफ्टवेयर व्यवसाय मेट्रिक्स", arpu: "ARPU", cac: "CAC", churn: "मंथन दर (%)", grossMargin: "सकल मार्जिन (%)", customers: "कुल ग्राहक", fixedCosts: "निश्चित लागत", ltv: "LTV", ltvCac: "LTV:CAC अनुपात", mrr: "MRR", runway: "CAC वसूलने के महीने" },
    profitMargin: { title: "लागत और राजस्व", desc: "मार्जिन की गणना करें", cost: "कुल लागत", revenue: "कुल राजस्व", gross: "ग्रॉस मार्जिन", markup: "मार्कअप", profit: "लाभ" },
    roas: { title: "मार्जिन और लागत", desc: "ब्रेक-ईवन ROAS", price: "उत्पाद मूल्य", cogs: "माल की लागत", shipping: "शिपिंग लागत", fees: "अन्य शुल्क", breakevenRoas: "ब्रेक-ईवन ROAS", breakevenCpa: "ब्रेक-ईवन CPA", profitPerSale: "प्रति बिक्री लाभ" },
    nutrition: { title: "आपकी प्रोफ़ाइल", desc: "विवरण दर्ज करें", foods: "खाए गए खाद्य पदार्थ", noFoods: "कोई खाना नहीं।", disclaimer: "सूचना: केवल शैक्षिक उद्देश्य।", calories: "कैलोरी", protein: "प्रोटीन (g)", carbs: "कार्ब्स (g)", fat: "वसा (g)", status: "पोषण स्थिति", micro: "सूक्ष्म पोषक तत्व", onTrack: "सही है", gap: "मध्यम अंतर", low: "कम" },
    meal: { title: "डाइट लक्ष्य", desc: "दैनिक लक्ष्य", targetCal: "लक्षित कैलोरी", targetPro: "लक्षित प्रोटीन (g)", mealsPerDay: "प्रति दिन भोजन", generate: "योजना बनाएं", yourPlan: "आपकी भोजन योजना", totalCal: "कुल कैलोरी", totalPro: "कुल प्रोटीन (g)" }
  },
  'ja': {
    inputs: "入力", results: "結果", optional: "(任意)", calculate: "計算する",
    weightKg: "体重 (kg)", heightCm: "身長 (cm)", age: "年齢", sex: "性別", male: "男性", female: "女性",
    cpa: { title: "広告キャンペーン", desc: "広告の指標を入力", adSpend: "広告費", clicks: "クリック数", conversions: "コンバージョン", aov: "平均注文額", margin: "純利益率 (%)", cpa: "CPA", roas: "ROAS", convRate: "コンバージョン率", revenue: "総収益", profit: "純利益" },
    bmi: { title: "身体指標", desc: "BMIを計算", bmi: "BMI", category: "カテゴリー", info1: "BMIは簡単な計算です。", info2: "標準カテゴリー:", under: "低体重", normal: "標準", over: "過体重", obese: "肥満" },
    ecommerce: { title: "製品データ", desc: "コストと販売指標", price: "販売価格", cogs: "製品原価", qty: "販売数", shipping: "送料", paymentFeePct: "決済手数料 (%)", paymentFeeFix: "決済手数料 (固定)", platformFeePct: "プラットフォーム手数料 (%)", platformFeeFix: "プラットフォーム手数料 (固定)", adSpend: "広告費", refunds: "返金率 (%)", discount: "割引 (%)", fixedCosts: "固定費", grossProfit: "粗利益", netProfit: "純利益", margin: "純利益率", profitPerOrder: "1注文あたりの利益", breakEven: "損益分岐注文数" },
    saas: { title: "SaaS指標", desc: "ビジネス指標を入力", arpu: "ARPU", cac: "CAC", churn: "解約率 (%)", grossMargin: "粗利益率 (%)", customers: "総顧客数", fixedCosts: "固定費", ltv: "LTV", ltvCac: "LTV:CAC比率", mrr: "MRR", runway: "CAC回収月数" },
    profitMargin: { title: "コストと収益", desc: "マージンを計算", cost: "総費用", revenue: "総収益", gross: "粗利益", markup: "マークアップ", profit: "利益" },
    roas: { title: "マージンとコスト", desc: "損益分岐ROASを計算", price: "製品価格", cogs: "売上原価", shipping: "送料", fees: "各種手数料", breakevenRoas: "損益分岐ROAS", breakevenCpa: "損益分岐CPA", profitPerSale: "1販売あたりの利益" },
    nutrition: { title: "プロフィール", desc: "詳細を入力", foods: "今日の食事", noFoods: "なし。", disclaimer: "免責事項: 教育目的のみ。", calories: "カロリー", protein: "タンパク質 (g)", carbs: "炭水化物 (g)", fat: "脂質 (g)", status: "栄養状態", micro: "微量栄養素", onTrack: "順調", gap: "中程度の不足", low: "基準未満" },
    meal: { title: "ダイエット目標", desc: "目標を入力", targetCal: "目標カロリー", targetPro: "目標タンパク質 (g)", mealsPerDay: "1日の食事数", generate: "プランを作成", yourPlan: "あなたの食事プラン", totalCal: "総カロリー", totalPro: "総タンパク質 (g)" }
  },
  'ar': {
    inputs: "المدخلات", results: "النتائج", optional: "(اختياري)", calculate: "حساب",
    weightKg: "الوزن (kg)", heightCm: "الطول (cm)", age: "العمر", sex: "الجنس", male: "ذكر", female: "أنثى",
    cpa: { title: "حملة إعلانية", desc: "أدخل مقاييس الإعلانات", adSpend: "إجمالي الإنفاق", clicks: "النقرات", conversions: "التحويلات", aov: "متوسط قيمة الطلب", margin: "هامش الربح (%)", cpa: "تكلفة الاكتساب", roas: "العائد على الإعلانات", convRate: "معدل التحويل", revenue: "إجمالي الإيرادات", profit: "صافي الربح" },
    bmi: { title: "مقاييس جسمك", desc: "احسب مؤشر كتلة الجسم", bmi: "مؤشر كتلة الجسم", category: "الفئة", info1: "مؤشر كتلة الجسم هو حساب بسيط.", info2: "الفئات القياسية:", under: "نقص الوزن", normal: "وزن طبيعي", over: "زيادة الوزن", obese: "سمنة" },
    ecommerce: { title: "بيانات المنتج", desc: "التكاليف والمبيعات", price: "سعر البيع", cogs: "تكلفة المنتج", qty: "الكمية المباعة", shipping: "تكلفة الشحن", paymentFeePct: "رسوم الدفع (%)", paymentFeeFix: "رسوم الدفع (ثابت)", platformFeePct: "رسوم المنصة (%)", platformFeeFix: "رسوم المنصة (ثابت)", adSpend: "الإنفاق الإعلاني", refunds: "معدل الاسترداد (%)", discount: "خصم (%)", fixedCosts: "نفقات ثابتة", grossProfit: "إجمالي الربح", netProfit: "صافي الربح", margin: "الهامش الصافي", profitPerOrder: "الربح لكل طلب", breakEven: "طلبات التعادل" },
    saas: { title: "مقاييس SaaS", desc: "أدخل مقاييس عملك", arpu: "ARPU", cac: "CAC", churn: "معدل الإلغاء (%)", grossMargin: "الهامش الإجمالي (%)", customers: "إجمالي العملاء", fixedCosts: "التكاليف الثابتة", ltv: "LTV", ltvCac: "نسبة LTV:CAC", mrr: "MRR", runway: "أشهر لاسترداد CAC" },
    profitMargin: { title: "التكلفة والإيرادات", desc: "احسب الهوامش", cost: "التكلفة الإجمالية", revenue: "الإيرادات", gross: "الهامش الإجمالي", markup: "العلامة", profit: "الربح" },
    roas: { title: "الهامش والتكاليف", desc: "حساب العائد على الإعلانات المتعادل", price: "سعر المنتج", cogs: "تكلفة البضائع", shipping: "تكلفة الشحن", fees: "رسوم أخرى", breakevenRoas: "عائد التعادل", breakevenCpa: "CPA التعادل", profitPerSale: "الربح لكل عملية بيع" },
    nutrition: { title: "ملفك الشخصي", desc: "أدخل التفاصيل", foods: "الأطعمة", noFoods: "لا يوجد.", disclaimer: "إخلاء مسؤولية: لأغراض تعليمية.", calories: "السعرات", protein: "البروتين (g)", carbs: "الكربوهيدرات (g)", fat: "الدهون (g)", status: "الحالة الغذائية", micro: "المغذيات الدقيقة", onTrack: "جيد", gap: "فجوة معتدلة", low: "أقل من المرجع" },
    meal: { title: "أهداف النظام", desc: "الأهداف اليومية", targetCal: "السعرات المستهدفة", targetPro: "البروتين المستهدف (g)", mealsPerDay: "وجبات في اليوم", generate: "إنشاء خطة", yourPlan: "خطة الوجبات", totalCal: "إجمالي السعرات", totalPro: "إجمالي البروتين (g)" }
  },
  'ko': {
    inputs: "입력", results: "결과", optional: "(선택)", calculate: "계산",
    weightKg: "체중 (kg)", heightCm: "키 (cm)", age: "나이", sex: "성별", male: "남성", female: "여성",
    cpa: { title: "광고 캠페인", desc: "광고 지표 입력", adSpend: "광고비", clicks: "클릭", conversions: "전환", aov: "평균 주문 금액", margin: "순이익률 (%)", cpa: "CPA", roas: "ROAS", convRate: "전환율", revenue: "총 수익", profit: "순이익" },
    bmi: { title: "신체 지표", desc: "BMI 계산", bmi: "BMI", category: "카테고리", info1: "BMI는 간단한 계산입니다.", info2: "표준 카테고리:", under: "저체중", normal: "정상", over: "과체중", obese: "비만" },
    ecommerce: { title: "제품 데이터", desc: "비용 및 판매 지표", price: "판매 가격", cogs: "제품 원가", qty: "판매량", shipping: "배송비", paymentFeePct: "결제 수수료 (%)", paymentFeeFix: "결제 수수료 (고정)", platformFeePct: "플랫폼 수수료 (%)", platformFeeFix: "플랫폼 수수료 (고정)", adSpend: "광고비", refunds: "환불률 (%)", discount: "할인 (%)", fixedCosts: "고정비", grossProfit: "매출 총이익", netProfit: "순이익", margin: "순이익률", profitPerOrder: "주문당 이익", breakEven: "손익분기 주문 수" },
    saas: { title: "SaaS 지표", desc: "비즈니스 지표 입력", arpu: "ARPU", cac: "CAC", churn: "이탈률 (%)", grossMargin: "매출 총이익률 (%)", customers: "총 고객", fixedCosts: "고정비", ltv: "LTV", ltvCac: "LTV:CAC 비율", mrr: "MRR", runway: "CAC 회수 기간" },
    profitMargin: { title: "비용 및 수익", desc: "마진 계산", cost: "총 비용", revenue: "총 수익", gross: "매출 총이익", markup: "마크업", profit: "이익" },
    roas: { title: "마진 및 비용", desc: "손익분기 ROAS 계산", price: "제품 가격", cogs: "원가", shipping: "배송비", fees: "기타 수수료", breakevenRoas: "손익분기 ROAS", breakevenCpa: "손익분기 CPA", profitPerSale: "판매당 이익" },
    nutrition: { title: "프로필", desc: "세부 정보 입력", foods: "오늘의 식사", noFoods: "없음.", disclaimer: "면책 조항: 교육 목적입니다.", calories: "칼로리", protein: "단백질 (g)", carbs: "탄수화물 (g)", fat: "지방 (g)", status: "영양 상태", micro: "미량 영양소", onTrack: "정상", gap: "약간 부족", low: "기준 미달" },
    meal: { title: "다이어트 목표", desc: "일일 목표", targetCal: "목표 칼로리", targetPro: "목표 단백질 (g)", mealsPerDay: "하루 식사 횟수", generate: "식단 생성", yourPlan: "식단", totalCal: "총 칼로리", totalPro: "총 단백질 (g)" }
  }
};

locales.forEach(loc => {
  const filePath = path.join(__dirname, 'messages', loc + '.json');
  if (fs.existsSync(filePath)) {
    let raw = fs.readFileSync(filePath, 'utf8');
    if (raw.charCodeAt(0) === 0xFEFF) {
      raw = raw.slice(1);
    }
    const data = JSON.parse(raw);
    data.Calc = translations[loc];
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log('Updated ' + loc + '.json');
  }
});
