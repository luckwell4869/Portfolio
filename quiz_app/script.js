const quizData = [
    {
        question: 'Which is the second highest mountain in Japan?',
        a: '槍ヶ岳',
        b: '北岳',
        c: '奥穂高岳',
        d: '間ノ岳',
        correct: 'b' ,
    },{
        question: 'What is the 7th goal of SDGs?',
        a: 'NO PERVERTY',
        b: 'CLEAN WATER AND SANITATION',
        c: 'INDUSTRY, INNOVATION AND INFRASTRUCTURE',
        d: 'AFFORDABLE AND CLEAN ENERGY',
        correct: 'd',
    },{
        question: 'Which city is on the same latitude as Sapporo, in Hokkaido?',
        a:'Marseille',
        b:'Calfornia',
        c:'London',
        d:'Rome',
        correct: 'a',
    }
];

const quiz = document.getElementById('quiz');
const questionEl = document.getElementById('question');
const answerEls = document.querySelectorAll("answer");
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');



let currentQuiz  = 0;
let score = 0;

loadQuiz();


function loadQuiz(){
    deselectAnswers();

    const currentQuizData = quizData[currentQuiz];

    questionEl.innerHTML = currentQuizData.question;
    a_text.innerHTML = currentQuizData.a;
    b_text.innerHTML = currentQuizData.b;
    c_text.innerHTML = currentQuizData.c;
    d_text.innerHTML = currentQuizData.d;
}


function getSelected(){
    let answer = undefined;

    answerEls.forEach((answerEl) => {
        if(answerEl.checked){
            answer  = answerEl.id;
        }
    });

    return answer;
}


function deselectAnswers(){
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    });
}


submitBtn.addEventListener('click', () => {
    let answer = getSelected();

    if(answer){
        if(answer == quizData[currentQuiz].correct){
            score++;
        }
    }
    currentQuiz++;

    if(currentQuiz < quizData.length){
        loadQuiz();
    }else{
        //SHOW RESULT
        quiz.innerHTML = `<h2>You answered correctly at ${score}/${quizData.length} questions</h2>
        <button onClick="location.reload()">RELOAD</button> `;
    }

});

    