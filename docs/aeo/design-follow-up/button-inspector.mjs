export function inspectButtons(){
 const parse=s=>{const m=s.match(/rgba?\(([^)]+)\)/);return m?m[1].split(/[, /]+/).map(Number):[0,0,0,0]};
 const over=(fg,bg)=>{const a=fg[3]??1;return fg.slice(0,3).map((v,i)=>v*a+bg[i]*(1-a)).concat(1)};
 const lum=c=>c.slice(0,3).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
 const ratio=(a,b)=>{const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
 const records=[];
 const selector='button,[role="button"],input[type="submit"],input[type="button"],a[class*="btn"],a[class*="button"],a[class*="cta"]';
 for(const el of document.querySelectorAll(selector)){
  if(!el.getClientRects().length||getComputedStyle(el).visibility==='hidden')continue;
  const label=(el.innerText||el.value||'').trim();
  const style=getComputedStyle(el);
  const entry={tag:el.tagName,classes:el.className,label:label.slice(0,110),disabled:!!el.disabled,iconOnly:!label,name:el.getAttribute('aria-label')||label,foreground:style.color,background:style.backgroundColor,backgroundImage:style.backgroundImage};
  if(!label||el.disabled){records.push(entry);continue;}
  let backgrounds=[[255,255,255,1]],unknown=false,opacity=1;
  const chain=[];for(let node=el;node;node=node.parentElement)chain.unshift(node);
  for(const node of chain){
   const s=getComputedStyle(node);opacity*=Number(s.opacity);
   backgrounds=backgrounds.map(bg=>over(parse(s.backgroundColor),bg));
   if(s.backgroundImage!=='none'){
    const colors=[...s.backgroundImage.matchAll(/rgba?\([^)]+\)/g)].map(m=>parse(m[0]));
    if(!colors.length||s.backgroundImage.includes('url(')){unknown=true;continue;}
    const samples=[...colors];for(let i=1;i<colors.length;i++)for(const t of [.25,.5,.75])samples.push(colors[i-1].map((v,j)=>v*(1-t)+(colors[i][j]??1)*t));
    backgrounds=backgrounds.flatMap(bg=>samples.map(color=>over(color,bg))).slice(-125);
   }
  }
  let min=Infinity;
  const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let node;let evaluated=0;
  while(node=walker.nextNode()){
   if(!node.textContent.trim()||!node.parentElement||node.parentElement.closest('[aria-hidden="true"]'))continue;
   const s=getComputedStyle(node.parentElement);if(s.visibility==='hidden'||s.display==='none')continue;
   const fg=parse(s.color);min=Math.min(min,...backgrounds.map(bg=>ratio(over(fg,bg),bg)));evaluated++;
  }
  if(!evaluated)min=Math.min(...backgrounds.map(bg=>ratio(over(parse(style.color),bg),bg)));
  const font=Number.parseFloat(style.fontSize),bold=Number.parseInt(style.fontWeight)>=700;
  Object.assign(entry,{contrast:Number(min.toFixed(2)),required:font>=24||(bold&&font>=18.6667)?3:4.5,opacity,unknownBackground:unknown,signature:[style.color,style.backgroundColor,style.backgroundImage,font,style.fontWeight,el.className].join('|')});
  records.push(entry);
 }
 return records;
}
