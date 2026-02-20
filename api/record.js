import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { date, name, module, percentage } = req.body;

  if (!date || !name || !module || percentage == null) {
    return res.status(400).json({ error: 'Données incomplètes' });
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: '1zILiUJHTc5xkW0IDDE8hh43Wshq_0Xz19NUzONwV2Wg',
      range: 'Résultat!A:D',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[date, name, module, percentage]],
      },
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erreur Sheets:', error);
    res.status(500).json({ error: 'Erreur lors de l’enregistrement' });
  }
}
