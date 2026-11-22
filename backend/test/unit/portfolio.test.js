import { describe, expect, it } from 'vitest';
import { normalizeContact, validateContact } from '../../src/portfolio.js';

describe('portfolio domain', () => {
  it('normaliza nombre y correo', () => {
    expect(normalizeContact({ name: '  Ana ', email: ' ANA@MAIL.COM ', message: 'Hola, ¿cómo estás?' })).toEqual({
      name: 'Ana', email: 'ana@mail.com', message: 'Hola, ¿cómo estás?'
    });
  });

  it('acepta un contacto válido', () => {
    expect(validateContact({ name: 'Ana Pérez', email: 'ana@mail.com', message: 'Me interesa tu proyecto.' })).toEqual({});
  });

  it('devuelve errores para un contacto incompleto', () => {
    expect(validateContact({ name: 'A', email: 'incorrecto', message: 'Hola' })).toEqual({
      name: 'Ingresa tu nombre.',
      email: 'Ingresa un correo válido.',
      message: 'Escribe un mensaje de al menos 10 caracteres.'
    });
  });
});
