//selección de todos los elementos necesarios
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// if -Si el botón StartQuiz hizo clic en
start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); //mostrar cuadro de información
}

// if -Si el botón ExitQuiz hizo clic en
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //ocultar cuadro de información
}

// if - Si continúa, haga clic en el botón ContinueQuiz
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //ocultar cuadro de información
    quiz_box.classList.add("activeQuiz"); //mostrar cuadro de preguntas
    showQuetions(0); //llamar a la función ShowQestions
    queCounter(1); //pasar 1 parámetro a queCounter
    startTimer(15); //Llamar a la función startTimer
    startTimerLine(0); //llamar a la función startTimerLine
}

let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if reiniciarAbotón de clic en el botón Restart
restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz"); //mostrar cuadro de preguntas
    result_box.classList.remove("activeResult"); //ocultar cuadro de resultados
    timeValue = 15;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //llamar a la función ShowQestions
    queCounter(que_numb); //pasar que_numb valor a queCounter
    clearInterval(counter); //clear counter / contador claro
    clearInterval(counterLine); //clear counterLine / borrar contralínea
    startTimer(timeValue); //Llamar a la función startTimer
    startTimerLine(widthValue); //llamar a la función startTimerLine
    timeText.textContent = "Tiempo restante"; //Cambiar el texto de timeText a Time Left
    next_btn.classList.remove("show"); //ocultar el botón siguiente
}

// if SalirAquín clic en el botón Click
quit_quiz.onclick = () => {
    window.location.reload(); //Vuelva a cargar la ventana actual
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Siguiente botón Que clicado
next_btn.onclick = () => {
    if (que_count < questions.length - 1) { //if El número de preguntas es menor que la longitud total de las preguntas
        que_count++; //Incrementar el valor que_count
        que_numb++; //Incrementar el valor de que_numb
        showQuetions(que_count); //llamar a la función ShowQestions
        queCounter(que_numb); //pasar que_numb valor a queCounter
        clearInterval(counter); //clear counter / contador claro
        clearInterval(counterLine); //clear counterLine / borrar contralínea
        startTimer(timeValue); //Llamar a la función startTimer
        startTimerLine(widthValue); //llamar a la función startTimerLine
        timeText.textContent = "Tiempo restante"; //Cambiar el tiempoTexto a Tiempo restante
        next_btn.classList.remove("show"); //ocultar el botón siguiente
    } else {
        clearInterval(counter); //clear counter / contador claro
        clearInterval(counterLine); //clear counterLine / borrar contralínea
        showResult(); //llamar a la función showResult
    }
}

// obtener preguntas y opciones de la matriz
function showQuetions(index) {
    const que_text = document.querySelector(".que_text");

    //Crear una nueva etiqueta SPAN y DIV para la pregunta y la opción y pasar el valor mediante el índice de matriz
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>' +
        '<div class="option"><span>' + questions[index].options[1] + '</span></div>' +
        '<div class="option"><span>' + questions[index].options[2] + '</span></div>' +
        '<div class="option"><span>' + questions[index].options[3] + '</span></div>';
    que_text.innerHTML = que_tag; //agregar una nueva etiqueta span dentro de que_tag
    option_list.innerHTML = option_tag; //agregar una nueva etiqueta div dentro de option_tag

    const option = option_list.querySelectorAll(".option");

    // Establezca el atributo OnCLick en todas las opciones disponibles
    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// crear las nuevas etiquetas DIV que para los iconos
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if el usuario hizo clic en la opción
function optionSelected(answer) {
    clearInterval(counter); //clear counter / contador claro
    clearInterval(counterLine); //borrar contralínea
    let userAns = answer.textContent; //obtener la opción seleccionada por el usuario
    let correcAns = questions[que_count].answer; //obtener la respuesta correcta de la matriz
    const allOptions = option_list.children.length; //obtener todos los elementos de opción

    if (userAns == correcAns) { //if La opción seleccionada por el usuario es igual a la respuesta correcta de la matriz
        userScore += 1; //actualizar el valor de la puntuación con 1
        answer.classList.add("correct"); //agregar color verde para corregir la opción seleccionada
        answer.insertAdjacentHTML("beforeend", tickIconTag); //Agregar icono de marca para corregir la opción seleccionada
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    } else {
        answer.classList.add("incorrect"); //Agregar color rojo para corregir la opción seleccionada
        answer.insertAdjacentHTML("beforeend", crossIconTag); //Agregar icono de cruz para corregir la opción seleccionada
        console.log("Wrong Answer");

        for (i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correcAns) { //if Hay una opción que coincide con una respuesta de matriz
                option_list.children[i].setAttribute("class", "option correct"); //agregar color verde a la opción coincidente
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //agregar el icono de marca a la opción coincidente
                console.log("Auto selected correct answer.");
            }
        }
    }
    for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); //Una vez que el usuario seleccione una opción, deshabilitó todas las opciones
    }
    next_btn.classList.add("show"); //Mostrar el botón Siguiente si el usuario ha seleccionado alguna opción
}

