const EVENT_SEARCH_CONFIG_URL='./data/event-config.json';
const eventSearchNormalize=value=>String(value??'').normalize('NFKC').toLowerCase().replace(/[\s\u3000・･／\/\-ー－―_＿（）()［］\[\]【】「」『』.,，。:：]/g,'');
const eventSearchTerms=event=>[
  event.name,
  event.eventId,
  event.hostArea,
  event.location,
  event.city,
  event.venue,
  event.dateFrom,
  event.dateTo,
  event.memo,
  ...(event.aliases||[])
].filter(Boolean);
const scoreEvent=(event,query)=>{const q=eventSearchNormalize(query);if(!q)return 0;const terms=eventSearchTerms(event).map(eventSearchNormalize);if(terms.some(term=>term===q))return 100;if(terms.some(term=>term.includes(q)||q.includes(term)))return 80;const index=terms.join(' ');let score=0;for(const token of ['北海道','沼田','沼田町','ベンチ','ベンチプレス','bp','2026']){const t=eventSearchNormalize(token);if(q.includes(t)&&index.includes(t))score+=10;}return score;};
async function initFlexibleEventSearch(){const input=document.querySelector('#eventSearch');const hint=document.querySelector('#eventSearchHint');const openButton=document.querySelector('#openEventBtn');if(!input||!hint||!openButton)return;let eventConfig=null;try{const res=await fetch(`${EVENT_SEARCH_CONFIG_URL}?t=${Date.now()}`,{cache:'no-store'});eventConfig=await res.json();}catch(e){return;}const event=eventConfig.event||{};const render=()=>{const q=input.value.trim();if(!q)return;const score=scoreEvent(event,q);if(score<=0)return;hint.innerHTML=`こちらの大会ですか？ <button type="button" id="eventSuggestionBtn">${event.name||'登録済み大会'}</button>`;document.querySelector('#eventSuggestionBtn')?.addEventListener('click',()=>{input.value=event.name||q;openButton.click();});};
input.addEventListener('input',()=>setTimeout(render,0));
openButton.addEventListener('click',()=>{const q=input.value.trim();if(q&&scoreEvent(event,q)>0)input.value=event.name||q;},true);
render();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initFlexibleEventSearch);else initFlexibleEventSearch();
