const fisrtReview = document.querySelector('#fisrtReview');
        const secondReview = document.querySelector('#secondReview');
        const thirdReview = document.querySelector('#thirdReview');

        setInterval(caroussel, 3000); //call the carroussel function once in a 3s

        let reviewsArr = [fisrtReview,secondReview,thirdReview];
        let currentIndex = 0 ;

        function caroussel(){
            reviewsArr.forEach(element => {
                element.classList.add('hidden')
                
            });
            reviewsArr[currentIndex].classList.remove('hidden');

            currentIndex = (currentIndex + 1) % reviewsArr.length ;
        }
