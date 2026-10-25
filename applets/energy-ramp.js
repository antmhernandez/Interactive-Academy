"use strict";
/* Original block–ramp–Earth energy account; ideal straight ramp at 35°.
   Inputs: kg, m, m/s, kinetic coefficient, fraction of ramp traveled.
   μk is capped below tan(35°), so a block initially at rest can descend.
   Thermal is energy transferred into the combined surroundings. */
function energyRampState(m,H,v0,mu,progress){
 const g=9.8,theta=35*Math.PI/180,p=Math.max(0,Math.min(1,progress));
 const length=H/Math.sin(theta),distance=p*length,height=H*(1-p);
 const initialK=.5*m*v0*v0,initialU=m*g*H;
 const thermal=mu*m*g*Math.cos(theta)*distance;
 const potential=m*g*height;
 const kinetic=initialK+m*g*(H-height)-thermal;
 const total=initialK+initialU;
 const speed=Math.sqrt(Math.max(0,2*kinetic/m));
 const acceleration=g*(Math.sin(theta)-mu*Math.cos(theta));
 const time=(Math.sqrt(v0*v0+2*acceleration*distance)-v0)/acceleration;
 return {kinetic,potential,thermal,total,speed,acceleration,time,distance,height,length,p};
}
function energyRamp(el){
 el.innerHTML=`<div class="diagram-head"><strong>Follow a block down a ramp</strong><span class="pill" id="en-mode">Energy accounting</span></div>
 <svg viewBox="0 0 620 370" role="img" aria-label="Schematic descending ramp showing the block at the chosen progress. Heights and energy quantities appear numerically below.">
 <path d="M38 325H575" stroke="#c3b196" stroke-width="2"/>
 <path d="M88 107L438 325H88Z" fill="#eee0c8" stroke="#b39870" stroke-width="2.5"/>
 <path d="M88 107L438 325" stroke="#8e775c" stroke-width="5"/>
 <text x="90" y="74" fill="#655747" font-size="17">Starting height H</text>
 <text x="451" y="322" fill="#655747" font-size="16">bottom</text>
 <text x="89" y="348" fill="#716658" font-size="15">Fixed ramp geometry · 35° slope</text>
 <g id="en-block"></g></svg>
 <div class="controls">
 <label>Mass <output id="en-mass-value"></output><input id="en-mass" type="range" min="1" max="8" step="1" value="2"></label>
 <label>Starting height <output id="en-height-value"></output><input id="en-height" type="range" min="2" max="12" step="1" value="5"></label>
 <label>Initial speed <output id="en-start-value"></output><input id="en-start" type="range" min="0" max="8" step="1" value="0"></label>
 <label>Kinetic friction μₖ <output id="en-mu-value"></output><input id="en-mu" type="range" min="0" max=".4" step=".05" value=".2"></label>
 <label>Distance down the ramp <output id="en-progress-value"></output><input id="en-progress" type="range" min="0" max="100" step="1" value="0"></label>
 </div>
 <div class="applet-actions"><button type="button" id="en-play" aria-pressed="false">Play descent</button>
 <button type="button" id="en-step">Advance 10%</button><button type="button" id="en-lossless">Compare without friction</button>
 <button type="button" id="en-reset">Reset</button></div>
 <div class="energy-bars" aria-label="Numerical energy account plotted as bars">
 <svg viewBox="0 0 620 207" role="img" aria-label="Bar lengths show kinetic, potential, and transferred thermal energy as fractions of the constant total energy.">
 <g id="en-bars"></g></svg></div>
 <div class="readout">
 <div class="metric"><small>Kinetic K</small><strong id="en-k"></strong></div>
 <div class="metric"><small>Gravitational U</small><strong id="en-u"></strong></div>
 <div class="metric"><small>Thermal transferred</small><strong id="en-thermal"></strong></div>
 <div class="metric"><small>Total K + U + thermal</small><strong id="en-total"></strong></div>
 <div class="metric"><small>Instantaneous speed</small><strong id="en-speed"></strong></div>
 <div class="metric"><small>Time elapsed · modeled</small><strong id="en-time"></strong></div>
 </div>
 <p class="note">Ideal model: straight 35° ramp; g = 9.8 m/s²; uniform kinetic friction μₖ = 0–0.40; motion downhill from the start, with no air resistance or rotation. Height zero is at the bottom. Total energy counts the block, Earth and thermal surroundings. The drawn ramp is schematic when height changes. Playback is slowed relative to physical time; slider and readouts follow the energy equations.</p>`;
 const input=id=>el.querySelector("#"+id),output=(id,v)=>{input(id).textContent=v;};
 const m=input("en-mass"),H=input("en-height"),v0=input("en-start"),mu=input("en-mu"),progress=input("en-progress"),play=input("en-play");
 let playing=false,frame=null,lastFrame=null,clock=0;
 function state(){return energyRampState(Number(m.value),Number(H.value),Number(v0.value),Number(mu.value),Number(progress.value)/100);}
 function stop(){
  playing=false;lastFrame=null;
  if(frame!==null&&typeof cancelAnimationFrame==="function")cancelAnimationFrame(frame);
  frame=null;play.setAttribute("aria-pressed","false");play.textContent="Play descent";
 }
 function paint(){
  const q=state(),pct=q.p,px=88+350*pct,py=107+218*pct;
  output("en-mass-value",m.value+" kg");
  output("en-height-value",H.value+" m");
  output("en-start-value",v0.value+" m/s");
  output("en-mu-value",Number(mu.value).toFixed(2));
  output("en-progress-value",Math.round(pct*100)+"%");
  output("en-k",f(q.kinetic)+" J");output("en-u",f(q.potential)+" J");
  output("en-thermal",f(q.thermal)+" J");output("en-total",f(q.total)+" J");
  output("en-speed",f(q.speed)+" m/s");output("en-time",f(q.time)+" s");
  output("en-mode",Number(mu.value)===0?"No thermal transfer":"Friction transfers energy");
  input("en-block").innerHTML=`<rect x="${f(px-16)}" y="${f(py-37)}" width="34" height="30" rx="4"
   transform="rotate(32 ${f(px)} ${f(py-21)})" fill="#365b7a" stroke="#f5f0e6" stroke-width="2"/>
   <path d="M${f(px)} ${f(py)}L${f(px)} 325" stroke="#a67b48" stroke-width="2" stroke-dasharray="4 5"/>
   <text x="${f(Math.min(px+24,485))}" y="${f(Math.min(py-44,305))}" fill="#294a65" font-size="17">moving block</text>`;
  const line=(y,label,value,color)=>{
   const w=Math.max(0,Math.min(360,360*value/q.total));
   return `<text x="17" y="${y+18}" font-size="16" fill="currentColor">${label}</text>
   <rect x="165" y="${y}" width="366" height="28" rx="3" fill="#efeae1" stroke="#ded4c3"/>
   <rect x="168" y="${y+3}" width="${f(w)}" height="22" rx="2" fill="${color}"/>
   <text x="550" y="${y+19}" font-size="15" fill="currentColor">${f(value)} J</text>`;
  };
  input("en-bars").innerHTML=line(9,"Kinetic",q.kinetic,"#14727a")+
   line(62,"Potential",q.potential,"#365b7a")+
   line(115,"Thermal",q.thermal,"#b57a3f")+
   `<text x="16" y="194" fill="currentColor" font-size="14">All three bars together represent ${f(q.total)} J at every position.</text>`;
 }
 function animate(timestamp){
  if(!playing)return;
  if(!el.isConnected){stop();return;}
  const dt=lastFrame===null?0:Math.min(.06,(timestamp-lastFrame)/1000);
  lastFrame=timestamp;clock+=dt*.45;
  const m0=Number(m.value),h=Number(H.value),start=Number(v0.value),fr=Number(mu.value);
  const a=9.8*(Math.sin(35*Math.PI/180)-fr*Math.cos(35*Math.PI/180));
  const length=h/Math.sin(35*Math.PI/180),s=start*clock+.5*a*clock*clock;
  progress.value=String(Math.min(100,Math.round(100*s/length)));
  paint();
  if(s>=length){progress.value="100";paint();stop();}
  else frame=requestAnimationFrame(animate);
 }
 for(const control of [m,H,v0,mu])control.oninput=()=>{stop();paint();};
 progress.oninput=()=>{stop();paint();};
 input("en-step").onclick=()=>{stop();progress.value=String(Math.min(100,Number(progress.value)+10));paint();};
 input("en-lossless").onclick=()=>{stop();mu.value="0";paint();};
 input("en-reset").onclick=()=>{stop();m.value="2";H.value="5";v0.value="0";mu.value=".2";progress.value="0";paint();};
 play.onclick=()=>{
  if(playing){stop();return;}
  if(Number(progress.value)>=100)progress.value="0";
  clock=state().time;lastFrame=null;
  playing=true;play.setAttribute("aria-pressed","true");play.textContent="Pause descent";
  frame=requestAnimationFrame(animate);
 };
 paint();
}
