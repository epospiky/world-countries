//get the url of the api
const apiUrl = "https://restcountries.com/v3.1/all";

const getData = async (apiUrl)=>{

    let url = `${apiUrl}`;
    const response = await fetch(url);
    
       try {
        const data = await response.json();
        console.log(data);
        return data;
    } catch(error) {
        console.log('error:',error);
    }
}


window.onload = () =>{
    const body = document.querySelector('body');
    const search_filter = document.querySelector('.search__filter--box')
    const countryIfo = document.querySelector('.country__info');
    const countryIfo__box = document.querySelector('.country__info--box');
    const countriesDiv = document.querySelector('.countries__holder--box');
    const country__back_btn = document.querySelector('.country__back--btn');
    

    
    function countries() {
        
        getData(apiUrl)
        .then(function(data) {
            for (i = 0; i < data.length; i++) {
                function totCount(data) {
                    let sum = 0;
                    for (k = 0; k < data.length; k++) {
                       sum += data[k].population;
                       //console.log(sum); // show the sum every loop 
                    } 
                    document.querySelector('.countries__summary--content').textContent= data.length;
                document.querySelector('.population__summary--content').textContent= sum.toLocaleString();
                    //console.log(sum); // show the final sum
                 }
                 totCount(data);
                 
    
             

   /*     let array = data[i].population; 
       let total = array.reduce(function(a, b){return a + b},0); 
       console.log(total); */
            const countryCard = document.createElement('div');
            countryCard.classList.add('country__box', 'rounded-md', 'bg-teal-100','cursor-pointer', 'mt-4', 'md:mt-0', 'shadow-xl','ease-in-out', 'transform', 'duration-100', 'hover:scale-105');
            countriesDiv.appendChild(countryCard);
            const img = document.createElement('img');
            img.classList.add('rounded-t-md', 'h-40', 'w-full', 'object-cover')
            img.src = data[i]["flags"]["png"];
            img.alt = 'flag';
            countryCard.appendChild(img);

            const countryCard_info = document.createElement('div');
            countryCard_info.classList.add('px-6', 'py-3', 'pb-10');
            countryCard.appendChild(countryCard_info);
            
            const name = document.createElement('h2');
            name.classList.add('font-bold', 'uppercase', 'text-gray-900', 'text-base', 'tracking-wide');
            name.textContent = data[i]["name"]["common"];
            countryCard_info.appendChild(name);
            //console.log(data[i].name);
            
            const population = document.createElement('p');
            population.classList.add('mt-4','font-semibold', 'text-gray-900', 'text-sm');
            population.innerHTML = `Population: <span class = 'text-gray-600 font-normal'>${data[i].population.toLocaleString()}</span>`;;
            countryCard_info.appendChild(population)

            const capital = document.createElement('p');
            capital.classList.add('font-semibold', 'text-gray-700', 'text-sm');
            capital.innerHTML = `Capital: <span class='text-gray-600 font-normal'> ${data[i]["capital"][0]}</span>`;
            countryCard_info.appendChild(capital);   
            
            const callingCode = document.createElement('p');
            callingCode.classList.add('font-semibold', 'text-gray-900', 'text-sm');
            callingCode.innerHTML = `Calling Code: <span class='text-gray-600 font-normal'> ${data[i]["idd"]["root"]}${data[i]["idd"]["suffixes"][0]}</span>`;
            countryCard_info.appendChild(callingCode);

            const region = document.createElement('p');
            region.classList.add('font-semibold', 'text-gray-900', 'text-sm');
            const region_data = data[i].region.toLowerCase();
            region.innerHTML = `Region: <span id ='${region_data}' class='text-gray-600 font-normal'> ${region_data}</span>`;

            countryCard_info.appendChild(region);
        }    


            const countryCard_click = document.querySelectorAll('.country__box').forEach(box => {
                box.addEventListener("click", countryDetailBox);
                function countryDetailBox(e) {
                    //alert('hurray!');
                    countriesDiv.classList.remove('md:grid');
                    countriesDiv.classList.add('hidden');
                    search_filter.classList.remove('md:flex');
                    search_filter.classList.add('hidden');
                    countryIfo.classList.remove('hidden');

                    country__back_btn.addEventListener("click", function() {
                        countriesDiv.classList.add('md:grid');
                        countriesDiv.classList.remove('hidden');
                        search_filter.classList.add('md:flex');
                        search_filter.classList.remove('hidden');
                        countryIfo.classList.add('hidden');                       
                    })


                    if (e.target.parentElement.classList.contains('country__box')) {
                        //alert('Booyah!');

                        const detailsImg = e.target.parentElement.children[0];
                        const detailsHeading = e.target.parentElement.children[1].children[0];

                        const detailsImgDiv = document.querySelector('.info__img--div');
                        const detailsImgDiv__img = document.querySelector('.info__img');
                        detailsImgDiv__img.src = detailsImg.src;
                        detailsImgDiv.appendChild(detailsImgDiv__img);
                        countryIfo__box.appendChild(detailsImgDiv);
                        const info__header = document.querySelector('.info__header');
                        info__header.textContent = detailsHeading.textContent;

                        for ( i = 0; i < data.length; i++) {
                            if (e.target.parentElement.children[1].children[0].textContent.toLowerCase() == data[i]["name"]["common"].toLowerCase()) {
                               // console.log('perfect!')
                                document.querySelector('.native_name--span').textContent = data[i]["name"].nativeName["ara"]["official"];
                                const pop_dat = data[i].population;
                                const pop_data = pop_dat.toLocaleString();
                                //console.log(pop_data)
                                document.querySelector('.population--span').textContent = pop_data;
                                document.querySelector('.region--span').textContent = data[i].region;

                                document.querySelector('.area--span').textContent = `${data[i].area.toLocaleString()} km²`;

                                document.querySelector('.capital--span').textContent = data[i].capital;
                                document.querySelector('.calling_code--span').textContent = `${data[i]["idd"]["root"]}${data[i]["idd"]["suffixes"][0]}`;
                                document.querySelector('.timezone--span').textContent = data[i].timezones;
                                document.querySelector('.sub__region--span').textContent = data[i].subregion;

                                const border_data = data[i].borders.toString();
                                const space = ', ';
                                //space.innerHTML=" ";
                                const bord_split = border_data.replace(/,/g, space);
                                //bord_split.replace(/,\s*$/, "");
                                 
                                document.querySelector('.borders').textContent = bord_split;
                                document.querySelector('.currency__code').textContent = data[i].currencies[0].code;
                                document.querySelector('.currency__name').textContent = data[i].currencies[0].name;
                                document.querySelector('.currency__symbol').textContent = data[i].currencies[0].symbol;

                                document.querySelector('.list1__item--lat').innerHTML = `${data[i].latlng[0]}<sup>o</sup> N`;
                                document.querySelector('.list1__item--long').innerHTML = `${data[i].latlng[1]}<sup>o</sup> E`;
                                
                                let map;

                                async function initMap() {
                                  const { Map } = await google.maps.importLibrary("maps");
                                
                                  map = new Map(document.getElementById("map"), {
                                    center: { lat: data[i].latlng[0], lng: data[i].latlng[1] },
                                    zoom: 5,
                                  });
                                }
                                
                                initMap();
                            }
                            
                        }

                    }

                }

            });

        })
        
    
        
    }
    countries();
    
    document.querySelector('.mode__box--container, .switch').addEventListener("click", function(e){
        document.querySelector('.switch').classList.toggle('darkOn');
    })

    document.querySelector('.filter__button').addEventListener("click", function(e){
        document.querySelector('.filter__container').classList.toggle('hidden');
        document.querySelector('.transform').classList.toggle('rotate-180')
    })

    document.querySelector('.filter__container').addEventListener("click", function(e) {
        const clicked_region = e.target.textContent.toLowerCase();
        //console.log(clicked_region);
        document.querySelectorAll(".country__box").forEach((country) => { 
        let  country_id = country.children[1].children[4].children[0].id;   
        clicked_region === country_id ? country.classList.remove('hidden') 
        : country.classList.add('hidden'); 
        if (clicked_region === 'all regions') {
            country.classList.remove('hidden')
        }
        //console.log( country_id);
    })
    })
    
    document.querySelector('#search').addEventListener("keyup", function(e) {
        const searchValue = e.target.value.toLowerCase();
        document.querySelectorAll('.country__box').forEach((country)=>{
            const heading = country.children[1].children[0].textContent.toLowerCase();
            heading.startsWith(searchValue) ? country.classList.remove('hidden') : country.classList.add('hidden');
        })
    })

    document.querySelector('.mode__box--container, .switch').addEventListener('click', function(e) {
        body.classList.toggle('darkMode')

    })

   // "use strict";

//let map;



    
}
