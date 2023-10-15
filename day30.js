const input = document.querySelector('#inputBox')
const nameCont = document.querySelector('#name')
const capital = document.querySelector('#capital')
const population = document.querySelector('#population')
const upadateDiv = document.querySelector('#newContent')
let nDta = []
var count = 0
let som = null
const countriesAPI = 'https://restcountries.com/v3/all'

fetch(countriesAPI)
  .then(Response => Response.json())
  .then(countryData =>{
    countryData.map(newData =>{
      createDiv(newData)
    })
    input.addEventListener('input',(content)=>{
      upadateDiv.innerHTML=''
      nDta = []
      nDta = countryData.filter((newData) =>
        newData.name.common.toLowerCase().includes(content.target.value.toLowerCase())
      );
      nDta.forEach((data) => createDiv(data));
    });

    nameCont.addEventListener('click',()=>{
      count++
      upadateDiv.innerHTML=''
      let dataToSort = nDta.length > 0 ? nDta : countryData;

      if (count % 2 === 0) {
        dataToSort.sort((a, b) => {
          const nameA = a.name.common.toLowerCase();
          const nameB = b.name.common.toLowerCase();
          return sortingData(nameA,nameB,1)
        });
      } 
      else {
        dataToSort.sort((a, b) => {
          const nameA = a.name.common.toLowerCase();
          const nameB = b.name.common.toLowerCase();
          return sortingData(nameA,nameB)
        });
      }
      dataToSort.forEach(data => {
        createDiv(data);
      });
    })

    capital.addEventListener('click', ()=>{
      count++
      upadateDiv.innerHTML=''
      let dataToSort = nDta.length > 0 ? nDta : countryData;

      if (count % 2 === 0) {
        dataToSort.sort((a, b) => {
          if(a.capital && b.capital){
            const nameA = a.capital[0].toLowerCase();
            const nameB = b.capital[0].toLowerCase();
            return sortingData(nameA,nameB,1)
          }
        });
      } 
      else {
        dataToSort.sort((a, b) => {
          if(a.capital && b.capital){
            const nameA = a.capital[0].toLowerCase();
            const nameB = b.capital[0].toLowerCase();
            return sortingData(nameA,nameB)
          }
        });
      }
      dataToSort.forEach(data => {
        createDiv(data);
      });  
    })

    population.addEventListener('click',()=>{
      count++
      upadateDiv.innerHTML=''
      let dataToSort = nDta.length > 0 ? nDta : countryData;

      if(count%2==0){
        dataToSort.sort((a, b) => b.population - a.population);
      }
      else{
        dataToSort.sort((a, b) => a.population - b.population);
      }

      dataToSort.forEach(data => {
        createDiv(data);
      }); 
    })
  })

function createDiv(newData){
  const nDiv = document.createElement('div')
  nDiv.id = 'nDiv'
  nDiv.innerHTML = `
  <img src="${newData.flags[1]}">
  <h2>${newData.name.common}</h2>
  <p>Capital: ${newData.capital}</p>
  <p>Languages: ${newData.languages ? Object.values(newData.languages).join(', ') : 'N/A'}</p>
  <p>Population: ${newData.population}</p>`;
  upadateDiv.appendChild(nDiv)
}

function sortingData(nameA,nameB,x){
  if(x==1){
    if (nameA > nameB) return -1;
    if (nameA < nameB) return 1;
    return 0;
  }
  else{
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  }
}