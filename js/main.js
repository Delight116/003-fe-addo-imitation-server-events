/*
Реализовать асинхронный метод который имитирует получение данных с сервера (данные о событиях которые проходят). Данные приходят в следующем виде:

events: [
{
	  id: 1,
	  name: “названия события”,
	  dateStart: “дата начала события”,
	  dateEnd: “дата завершения события”,
	  location: “место проведение”
	  },
…]
 (остальные данные сгенерировать самостоятельно)

Реализовать хранилище этих данных в виде объекта, со следующими возможностями:
взять событие по id;
вернуть список событий которые прошли (дата завершения которых больше текущей даты)
вернуть список событий которые идут сейчас (текущая дата попадает в диапазон даты начала и даты конца события)
вернуть список событий которые еще не наступили
вернуть массив строк которые преобразуют данные события в строку: “Название, место проведения: дата начала - дата конца”
*/
var proof;
function dateFormat(date){
    var months = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря"
    ];

    return date.getDate() + " "
        + months[date.getMonth()] + " "
        + date.getFullYear() + " "
        + date.getHours() + ":"
        + date.getMinutes();

}
var eventStorage = [];
var eventDates = [new Date(2016,11,5,15,0), new Date(2017,3,8,11,0), new Date(2017,1,30,21,0),new Date(2017,11,5,15,0), new Date(2017,1,21,16,0)];
var eventEndDates = [new Date(2016,11,8,15,0), new Date(2017,3,15,16,0), new Date(2017,2,5,10,0),new Date(2017,11,5,15,0), new Date()];
var eventLocation = ['Театр','Кіно зал','Екватор','Конкорд','Цум']
var eventNames = ['Концерт','Автограф сесія','Диско','Флеш Моб','Шото','Поход кудато','Прийшли','Можно йти','Уже пішли','Скоро будуть','Танцюльки','Співульки','Пянка','Бой','Чудо острів','Holahoop']
var nowDate = new Date();
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
var item=0;
var server = setInterval(function () {
  proof = false;
  elem = getRandom(0, 5)
  events =  {
      id: item,
      name: eventNames[item],
      dateStart: eventDates[elem],
      dateEnd: eventEndDates[elem],
      location: eventLocation[elem]
    }
    eventStorage[item] = events
  item++;
},100);

setTimeout(function () {
  clearInterval(server);
  main();
  // alert('Сервер загружен')

},1600)

function getEvent(id){
    if(eventStorage.hasOwnProperty(id)){
      return eventStorage[id]
    }
    return {}
}

function getPastEvent(){
  var res = []
  eventStorage.forEach(function (item) {
    if (item.dateEnd.getTime() < nowDate.getTime()) {
      console.log('past')
      res.push(item)
    }
  })
  return res;
}

function getFutureEvent(){
  var res = []
  eventStorage.forEach(function (item) {
    if (item.dateStart.getTime() > nowDate.getTime()) {
      console.log('future')
      res.push(item)
    }
  })
  return res;
}

function getNowEvent(){
  var res = []
  eventStorage.forEach(function (item) {
    if (item.dateStart.getTime() < nowDate.getTime() && item.dateEnd.getTime() >= nowDate.getTime()) {
      console.log('now')
      res.push(item)
    }
  })
  return res;
}

function showEvent(item){
  var str = ''
  item.forEach(function(elem) {
      str += 'Название: '+elem.name+'\nместо проведения: '+elem.location+'\nдата начала: '+dateFormat(elem.dateStart)+'\nдата конца: '+ dateFormat(elem.dateEnd)+'\n\n';
  })
  console.log(str);
}
function main(){
  console.log('Future events')
  showEvent(getFutureEvent())
  console.log('Now events')
  showEvent(getNowEvent())
  console.log('Past events')
  showEvent(getPastEvent())
}
