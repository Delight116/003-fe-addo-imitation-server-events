// Реализовать небольшую браузерную стратегию на основе взаимодействия с DOM. Суть заключается в следующем: у нас есть три постройки которые приносят ресурсы, лесопилка, каменоломня и золотоносная шахта.
// Лесопилка, например, приносит от 5 до 8 единиц (генерировать случайным числом) ресурсов каждые 10 сек.
// Каменоломня приносит от 10 до 15 единиц каждые 14 сек.
// Золотая шахта - от 4 до 6 единиц каждые 18 сек.
// Новый отсчет не начинается, пока ресурсы не будут собраны. За ресурсы мы можем апгрейдить наш Замок, для апгрейда доступны три уровня. Например для апгрейда до первого уровня нужно: 10 дерева, 15 камня, 8 золота. Для второго и третьего придумайте сами. Когда для апгрейда на новый уровень достаточно ресурсов нужно сообщить. После подтверждения замок апгрейдится, соответствующее количество ресурсы со склада убирается. Визуализация не важна, главное код.

class game {
  constructor(){
    this.gold = 0;
    this.wood = 0;
    this.stone = 0;
    this.continueGold = false;
    this.continueWood = false;
    this.continueStone = false;


    console.log('game begin');
  }
  random(min, max){
    var rand = min + Math.random() * (max - min)
    rand = Math.round(rand);
    return rand;
  }

  getGold(){
    return this.gold;
  }
  getWood(){
    return this.wood;
  }
  getStone(){
    return this.stone;
  }

  addGold(){
      this.gold += this.random(4, 6);
  }
  addWood(){
      this.wood += this.random(5, 8);
  }
  addStone(){
      this.stone += this.random(10, 15);
  }

  setGold(res){
    this.gold = res;
  }
  setWood(res){
    this.wood = res;
  }
  setStone(res){
    this.stone = res;
  }
  ContinueRes(){
    this.continue = true;
  }
  canLevelUp(elem){
    if(elem == "gold"){
      console.log('can level up');
    }else if (elem == "wood") {
      console.log('can level up');
    }else if(elem == "stone"){
      console.log('can level up');
    }else if(elem == "castl"){
      var level = document.getElementById('castl_level').textContent;
      level = +level;
      if(this.gold >=8 && this.wood >= 10 && this.stone >=15 && level == 1 || this.gold >=16 && this.wood >= 20 && this.stone >=30 && level == 2|| this.gold >=32 && this.wood >= 40 && this.stone >=60 && level == 3){
          return true;
      }else{
        return false;
      }
    }

  }
  toScreen(obj){
    if(obj == "gold"){
      document.getElementById('gold_res').textContent = this.getGold();
    }else if (obj == "wood") {
      document.getElementById('wood_res').textContent = this.getWood();
    }else if(obj == "stone"){
      document.getElementById('stone_res').textContent = this.getStone();
    }else{
      document.getElementById('gold_res').textContent = this.getGold();
      document.getElementById('wood_res').textContent = this.getWood();
      document.getElementById('stone_res').textContent = this.getStone();
    }

  }
  levelUp(obj) {
    var level = document.getElementById(obj).textContent;
    level = +level;
    if (obj === 'castl_level'){
      if(level == 1){
        this.gold = this.gold - 8;
        this.wood = this.wood - 10;
        this.stone = this.stone - 15;
        document.getElementById(obj).textContent = +level+1;

      }else if (level == 2) {
        this.gold = this.gold - 16;
        this.wood = this.wood - 20;
        this.stone = this.stone - 30;
        document.getElementById(obj).textContent = +level+1;

      }else if (level == 3) {
        this.gold = this.gold - 32;
        this.wood = this.wood - 40;
        this.stone = this.stone - 60;
        document.getElementById(obj).textContent = ' MAX !';
      }

    }else{
      document.getElementById(obj).textContent = +level+1;
    }
    this.toScreen(obj);


  }

  ShowTakeRes(elem){
      document.getElementById(elem).classList.add('show');

      if(elem == "gold"){
        this.continueGold = true;
      }else if (elem == "wood") {
        this.continueWood = true;
      }else if(elem == "stone"){
        this.continueStone =  true;
      }

  }
  HideTakeRes(elem){
      document.getElementById(elem).classList.remove('show');
      if(this.canLevelUp('castl') == true){
        document.getElementById('castl').classList.add('show');
      }
      if(elem == "gold"){
        this.addGold();
        this.continueGold = false;
      }else if (elem == "wood") {
        this.addWood();
        this.continueWood = false;
      }else if(elem == "stone"){
        this.addStone();
        this.continueStone = false;
      }
      this.toScreen(elem);

  }

}

var test =new game();

function gold() {
  if(test.continueGold == false){
    setTimeout(function(){
      test.ShowTakeRes('gold');
    },1800);
  }else{
    console.log("gold error");
  }
}
function wood() {
  if(test.continueWood == false){
    setTimeout(function(){
      test.ShowTakeRes('wood');
    },1000);
  }else{
    console.log("wood error");
  }
}
function stone() {
  if(test.continueStone == false){
    setTimeout(function(){
      test.ShowTakeRes('stone');
    },1400);
  }else{
    console.log("stone error");
  }
}
document.getElementById('take_wood').addEventListener('click',function sWood(){
  event.preventDefault()
  var parent = this.parentNode.id;
  test.HideTakeRes(parent);
  wood();

});
document.getElementById('take_gold').addEventListener('click',function sGold(){
  event.preventDefault()
  var parent = this.parentNode.id;
  test.HideTakeRes(parent);
  gold();

});
document.getElementById('take_stone').addEventListener('click',function sStone(){
  event.preventDefault()
  var parent = this.parentNode.id;
  test.HideTakeRes(parent);
  stone();

});
document.getElementById('update').addEventListener('click',function sStone(){
  event.preventDefault()
  var parent = this.parentNode.id;
  test.levelUp('castl_level');
  test.HideTakeRes(parent);
  stone();

});
function main(){

    gold();
    wood();
    stone();

    document.getElementById('take_wood').removeEventListener('click',function(){});
    document.getElementById('take_gold').removeEventListener('click',function(){});
    document.getElementById('take_stone').removeEventListener('click',function(){});
}



  main();







// do{
//   setTimeout(function(){
//     test.addWood();
//     test.toScreen();
//     test.ShowTakeRes('wood');
//   },10000);
//   setTimeout(function(){
//     test.addStone();
//     test.toScreen();
//     test.ShowTakeRes('stone');
//   },14000);
//   setTimeout(function(){
//     test.addGold();
//     test.toScreen();
//     test.ShowTakeRes('gold');
//   },18000);
// } while(test.continue == true)





console.log(test.getStone(), test.getWood(), test.getGold());
