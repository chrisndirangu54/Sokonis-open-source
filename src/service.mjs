const safe = v => String(v ?? '').trim();
export function makeGroceryService(store, ai=null) {
return {
async findProducts(term){ const q=safe(term).slice(0,80);if(!q)throw Error('Product required');return store.findProducts(q); },
async addToList(uid,term,quantity=1){if(!uid)throw Error('Authentication required');const product=safe(term).slice(0,80),q=Number(quantity);if(!product||!Number.isInteger(q)||q<1||q>100)throw Error('Invalid item');return store.addToList(uid,{product,quantity:q});},
async getList(uid){if(!uid)throw Error('Authentication required');return store.getList(uid);},
async suggestMeal(ingredients){const x=safe(ingredients).slice(0,240);if(!x)throw Error('Ingredients required');return ai?ai.suggestMeal(x):'Try combining '+x+' into a simple meal. Check food safety and dietary needs.';}
};}
export function makeMemoryStore(products=[]){const lists=new Map();return {async findProducts(q){return products.filter(p=>String(p.name).toLowerCase().includes(q.toLowerCase())).slice(0,5);},async addToList(uid,item){const items=lists.get(uid)||[];items.push(item);lists.set(uid,items);return item;},async getList(uid){return lists.get(uid)||[];}};}