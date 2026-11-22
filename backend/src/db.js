import pg from 'pg';

const { Pool } = pg;

export const createPostgresRepository = (connectionString = process.env.DATABASE_URL) => {
  const pool = new Pool({ connectionString });
  return {
    async listProjects() {
      const { rows } = await pool.query('SELECT id, title, description, tags, link FROM projects ORDER BY id');
      return rows;
    },
    async saveContact(contact) {
      const { rows } = await pool.query(
        'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING id, name, email, message, created_at',
        [contact.name, contact.email, contact.message]
      );
      return rows[0];
    },
    async close() {
      await pool.end();
    }
  };
};

export const createMemoryRepository = (initialProjects = []) => {
  const contacts = [];
  return {
    async listProjects() {
      return initialProjects;
    },
    async saveContact(contact) {
      const saved = { id: contacts.length + 1, ...contact, created_at: new Date().toISOString() };
      contacts.push(saved);
      return saved;
    },
    getContacts() {
      return contacts;
    },
    async close() {}
  };
};
