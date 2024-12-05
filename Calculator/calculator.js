let calculation = JSON.parse(localStorage.getItem('calculation')) || '';

    function saveCalculation(calculation) {
        localStorage.setItem('calculation', JSON.stringify(calculation));
    }

    function showCalculation(calculation) {
        document.querySelector('.output').innerHTML = `<p>${calculation}</p>`;
    }