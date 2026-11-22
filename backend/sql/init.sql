CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(120) NOT NULL,
  description TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  link TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO projects (title, description, tags, link)
SELECT 'Sistema de Control de Filas - Banco', 'Aplicación de escritorio en C# y WPF para simular y gestionar filas de clientes.', ARRAY['C#', 'WPF', '.NET Framework'], 'https://github.com/Fitooohhh/ControlFilasBanco.git'
WHERE NOT EXISTS (SELECT 1 FROM projects);
INSERT INTO projects (title, description, tags, link)
SELECT 'Página Web Productos de Limpieza', 'Página web para presentar productos de limpieza con una interfaz responsive.', ARRAY['HTML', 'CSS', 'JavaScript'], 'https://lim-silk.vercel.app/'
WHERE (SELECT COUNT(*) FROM projects) = 1;
INSERT INTO projects (title, description, tags, link)
SELECT 'Casa Inteligente con Arduino', 'Casa inteligente a escala con automatización y control mediante Arduino.', ARRAY['Arduino', 'IoT', 'Automatización'], 'https://github.com/Fitooohhh'
WHERE (SELECT COUNT(*) FROM projects) = 2;
