import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import { projects, normalizeContact, validateContact } from './portfolio.js';
import { createMemoryRepository, createPostgresRepository } from './db.js';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export const createApp = ({ repository = process.env.DATABASE_URL ? createPostgresRepository() : createMemoryRepository(projects), staticDir } = {}) => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'portfolio-api' }));

  app.get('/api/projects', async (_req, res, next) => {
    try {
      res.json(await repository.listProjects());
    } catch (error) {
      next(error);
    }
  });

  app.post('/api/contact', async (req, res, next) => {
    try {
      const contact = normalizeContact(req.body ?? {});
      const errors = validateContact(contact);
      if (Object.keys(errors).length) return res.status(400).json({ errors });
      const saved = await repository.saveContact(contact);
      return res.status(201).json({ message: 'Mensaje recibido. Gracias por escribirme.', contact: saved });
    } catch (error) {
      return next(error);
    }
  });

  if (staticDir) {
    app.use(express.static(staticDir));
    app.get('*', (_req, res) => res.sendFile(path.join(staticDir, 'index.html')));
  }

  app.use((error, _req, res, _next) => {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  });

  return app;
};

export const defaultStaticDir = path.resolve(dirname, '../../frontend/dist');
