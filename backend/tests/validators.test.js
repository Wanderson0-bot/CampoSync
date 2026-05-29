import test from 'node:test';
import assert from 'node:assert/strict';
import {
  requireString,
  requireNumber,
  optionalString
} from '../src/lib/validators.js';

test('requireString deve aceitar string', () => {
  assert.equal(requireString('João', 'nome'), 'João');
});

test('requireString deve converter número para string', () => {
  assert.equal(requireString(123, 'nome'), '123');
});

test('requireNumber deve aceitar número', () => {
  assert.equal(requireNumber(20, 'idade'), 20);
});

test('requireNumber deve converter string numérica', () => {
  assert.equal(requireNumber('20', 'idade'), 20);
});

test('optionalString deve retornar string vazia para undefined', () => {
  assert.equal(optionalString(undefined, 'desc'), '');
});

test('optionalString deve aceitar string', () => {
  assert.equal(optionalString('texto', 'desc'), 'texto');
});
