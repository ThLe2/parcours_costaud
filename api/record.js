export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { date, name, module, percentage } = req.body;

  res.status(200).json({
    success: true,
    message: `Reçu : ${name} - ${percentage}% - ${module}`
  });
}
