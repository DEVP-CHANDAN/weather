const submitBtn = document.getElementById('submitbtn')
const cityname = document.getElementById('cityname')
const output = document.getElementById('city-name')
const temp_status = document.getElementById('temp-status')
const temp_real_val = document.getElementById('temp-real-val')
const data_hide = document.querySelector('.middle-layer')

const getinfo = async(e)=>{
    e.preventDefault()
    let cityval = cityname.value
    if( cityval === ""){
        output.innerText = `Write city name before search`
        data_hide.classList.add('data-hide')
    }
    else{

        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityval}&unit=matric&appid=112549964d7be5e466fd51bdfedda2d9`
            let response = await fetch(url).then((response) => response.json())
            .then((data) => (data));
            
            const arrdata = [response]
            console.log(arrdata)
            output.innerText = `${arrdata[0].name} , ${arrdata[0].sys.country}`;
            temp_real_val.innerText = Math.ceil(arrdata[0].main.temp - 273.15);
            const tempMode = arrdata[0].weather[0].main
            //condition to check sunny and cloud

            if(tempMode == 'Clear'){
                temp_status.innerHTML = '<i class="fas fa-sun" style = "color:#eccc68"></i>'
            }
            else if(tempMode == 'Clouds'){
                temp_status.innerHTML = '<i class="fas fa-cloud" style = "color:#f1f2f6"></i>'
            }
            else if(tempMode == 'Rain'){
                temp_status.innerHTML = '<i class="fas fa-cloud-rain" style = "color:#a4b0be"></i>'
            }
            else{
                temp_status.innerHTML = '<i class="fas fa-cloud" style = "color:#f1f2f6"></i>'
            }
            data_hide.classList.remove('data-hide')
            
        } catch (error) {
            output.innerText = `Enter Valid City Name`
            data_hide.classList.add('data-hide')
        }

    }
}

submitBtn.addEventListener('click', getinfo)