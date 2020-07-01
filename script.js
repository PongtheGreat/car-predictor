function getModel() {
    const brand = document.getElementById("brand").value;
    let model_element = document.getElementById("model");

    if(model_element.length > 0) model_element.innerHTML = "";

    axios.get(`https://oknotok.herokuapp.com/model/"${brand}"`, {
    })
    .then((response) => {
        let option = document.createElement("option");
        option.value = "";
        option.innerHTML = "--";
        model_element.appendChild(option);
        response.data.forEach(m => {
            option = document.createElement("option");
            option.value = m.car_model;
            option.innerHTML = m.car_model;
            model_element.appendChild(option);
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

function getEngineCapacity() {
    const brand = document.getElementById('brand').value;
    const model = document.getElementById('model').value;
    const transmission = document.getElementById('transmission').value;
    let engine_element = document.getElementById('engine');

    if(engine_element.length > 0) engine_element.innerHTML = "";

    axios.get(`https://oknotok.herokuapp.com/engine/"${brand}"/"${model}"/"${transmission}"`, {
    })
    .then((response) => {
        let option = document.createElement("option");
        option.value = "";
        option.innerHTML = "--";
        engine_element.appendChild(option);
        response.data.forEach(e => {
            option = document.createElement("option");
            option.value = e.engine_capacity;
            option.innerHTML = e.engine_capacity;
            engine_element.appendChild(option);
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

function getManufacturedYear() {
    const engine = document.getElementById('engine');
    let manufactured_element = document.getElementById('manufactured');

    if(manufactured_element.length > 0) manufactured_element.innerHTML = "";

    axios.get(`https://oknotok.herokuapp.com/model/"${engine}"`, {
    })
    .then((response) => {
        response.data.forEach(my => {
            let option = document.createElement("option");
            option.value = my.manufactured_year;
            option.innerHTML = my.manufactured_year;
            console.log(option);
        })
    })
}