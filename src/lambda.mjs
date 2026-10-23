import {makeGroceryService,makeMemoryStore} from './service.mjs';
import {makeFirebaseStore} from './firebase.mjs';
import {makeBedrockAI} from './bedrock.mjs';
let service;
const getService=()=>service??=makeGroceryService(process.env.DEMO_MODE==='true'?makeMemoryStore([{name:'Rice',price:200},{name:'Tomatoes',price:80}]):makeFirebaseStore(),process.env.BEDROCK_MODEL_ID?makeBedrockAI():null);
export async function handler(event) {
const auth=event.requestContext?.authorizer;
if(!auth)return {statusCode:401,body:JSON.stringify({error:'Unauthorized'})};
try{
const body=typeof event.body==='string'?JSON.parse(event.body):event.body||{};
const uid=auth.principalId||auth.jwt?.claims?.sub;
const s=getService();
let result;
switch(body.action){
case 'products':result=await s.findProducts(body.term);break;
case 'add':result=await s.addToList(uid,body.term,body.quantity);break;
case 'list':result=await s.getList(uid);break;
case 'meal':result=await s.suggestMeal(body.ingredients);break;
default:return {statusCode:400,body:JSON.stringify({error:'Unknown action'})};
}
return {statusCode:200,headers:{'content-type':'application/json'},body:JSON.stringify({result})};
}catch(e){return {statusCode:400,body:JSON.stringify({error:e.message})};}
}