function showResult() {
    info_box.classList.remove("activeInfo"); //ocultar cuadro de información
    quiz_box.classList.remove("activeQuiz"); //ocultar cuadro de preguntas
    result_box.classList.add("activeResult"); //Cuadro Mostrar resultado
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3) { // if el usuario obtuvo más de una puntuación superior a la de 3
        //crear una nueva etiqueta span y pasar el número de puntuación de usuario y el número total de pregunta
        let scoreTag = '<span>Genial! 🎉, Tienes <p>' + userScore + '</p> de <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag; //agregar una nueva etiqueta span dentro de score_Text
    } else if (userScore > 1) { // if el usuario obtuvo más de una puntuación superior a la de 1
        let scoreTag = '<span>y Bien 😎, Tienes <p>' + userScore + '</p> de <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    } else { // if el usuario obtuvo una puntuación inferior a 1
        let scoreTag = '<span>Lo siento 😐, Solo tienes <p>' + userScore + '</p> de <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time) {
    counter = setInterval(timer, 1000);

    function timer() {
        timeCount.textContent = time; //cambiar el valor de timeCount con el valor de tiempo
        time--; //disminuye el valor de tiempo
        if (time < 9) { //if el temporizador es menor que 9
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero; //Agregue un valor 0 antes de tiempo
        }
        if (time < 0) { //if el temporizador es menor que 0
            clearInterval(counter); //contador claro
            timeText.textContent = "Termino"; //Cambiar el texto de tiempo a tiempo libre
            const allOptions = option_list.children.length; //obtener todos los elementos de opción
            let correcAns = questions[que_count].answer; //obtener la respuesta correcta de la matriz
            for (i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correcAns) { //if Hay una opción que coincide con una respuesta de matriz
                    option_list.children[i].setAttribute("class", "option correct"); //agregar color verde a la opción coincidente
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //agregar el icono de marca a la opción coincidente
                    console.log("Termino: Auto selected correct answer.");
                }
            }
            for (i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled"); //Una vez que el usuario seleccione una opción, deshabilitó todas las opciones
            }
            next_btn.classList.add("show"); //Mostrar el botón Siguiente (if)si el usuario ha seleccionado alguna opción
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 29);

    function timer() {
        time += 1; //actualizar el valor de tiempo con 1
        time_line.style.width = time + "px"; //aumentar el ancho de time_line con px por valor de tiempo
        if (time > 549) { //if El valor de tiempo es mayor que 549
            clearInterval(counterLine); //borrar contralínea
        }
    }
}

function queCounter(index) {
    //Crear una nueva etiqueta SPAN y pasar el número de pregunta y la pregunta total
    let totalQueCounTag = '<span><p>' + index + '</p> de <p>' + questions.length + '</p> Preguntas</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag; //agregar una nueva etiqueta span dentro de bottom_ques_counter
}