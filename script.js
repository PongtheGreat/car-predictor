function getModel() {
    const brand = document.querySelector("#brand").value;
    let model_element = document.querySelector("#model");

    if(model_element.length > 0) model_element.innerHTML = "";

    if(!(brand.length == 0)) {
        axios.get(`https://oknotok.herokuapp.com/model/"${brand}"`, {
        })
        .then((response) => {
            let option = document.createElement("option");
            option.value = "";
            option.innerHTML = "Select car model";
            model_element.appendChild(option);
            response.data.forEach(m => {
                option = document.createElement("option");
                option.value = m.car_model;
                option.innerHTML = m.car_model;
                model_element.appendChild(option);
            });
        })
        .catch((error) => {
            if(error.response.status == 404) {
                let option = document.createElement("option");
                option.value = "";
                option.innerHTML = error.response.statusText;
                engine_element.appendChild(option);
            } else {
                console.log(error.response.statusText)
            }
        });
    }
};

function getEngineCapacity() {
    const brand = document.querySelector('#brand').value;
    const model = document.querySelector('#model').value;
    const transmission = document.querySelector('#transmission').value;
    let engine_element = document.querySelector('#engine');

    if(engine_element.length > 0) engine_element.innerHTML = "";

    if(!(brand.length == 0 || model.length == 0 || transmission.length == 0)) {
        axios.get(`https://oknotok.herokuapp.com/engine/"${brand}"/"${model}"/"${transmission}"`, {
        })
        .then((response) => {
            let option = document.createElement("option");
            option.value = "";
            option.innerHTML = "Select engine capacity";
            engine_element.appendChild(option);
            response.data.forEach(e => {
                option = document.createElement("option");
                option.value = e.engine_capacity;
                option.innerHTML = e.engine_capacity;
                engine_element.appendChild(option);
            });
        })
        .catch((error) => {
            if(error.response.status == 404) {
                let option = document.createElement("option");
                option.value = "";
                option.innerHTML = error.response.statusText;
                engine_element.appendChild(option);
            } else {
                console.log(error.response.statusText)
            }
        });
    }
};

function getManufacturedYear() {
    const brand = document.querySelector('#brand').value;
    const model = document.querySelector('#model').value;
    const transmission = document.querySelector('#transmission').value;
    const engine = document.querySelector('#engine').value;
    let manufactured_element = document.querySelector('#manufactured');

    if(manufactured_element.length > 0) manufactured_element.innerHTML = "";

    if(!(brand.length == 0 || model.length == 0 || transmission.length == 0 || engine.length == 0)) {
        axios.get(`https://oknotok.herokuapp.com/manufactured/"${brand}"/"${model}"/"${transmission}"/"${engine}"`, {
        })
        .then((response) => {
                option = document.createElement("option");
                option.value = "";
                option.innerHTML = "Select manufactured year";
                manufactured_element.appendChild(option);
            response.data.forEach(my => {
                option = document.createElement("option");
                option.value = my.manufactured_year;
                option.innerHTML = my.manufactured_year;
                manufactured_element.appendChild(option);
            });
        })
        .catch((error) => {
            if(error.response.status == 404) {
                let option = document.createElement("option");
                option.value = "";
                option.innerHTML = error.response.statusText;
                engine_element.appendChild(option);
            } else {
                console.log(error.response.statusText)
            }
        })
    }
};

function getPrediction() {
    //Form data
    const brand = document.querySelector('#brand');
    const model = document.querySelector('#model');
    const transmission = document.querySelector('#transmission');
    const engine = document.querySelector('#engine');
    const manufactured = document.querySelector('#manufactured');

    //Price elements
    const price = document.querySelector('#actual_price');
    const predict_price = document.querySelector('#predicted_price');

    //price formatter
    let formatter = new Intl.NumberFormat('en-MY', {
        style: 'currency',
        currency: 'MYR',
    });

    if(brand.value.length == 0) {
        brand.focus();
        return;
    }
    
    if(model.value.length == 0) {
        model.focus();
        return;
    }
    
    if(transmission.value.length == 0) {
        transmission.focus();
        return;
    }

    if(engine.value.length == 0) {
        engine.focus();
        return;
    }
    
    if(manufactured.value.length == 0) {
        manufactured.focus();
        return;
    }

    axios.get(`https://oknotok.herokuapp.com/predict/"${brand.value}"/"${model.value}"/"${transmission.value}"/"${engine.value}"/"${manufactured.value}"`, {
    })
    .then((response) => {
        let data = response.data;

        if(data.length == 1) {
            let ap = formatter.format(data[0].price);
            let pp = formatter.format(data[0].predict_price);

            price.innerText = `${ap}`;
            predict_price.innerText = `${pp}`;
        } else {
            let aps = [];
            let pps = [];

            data.forEach(p => {
                aps.push(p.price);
                pps.push(p.predict_price);
            });

            let min_ap = Math.min(...aps);
            let max_ap = Math.max(...aps);
            let min_pp = Math.min(...pps);
            let max_pp = Math.max(...pps);

            min_ap = formatter.format(min_ap);
            max_ap = formatter.format(max_ap);
            min_pp = formatter.format(min_pp);
            max_pp = formatter.format(max_pp);

            price.innerText = `${min_ap} - ${max_ap}`;
            predict_price.innerText = `${min_pp} - ${max_pp}`;
        }
    })
    .catch((error) => {
        if(error.response.status == 404) {
            console.log("404")
        } else {
            console.log("boom")
        }
    });
};

function lul() {
    console.info("%cs.jon mencelah ᕦ( ͡° ͜ʖ ͡°)ᕤ", "background-color: blue;padding: 3px;font-size: 12px;font-weight: 800;");
}

window.addEventListener("load", lul, false);