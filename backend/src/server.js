import 'dotenv/config';
import { createApp, defaultStaticDir } from './app.js';

const port = Number(process.env.PORT ?? 3000);
const app = createApp({ staticDir: defaultStaticDir });

app.listen(port, '0.0.0.0', () => {
  console.log(`Portfolio escuchando en http://0.0.0.0:${port}`);
});
