const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/assets/questions');

fs.readdirSync(dir).forEach(file => {
  const ext = path.extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return;
  const filePath = path.join(dir, file);
  const output = filePath.replace(ext, '.webp');
  sharp(filePath)
    .resize({ width: 400, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(output)
    .then(() => {
      if (output !== filePath) {
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          console.warn('Não foi possível deletar', filePath, '-', err.message);
        }
      }
      console.log('Optimized:', output);
    })
    .catch(err => console.error('Error optimizing', file, err));
}); 