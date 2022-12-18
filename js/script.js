document.addEventListener('DOMContentLoaded', () =>{
 const tabs = document.querySelectorAll('.tabheader__item'),
       tabsContent = document.querySelectorAll('.tabcontent'),
       tabsParent = document.querySelector('.tabheader__items');

        //Tabs
       function hideTabContent(){
        tabsContent.forEach(tab =>{
            tab.style.display = 'none';
        });


        tabs.forEach(tab  =>{
            tab.classList.remove('tabheader__item_active');
        });
       }


       function showTabContent(i = 0){
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
       }

       hideTabContent();
       showTabContent();


       tabsParent.addEventListener('click',(event) =>{
        const target = event.target;
        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((tab, i) =>{
             if(target === tab){
                hideTabContent();
                showTabContent(i); 
             }
            });
        }
       });


    //Timer

    const deadLine = '2023-04-20';
    function getTimeRemaining (endTime){
        let days,hours,minutes, seconds ;
        const t = Date.parse(endTime) - Date.parse(new Date());
        if(t <= 0){
            days = 0;
             hours = 0;
             minutes = 0;
             seconds = 0;
        }else{
            days = Math.floor(  (t/(1000*60*60*24)) );
            hours = Math.floor( (t/(1000*60*60) % 24) );
            minutes = Math.floor( (t/1000/60) % 60);
            seconds = Math.floor( (t/1000) % 60);
        }


              return {
                'total': t,
                'days' : days,
                'hours': hours,
                'minutes' : minutes,
                'seconds' : seconds,
              };
    }
           function getZero(num){
                if(num >= 0 && num <10){
                    return `0${num}`;
                }
                else{
                    return num;
                }
            }

    function getClock (selector , endTime){
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updadeClock, 1000);

              updadeClock();
    function updadeClock(){
        const t  = getTimeRemaining(endTime);
              days.textContent = getZero(t.days);
              hours.textContent = getZero(t.hours);
              minutes.textContent = getZero(t.minutes);
              seconds.textContent = getZero(t.seconds);


              if(t.total <= 0){
                clearInterval(timeInterval);
              }
            }
    }

    getClock('.timer', deadLine);



//Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');


        function openModal(){
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';
            clearInterval(setTimerId);
        }

        modalTrigger.forEach(btn =>{
            btn.addEventListener('click', openModal);
        });

        function closeModal(){
            modal.classList.add('hide');
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }

        modalCloseBtn.addEventListener('click', closeModal);


        modal.addEventListener('click' ,(e) =>{
            if(e.target === modal){
              closeModal();
              document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown' , (e) =>{
            if(e.code === 'Escape' && modal.classList.contains('show')){
                closeModal();
            }
        });

    const setTimerId = setTimeout(openModal, 5000);


    function showModalByScroll(){
        if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal();
            removeEventListener('scroll' ,showModalByScroll);
        }
    }
    window.addEventListener('scroll' ,showModalByScroll);



    //Cards

    class MenuCard {
        constructor(img, alt, title, text, price, parentSelector, ...classes){
            this.img = img;
            this.alt = alt;
            this.title = title;
            this.text = text;
            this.price = price;
            this.transfer = 27;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.changeToUa();
        }

        changeToUa(){
            this.price *= this.transfer;
        }

        render(){
            const elem = document.createElement('div');
            if(this.classes.length === 0){
                this.elem = 'menu__item';
                elem.classList.add(this.elem);
            }else{
                this.classes.forEach(className => elem.classList.add(className));
            }
            elem.innerHTML = `
                <img src=${this.img} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.text}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;

            this.parent.append(elem);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "very", 
        'Меню "Фитнес"',
        `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. 
        Продукт активных и здоровых людей. Это абсолютно новый продуктс оптимальной ценой и высоким качеством!`, 
        '9',
        '.menu .container', 
        'menu__item'
    ).render();


    new MenuCard(
        "img/tabs/elite.jpg",
        "post", 
        'Меню "Постное"',
        `Меню “Постное” - это тщательный подбор ингредиентов:
         полное отсутствие продуктов животного происхождения,
          молоко из миндаля, овса, кокоса или гречки, 
          правильное количество белков за счет тофу и импортных вегетарианских стейков.`, 
        '5',
        '.menu .container', 
        'menu__item'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite", 
        'Меню “Премиум”',
        `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. 
        Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`, 
        '7',
        '.menu .container', 
        'menu__item'
    ).render();

    //Forms
        const forms = document.querySelectorAll('form');

        const messages = {
            load: 'Загрузка',
            success: 'Успешно',
            error: 'Ошибка',
        };

        forms.forEach(item =>{
          postData(item); 
        })

    function postData(form){
        form.addEventListener('submit', (e) =>{
        e.preventDefault();

        const statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        statusMessage.textContent = messages.load;
        form.appendChild(statusMessage);

        const r = new XMLHttpRequest();
        r.open('POST', 'server.php');
        const formData = new formData(form);
        r.send(form);

        r.addEventListener('load', ()=>{
            if(r.status === 200){
                statusMessage.textContent = messages.success;
            }else{
                statusMessage.textContent = messages.error;
            }
        })
        });
    }



    //Slider

        const slides = document.querySelectorAll('.offer__slide'),
              prev = document.querySelector('.offer__slider-prev'),
              next = document.querySelector('.offer__slider-next');

        let slideIndex = 1;

        showSlides(slideIndex);

        function showSlides (n){
            if( n > slides.length){
                slideIndex = 1;
            }

            if( n < 1){
                slideIndex = slides.length;
            }


            slides.forEach(slide => slide.style.display = 'none');

            slides[slideIndex - 1].style.display = 'block';
        }
    


        function plusSlide (n){
            showSlides(slideIndex += n);
        }

        prev.addEventListener('click', () =>{
            plusSlide(-1);
        });

        next.addEventListener('click' , () =>{
            plusSlide(1);
        });
});






// Main:for(let i = 2; i <= 10; i++){
//     for(let j = 2; j < i; j++){ 
//         if(i % j === 0 ){
//             continue Main;
//         }
//     }
//     console.log(i); 
// }







// let x = prompt("x?", '');
// let n = prompt("n?", '');


// function pow(x  , n ) {
//     let result = x; 
  
//     for (let i = 1; i < n; i++) {
//       result *= x; 
//     }
  
//     return result; 
//   }
  



  // function ask(question, yes, no) {
  //   if (confirm(question)){
  //       yes();
  //   }
  //   else{
  //       no();
  //   }
  // }
  
  // function showOk() {
  //   alert( "Вы согласны." );
  // }
  
  // function showCancel() {
  //   alert( "Вы отменили выполнение." );
  // }
  
  // ask("Вы согласны?", showOk, showCancel);




  // function ask(question, yes, no) {
  //   if (confirm(question)){
  //       yes();
  //   }
  //   else{
  //       no();
  //   }
  // }
  



  // let ask2 = (question, yes, no) => {
  //   if (confirm(question)){
  //       return yes();
  //   }
  //   else{
  //       return no();
  //   }
  // };

  // ask2(
  //   "Вы согласны?",
  //   () =>  alert("Вы согласились."),
  //  () =>  alert("Вы отменили выполнение.") 
  // );











// function addList (item , list){
//     return list.push(item);
// }

// const result = addList('apple', ['banana']);
// console.log(result);





// function isEmpty(obj) {
//     for (let key in obj) {
//       // если тело цикла начнет выполняться - значит в объекте есть свойства
//       return false;
//     }
//     return true;
//   }



//   let salaries = {
//     John: 100,
//     Ann: 160,
//     Pete: 130
//   };

// let sum = 0;
//   function calcSalary (obj){
//     for(let key in obj){
//        sum += obj[key];
//     }
//     return sum;
//   }

//   console.log(calcSalary(salaries));


//   let menu = {
//     width: 200,
//     height: 300,
//     title: "My menu"
//   };


//   function multiplyNumeric(obj){
//      for(let key in obj){
//         if(typeof(obj[key]) == 'number'){
//             obj[key] *= 2;
//         }
//      }
//      return obj;
//   }

//   console.log(multiplyNumeric(menu));









//   let userName = 'Вася';

// function showMessage() {
//   userName = "Петя"; 

//   let message = 'Привет, ' + userName;
//   alert(message);
// }


// showMessage();

// alert( userName );









// function showMessage(from, text) {

//     from = '*' + from + '*'; 
  
//     return( from + ': ' + text );
//   }
  
//   let from = "Аня";
  
//   console.log(showMessage(from, "Привет")); 
//   console.log(from);







//   function showPrimes(n) {
//     nextPrime: for (let i = 2; i < n; i++) {
  
//       for (let j = 2; j < i; j++) {
//         if (i % j == 0){
//             continue nextPrime;
//         }
//       }
  
//       console.log( i );
//     }

//   }

//   console.log(showPrimes(10));


// 1)  i =2; 2<10; заходим внутрьж
// j = 2; 2< 2 (false)  console 2
// 2) i =3; 3<10 
// j = 2; 2<3  2%3 !=0(false) console 3
// 3) i=4; 4<10
//  j =2  2<4 4%2===0 (true) пропускаем
// 4) i = 5; 5<10;
// j =3 ; 3< 5; 3% 5!=0 (false) console 5
// i =6; 6<10; 
// j =2; 2<6; 2%6==0 (true) пропускаем
// 5) i =7; 7<10;
// j =3; 3<7 3 %7 != 0 (false) console 7
// 6) i =8; 8<10;
// j = 2; 2<8; 2%8 ===0 (true) пропускаем
// 7) i =9; 9<10;
// j=3; 3<9; 3% 9 === 0 (true) пропускаем
//  8) i =10; 10<10 
//  j= 4 4<10; 4%10 ==0 (true)
// цикл кончился





// function showPrimes(n=10) {

//     for (let i = 2; i < n; i++) {
//       if (!isPrime(i)) {
//         continue;
//       }
  
//       console.log(i);  
//     }
//   }


  
//   function isPrime(n=10) {
//     for (let i = 2; i < n; i++) {
//       if ( n % i == 0) {
//         return false;
//       }
//     }
//     return true;
//   }

//   console.log(showPrimes(10));




//   console.log('Hello, World!');


//  const str = 'some long sentence';

//  const arr =str.split('');
// arr.reverse('');
//  let reversedStr= arr.join('');
//  console.log(reversedStr);

//      const malls = [
//      {floor: 4, width: 200},
//     {floor: 5, width: 150},
//     {floor: 1, width: 5000},
//     ];
//     let sum = 0;
//     let total = malls.filter((item)=>{
//       sum += item.width;
//     });
//       console.log(sum);
  // let someUsers = malls.reduce((sum, item) => item.width + sum, 0);

  // console.log(someUsers);




// const Calculator = {
//   read(){
//       this.num1 = +prompt('input 1stnum');
//       this.num2 = +prompt('input 2ndnum');
      
//   },

//   sum(){
//     return this.num1 + this.num2;
//   },
//   mul(){
//     return this.num1 * this.num2;
//   }

// };

// const calculator = new Calculator();

// calculator.read();
// alert(calculator.sum());
// alert(calculator.mul());



// let ladder = {
//   step: 0,
//   up() {
//     this.step++;
//     return this;
//   },
//   down() {
//     this.step--;
//     return this;
//   },
//   showStep: function() { // показывает текущую ступеньку
//     alert( this.step );
//     return this;
//   }
// };

// ladder.up().up().down().showStep().down().showStep(); 



// function Accumulator (startingValue){
//   this.value = startingValue;
//   this.read = () =>{
//     this.value += +prompt('input 1stnum');
//   };
// }

// let accumulator = new Accumulator (1);

// accumulator.read();
// accumulator.read();
// alert(accumulator.value);


// function readNumber(){
//   let num;
//   for( let i = 0; ; i++){
//     num = prompt('input 1stnum');
//     if(isFinite(num)){
//       break;
//     } 
//   }
//   if(num === '' || num === null){
//     return null;
//   }
//     return +num;
// }

// alert(`Число: ${readNumber()}`);

// function usFirst(str){
// if(!str){
//   return console.log(str);
// }else{
//   return str[0].toUpperCase() + str.slice(1);
// }
// }
// console.log(usFirst('diana'));

// function checkSpam(str){
//   let newStr = str.toLowerCase();
//  return newStr.includes("viagra") || newStr.includes("xxx");
// }

// console.log(checkSpam('buy ViAgRA now'));



// function spam(str){
//   let toLow = str.toLowerCase();
//   if(toLow === 'viagra' || toLow === 'xxx'){
//     return true;
//   }else{
//     return false;
//   }
// }
// console.log(spam('new xxx'));


// const styles = ['Джаз', 'Блюз'];
// styles.push('Рок-н-ролл');
// styles[Math.floor((styles.length -1) / 2)] = 'Классика';
// console.log(styles.shift());
// styles.unshift('Рэп', 'Регги');
// console.log(styles);




// function sumInput(){
//   let num = [];
//   for(let i = 0; ; i++){
//     let value = prompt('input num');
//     if(value === '' || value === null){
//       break;
//     }else{
//       num.push(+value);
//     }
//   }



//   let sum = 0;
//   for (let number of num) {
//     sum += number;
//   }
//   return sum;
// }

// sumInput();


