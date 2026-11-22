import { beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../../src/app.js';
import { createMemoryRepository } from '../../src/db.js';
import { projects } from '../../src/portfolio.js';

let repository;
let app;

beforeEach(() => {
  repository = createMemoryRepository(projects);
  app = createApp({ repository });
});

describe('portfolio API', () => {
  it('responde el health check', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('lista los proyectos desde el repositorio', async () => {
    const response = await request(app).get('/api/projects');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
    expect(response.body[0].title).toBe('Sistema de Control de Filas - Banco');
  });

  it('guarda un mensaje de contacto válido', async () => {
    const response = await request(app).post('/api/contact').send({
      name: 'Carlos', email: 'carlos@mail.com', message: 'Quiero conversar sobre tu trabajo.'
    });
    expect(response.status).toBe(201);
    expect(response.body.contact.email).toBe('carlos@mail.com');
    expect(repository.getContacts()).toHaveLength(1);
  });

  it('rechaza un mensaje inválido', async () => {
    const response = await request(app).post('/api/contact').send({ name: '', email: 'no', message: '' });
    expect(response.status).toBe(400);
    expect(response.body.errors).toHaveProperty('email');
  });
});
