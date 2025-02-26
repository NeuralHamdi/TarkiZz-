 //show/hide pomorodo div 
 const pomodorDiv = document.querySelector('#pomodoro');
 const SelectElement = document.querySelector('#SelectElement');

 SelectElement.addEventListener('change',function(){
     pomodorDiv.classList.remove('hidden');
 })

 // Sentence alternation
 const sentence_1 = document.querySelector('#sentence-1');
 const sentence_2 = document.querySelector('#sentence-2');
 const sentence_3 = document.querySelector('#sentence-3');
 const sentence_4 = document.querySelector('#sentence-4');
 
 // Initialize by hiding both sentences
 sentence_1.classList.add('hidden');
 sentence_2.classList.add('hidden');
 sentence_3.classList.add('hidden');
 sentence_4.classList.add('hidden');

 // Show sentence_1 initially
 sentence_1.classList.remove('hidden');

 function wait(ms) {
     return new Promise((resolve) => setTimeout(resolve, ms));
 }

 async function sentenceAutoChange() {
     while(true) {
         // Show sentence_1, hide sentence_2
         sentence_1.classList.remove('hidden');
         sentence_2.classList.add('hidden');
         await wait(5000);

         // Show sentence_2, hide sentence_1 
         sentence_2.classList.remove('hidden');
         sentence_1.classList.add('hidden');
         await wait(5000);
         
         // Show sentence_3, hide sentence_2
         sentence_3.classList.remove('hidden');
         sentence_2.classList.add('hidden');
         await wait(5000);

         // Show sentence_4, hide sentence_3 
         sentence_4.classList.remove('hidden');
         sentence_3.classList.add('hidden');
         await wait(5000);

         // Show sentence_1, hide sentence_4 
         sentence_1.classList.remove('hidden');
         sentence_4.classList.add('hidden');
         await wait(5000);
     }
 }

 // Start the alternating animation
 sentenceAutoChange();


 // DOM Elements
 const elements = {
     counter: document.querySelector('.counter'),
     startBtn: document.querySelector('#startBtn'),
     breakBtn: document.querySelector('#breakBtn'),
     modal: document.querySelector('#breakModal'),
     modalOkBtn: document.querySelector('#modalOkBtn'),
     progressBar: document.getElementById('timerProgress')
 };

 // Timer Configuration
 const TIMER_CONFIG = {
     FOCUS_TIME: 1500, // 25 minutes in seconds
     UPDATE_INTERVAL: 1000 // 1 second
 };

 // Timer State
 let timerState = {
     timeLeft: TIMER_CONFIG.FOCUS_TIME,
     isRunning: false,
     timerInterval: null
 };

 // Button Styles
 const BUTTON_STYLES = {
     start: {
         html: '<i class="fas fa-play mr-4"></i>Start',
         bgColor: 'black'
     },
     pause: {
         html: '<i class="fas fa-pause mr-4"></i>Pause',
         bgColor: 'red'
     }
 };

 // Timer Functions
 function updateTimerDisplay(timeLeft) {
     const minutes = Math.floor(timeLeft / 60);
     const seconds = timeLeft % 60;
     elements.counter.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
     
     const percentComplete = ((TIMER_CONFIG.FOCUS_TIME - timeLeft) / TIMER_CONFIG.FOCUS_TIME) * 100;
     elements.progressBar.style.width = `${percentComplete}%`;
 }

 function updateButtonState(isRunning) {
     const style = isRunning ? BUTTON_STYLES.pause : BUTTON_STYLES.start;
     elements.startBtn.innerHTML = style.html;
     elements.startBtn.style.backgroundColor = style.bgColor;
 }

 function startTimer() {
     if (!timerState.isRunning) {
         timerState.isRunning = true;
         updateButtonState(true);
         
         const startTime = Date.now();
         const initialTimeLeft = timerState.timeLeft;
         
         timerState.timerInterval = setInterval(() => {
             const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
             timerState.timeLeft = initialTimeLeft - elapsedTime;
             
             if (timerState.timeLeft > 0) {
                 updateTimerDisplay(timerState.timeLeft);
             } else {
                 reset();
                 elements.counter.textContent = "Time's up!";
             }
         }, TIMER_CONFIG.UPDATE_INTERVAL);
     } else {
         pauseTimer();
     }
 }

 function pauseTimer() {
     timerState.isRunning = false;
     updateButtonState(false);
     clearInterval(timerState.timerInterval);
 }

 function reset() {
     pauseTimer();
     timerState.timeLeft = TIMER_CONFIG.FOCUS_TIME;
     updateTimerDisplay(TIMER_CONFIG.FOCUS_TIME);
     elements.progressBar.style.width = '0%';
 }

 // Break Button Management
 function updateBreakButtonState() {
     elements.breakBtn.disabled = !timerState.isRunning;
     elements.breakBtn.classList.toggle('opacity-50', !timerState.isRunning);
     elements.breakBtn.classList.toggle('cursor-not-allowed', !timerState.isRunning);
 }

 // Event Listeners
 elements.startBtn.addEventListener('click', () => {
     startTimer();
     updateBreakButtonState();
 });

 elements.breakBtn.addEventListener('click', () => {
     if (timerState.isRunning) {
         pauseTimer();
         elements.modal.classList.remove('hidden');
     }
 });

 elements.modalOkBtn.addEventListener('click', () => {
     elements.modal.classList.add('hidden');
     startTimer();
 });

 // Initialize
 updateBreakButtonState();