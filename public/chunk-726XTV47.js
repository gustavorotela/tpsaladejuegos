import{Aa as r,Ba as g,Bc as k,Ea as f,Ha as u,Ja as h,L as b,Q as c,R as m,Ra as l,Sa as _,Ta as w,Za as y,aa as p,ca as o,ma as C,pa as x,ua as v,za as a}from"./chunk-7FFAC2GN.js";function I(s,n){if(s&1){let d=f();a(0,"div",4)(1,"button",10),u("click",function(){c(d);let e=h();return m(e.guess(!0))}),l(2,"Mayor"),r(),a(3,"button",11),u("click",function(){c(d);let e=h();return m(e.guess(!1))}),l(4,"Menor"),r()()}}function V(s,n){if(s&1){let d=f();a(0,"button",12),u("click",function(){c(d);let e=h();return m(e.startGame())}),l(1,"Reiniciar Juego"),r()}}var E=(()=>{let n=class n{constructor(){this.suits=["H","D","C","S"],this.values=["2","3","4","5","6","7","8","9","10","J","Q","K","A"],this.deck=[],this.lives=3,this.message="",this.gameOver=!1,this.currentCardImage="assets/cartas/grey_back.png",this.nextCardImage="assets/cartas/grey_back.png"}ngOnInit(){this.startGame()}startGame(){this.lives=3,this.message="",this.gameOver=!1,this.initializeDeck(),this.currentCard=this.drawCard(),this.currentCardImage=this.getCardImage(this.currentCard),this.nextCard=this.drawCard(),this.nextCardImage="assets/cartas/grey_back.png"}initializeDeck(){this.deck=[];for(let t of this.suits)for(let e of this.values)this.deck.push({suit:t,value:e})}drawCard(){let t=Math.floor(Math.random()*this.deck.length);return this.deck.splice(t,1)[0]}getCardImage(t){return`assets/cartas/${t.value}${t.suit}.png`}getCardValue(t){return this.values.indexOf(t.value)}guess(t){if(this.gameOver)return;let e=this.getCardValue(this.currentCard),i=this.getCardValue(this.nextCard);this.nextCardImage=this.getCardImage(this.nextCard),t&&i>e?this.message="\xA1Correcto! La carta es mayor.":!t&&i<e?this.message="\xA1Correcto! La carta es menor.":i===e?this.message="Las cartas son iguales, no pierdes una vida.":(this.lives-=1,this.message="\xA1Incorrecto! Pierdes una vida."),this.lives<=0?(this.message="\xA1Perdiste! Se te acabaron las vidas.",this.gameOver=!0):(this.currentCard=this.nextCard,this.currentCardImage=this.getCardImage(this.currentCard),this.nextCard=this.drawCard(),console.table(this.deck),this.nextCardImage="assets/cartas/grey_back.png")}};n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=b({type:n,selectors:[["app-mayoromenor"]],standalone:!0,features:[y],decls:14,vars:6,consts:[[1,"flex","flex-col","items-center","justify-center","min-h-screen"],[1,"text-4xl","font-bold","mb-6",2,"color","white"],[1,"card","mb-6","p-6","bg-white","shadow-lg","rounded-lg"],["alt","Carta actual",1,"w-48","h-64",3,"src"],[1,"flex","space-x-6","mb-6"],[1,"card","p-6","bg-white","shadow-lg","rounded-lg"],["alt","Siguiente carta",1,"w-48","h-64",3,"src"],[1,"text-red-500","mt-6",2,"color","white"],[1,"text-gray-700","mt-4",2,"color","white"],[1,"mt-6","bg-green-500","text-white","py-3","px-6","rounded-lg","hover:bg-green-700"],[1,"bg-blue-500","text-white","py-3","px-6","rounded-lg","hover:bg-blue-700",3,"click"],[1,"bg-red-500","text-white","py-3","px-6","rounded-lg","hover:bg-red-700",3,"click"],[1,"mt-6","bg-green-500","text-white","py-3","px-6","rounded-lg","hover:bg-green-700",3,"click"]],template:function(e,i){e&1&&(g(0,"app-menu"),a(1,"div",0)(2,"h1",1),l(3,"Juego de Adivinar Cartas"),r(),a(4,"div",2),g(5,"img",3),r(),C(6,I,5,0,"div",4),a(7,"div",5),g(8,"img",6),r(),a(9,"p",7),l(10),r(),a(11,"p",8),l(12),r(),C(13,V,2,0,"button",9),r()),e&2&&(o(5),x("src",i.currentCardImage,p),o(),v(6,i.gameOver?-1:6),o(2),x("src",i.nextCardImage,p),o(2),_(i.message),o(2),w("Vidas: ",i.lives,""),o(),v(13,i.gameOver?13:-1))},dependencies:[k],styles:['body[_ngcontent-%COMP%]{margin:0;font-family:Roboto,Helvetica Neue,sans-serif;background-image:url("./media/fondo-VNURW5DW.jpg");background-size:cover;background-position:center;background-repeat:no-repeat}']});let s=n;return s})();export{E as a};