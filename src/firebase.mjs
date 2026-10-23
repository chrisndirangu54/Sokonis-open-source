import {getApps,initializeApp,applicationDefault,cert} from 'firebase-admin/app';
import {getFirestore} from 'firebase-admin/firestore';
export function makeFirebaseStore(){
if(!getApps().length){const s=process.env.FIREBASE_SERVICE_ACCOUNT_JSON_BASE64;initializeApp({credential:s?cert(JSON.parse(Buffer.from(s,'base64').toString('utf8'))):applicationDefault()});}
const db=getFirestore();
return {
async findProducts(term){const snap=await db.collection('products').orderBy('name').limit(100).get();return snap.docs.map(d=>({id:d.id,...d.data()})).filter(x=>String(x.name||'').toLowerCase().includes(term.toLowerCase())).slice(0,5);},
async addToList(uid,item){await db.collection('shoppingLists').doc(uid).collection('items').add({...item,createdAt:new Date().toISOString()});return item;},
async getList(uid){const snap=await db.collection('shoppingLists').doc(uid).collection('items').limit(100).get();return snap.docs.map(d=>({id:d.id,...d.data()}));}
};}