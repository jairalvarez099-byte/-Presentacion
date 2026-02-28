(function(){
  // Fondo matrix: rejilla de 0 y 1
  var mb=document.getElementById('matrixBg');
  if(mb){
    var cols=28,rows=40,s='';
    for(var r=0;r<rows;r++){
      for(var col=0;col<cols;col++) s+='<span class="matrix-digit">'+(Math.random()>0.5?'0':'1')+'</span>';
      s+='<br>';
    }
    mb.innerHTML=s;
  }
  var c=document.getElementById('slidesContainer'),p=document.getElementById('progressBar'),cur=document.getElementById('currentSlide'),tot=document.getElementById('totalSlides');
  var slides=document.querySelectorAll('.slide'),total=slides.length;
  if(tot)tot.textContent=total;
  function update(){
    var i=Math.round(c.scrollTop/window.innerHeight);
    if(cur)cur.textContent=Math.min(i+1,total);
    if(p)p.style.width=(c.scrollTop/(c.scrollHeight-window.innerHeight)*100)+'%';
    slides.forEach(function(s,j){ s.classList.toggle('active',j===i); });
  }
  c.addEventListener('scroll',update);
  var h=document.getElementById('hatContainer'),m=document.getElementById('hiddenMessage');
  if(h&&m)h.onclick=function(){ m.classList.add('show'); };
  var pw=document.getElementById('passwordInput'),bar=document.getElementById('strengthBar'),txt=document.getElementById('strengthText');
  if(pw&&bar&&txt){
    pw.oninput=function(){
      var s=pw.value.length*5;
      if(pw.value.length>12)s+=20;
      if(/[A-Z]/.test(pw.value))s+=10;
      if(/[0-9]/.test(pw.value))s+=10;
      if(/[^A-Za-z0-9]/.test(pw.value))s+=15;
      bar.style.width=Math.min(s,100)+'%';
      txt.textContent=s<30?'Débil':s<60?'Media':'Fuerte';
    };
  }
  var gen=document.getElementById('generatePassword');
  if(gen&&pw)gen.onclick=function(){ var w=['Gato','Perro','Cafe','Luna','Sol','Mar','Rio','Pan','Flor','Vino']; pw.value=w[Math.floor(Math.random()*10)]+w[Math.floor(Math.random()*10)]+Math.floor(Math.random()*90+10)+'!'; pw.dispatchEvent(new Event('input')); };
  var rev=document.getElementById('revealPhotoInfo'),ov=document.getElementById('photoOverlay');
  if(rev&&ov)rev.onclick=function(){ ov.classList.toggle('show'); };
  var n2=document.getElementById('2faNo'),n4=document.getElementById('network2'),n44=document.getElementById('network4'),warn=document.getElementById('wifiWarning');
  if(n2)n2.onclick=function(){ if(document.getElementById('2faNotification'))document.getElementById('2faNotification').innerHTML='<p style="color:#8bb5c2;padding:1rem">✅ Cuenta bloqueada. Bien hecho.</p>'; };
  if((n2||n4)&&warn){ [n2,n4,n44].forEach(function(el){ if(el)el.onclick=function(){ warn.style.display='block'; }; }); }
  update();
})();
