const juego=(()=>{let e="La CPU ha ganado la partida!!",a="El jugador 1 ha ganado la partida",t=["2C","2D","2H","2S","3C","3D","3H","3S","4C","4D","4H","4S","5C","5D","5H","5S","6C","6D","6H","6S","7C","7D","7H","7S","8C","8D","8H","8S","9C","9D","9H","9S","10C","10D","10H","10S","AC","AD","AH","AS","JC","JD","JH","JS","KC","KD","KH","KS","QC","QD","QH","QS"],d,n=0,r=0,l=!0,p=[],i=[],o=[];window.onload=()=>{document.body.className="bg-success",s(),c()};let s=()=>{let e=x("div","header bg-dark mb-3 p-2 d-flex flex-row justify-content-center align-items-center");e.appendChild(x("span","h2 titulo text-white me-3","BlackJack"));let a=x("img","grey-back");a.src="assets/cartas/grey_back.png";let t=x("img","red-back");t.src="assets/cartas/red_back.png",e.appendChild(a),e.appendChild(t),document.querySelector("#app").appendChild(e)},c=()=>{f(),C(),h(),g(),o=o.concat(t),H()},C=()=>{d=x("div","tablero"),document.querySelector("#app").appendChild(d)},h=()=>{let e=x("div","zone-btns my-2 d-flex flex-wrap flex-row justify-content-center align-items-center"),a=x("button","btnNuevoJuego p-2 bg-primary border border-2 text-white shadow rounded-3 m-2","Nuevo Juego");a.addEventListener("click",c);let t=x("button","btnPedirCarta border border-2 text-white shadow rounded-3 p-2 bg-secondary m-2","Pedir Carta");t.addEventListener("click",_);let n=x("button","btnDetener border border-2 text-white shadow rounded-3 p-2 bg-danger m-2","Detener");n.addEventListener("click",$),e.appendChild(a),e.appendChild(t),e.appendChild(n),d.appendChild(e)},g=()=>{let e=x("div","jugador1 m-2"),a=x("span","textJugador1 h2","Jugador 1 - "),t=x("span","contJugador1");t.innerHTML=n,a.appendChild(t),e.appendChild(a),e.appendChild(x("div","zoneCardJugador1 d-flex flex-row")),d.appendChild(e);let l=x("div","cpu m-2"),p=x("span","textCpu h2","CPU - "),i=x("span","contCpu");i.innerHTML=r,p.appendChild(i),l.appendChild(p),l.appendChild(x("div","zoneCardCpu d-flex flex-row")),d.appendChild(l)},_=()=>{if(l){if(n<21){let e=o.length-1;if(o[e]){let a=b(o[e]);p.push([o[e],a]),n+=a,document.getElementsByClassName("contJugador1")[0].innerHTML=n,m(o[e],"zoneCardJugador1"),o.pop()}}(21==n||n>21)&&(l=!1,u())}},u=()=>{if(!l){for(;r<21;){let e=o.length-1;if(o[e]){let a=b(o[e]);if(r>n&&r+a>21||(i.push([o[e],a]),r+=a,document.getElementsByClassName("contCpu")[0].innerHTML=r,m(o[e],"zoneCardCpu"),o.pop(),r>n||n>21))break}}S()}},$=()=>{l=!1,0==r&&u()},b=e=>{let a=0,t=e.split("");if(t.length>0)switch(a=t.length>2?t[0]+t[1]:t[0]){case"J":case"Q":case"K":a="10";break;case"A":a="11"}return parseInt(a)},m=(e,a)=>{let t=document.getElementsByClassName(a)[0],d=x("img","carta");d.src=`assets/cartas/${e}.png`,t.appendChild(d)},f=()=>{d&&document.querySelector("#app").removeChild(d),o=[],r=0,n=0,l=!0},H=()=>{o.sort((e,a)=>.5-Math.random())},S=()=>{21==n&&(r<21||r>21)&&setTimeout(()=>alert(a),500),n<21&&(r>21||n>r)&&setTimeout(()=>alert(a),500),21==r&&(n<21||n>21)&&setTimeout(()=>alert(e),500),r<21&&(n>21||r>n)&&setTimeout(()=>alert(e),500),n>21&&r>21&&setTimeout(()=>alert("Nadie gana"),500),r==n&&setTimeout(()=>alert("Empate!!"),500)},x=(e,a,t)=>{let d=document.createElement(e);return a&&a.length>0&&(d.className=a),t&&t.length>0&&(d.innerHTML=t),d};return"Play BackJack!"})();