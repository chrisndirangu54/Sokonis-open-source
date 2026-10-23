import test from 'node:test';
import assert from 'node:assert/strict';
import {makeGroceryService,makeMemoryStore} from '../src/service.mjs';
test('find product',async()=>{const s=makeGroceryService(makeMemoryStore([{name:'Rice'}]));assert.equal((await s.findProducts('rice'))[0].name,'Rice');});
test('reject invalid quantity',async()=>{const s=makeGroceryService(makeMemoryStore());await assert.rejects(()=>s.addToList('u','Rice',0));});
test('list roundtrip',async()=>{const s=makeGroceryService(makeMemoryStore());await s.addToList('u','Rice',2);assert.equal((await s.getList('u'))[0].quantity,2);});
