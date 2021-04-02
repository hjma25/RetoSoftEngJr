const url = 'https://jsonplaceholder.typicode.com/users/1/posts';

fetch(url)
.then(response => response.json())
.then(data => {
    let arreglo = [];
    for (let i = 0; i < data.length; i++) {
        arreglo[i] = data[i];
    }
    document.querySelector(".slider").style.width = (arreglo.length * 100)+'%';
    let element = document.querySelector('.slider');
    for (let i = 0; i < arreglo.length; i++) {
        element.innerHTML += `
            <div class="slider__section">
                <p class="user-id">User ID: ${arreglo[i].userId}</p>
                <p class="id">Post ID: ${arreglo[i].id}</p>
                <div class="body">
                    <p>${arreglo[i].body}</p>
                </div>
                <p class="title">${arreglo[i].title}</p>
            </div>
        `;
    }
    activarSlider();
})
.catch(err => console.log(err))

function activarSlider() {
    const slider = document.querySelector("#slider");
    let sliderSection = document.querySelectorAll(".slider__section");
    let sliderSectionLast = sliderSection[sliderSection.length - 1];

    const btnLeft = document.querySelector("#btn-left");
    const btnRight = document.querySelector("#btn-right");

    slider.insertAdjacentElement('afterbegin', sliderSectionLast);

    function next() {
        let sliderSectionFirst = document.querySelectorAll(".slider__section")[0];
        slider.style.marginLeft = "-200%";
        slider.style.transition = "all 0.3s";
        setTimeout(function() {
            slider.style.transition = "none";
            slider.insertAdjacentElement('beforeend', sliderSectionFirst);
            slider.style.marginLeft = "-100%";
        }, 300);
    }

    function previous() {
        let sliderSection = document.querySelectorAll(".slider__section");
        let sliderSectionLast = sliderSection[sliderSection.length - 1];
        slider.style.marginLeft = "0";
        slider.style.transition = "all 0.3s";
        setTimeout(function() {
            slider.style.transition = "none";
            slider.insertAdjacentElement('afterbegin', sliderSectionLast);
            slider.style.marginLeft = "-100%";
        }, 300);
    }

    btnRight.addEventListener('click', function(){
        next();
    });

    btnLeft.addEventListener('click', function(){
        previous();
    });

    // Código para volver automático el desplazamiento
    /* setInterval(function(){
        next();
    }, 2000); */
}