export const projects = [
  {
    id: 1,
    title: 'Sistema de Control de Filas - Banco',
    description: 'Aplicación de escritorio en C# y WPF para simular y gestionar filas de clientes.',
    tags: ['C#', 'WPF', '.NET Framework'],
    link: 'https://github.com/Fitooohhh/ControlFilasBanco.git'
  },
  {
    id: 2,
    title: 'Página Web Productos de Limpieza',
    description: 'Página web para presentar productos de limpieza con una interfaz responsive.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://lim-silk.vercel.app/'
  },
  {
    id: 3,
    title: 'Casa Inteligente con Arduino',
    description: 'Casa inteligente a escala con automatización y control mediante Arduino.',
    tags: ['Arduino', 'IoT', 'Automatización'],
    link: 'https://github.com/Fitooohhh'
  }
];

export const normalizeContact = ({ name = '', email = '', message = '' }) => ({
  name: name.trim(),
  email: email.trim().toLowerCase(),
  message: message.trim()
});

export const validateContact = (contact) => {
  const errors = {};
  if (!contact.name || contact.name.length < 2) errors.name = 'Ingresa tu nombre.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) errors.email = 'Ingresa un correo válido.';
  if (!contact.message || contact.message.length < 10) errors.message = 'Escribe un mensaje de al menos 10 caracteres.';
  return errors;
};
