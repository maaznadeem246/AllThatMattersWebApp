
function searchIt(){
    console.log('working')
    const searchBox = document.getElementById('searchBox')
    const contName = document.getElementById('countryName')
    const regionName = document.getElementById('regionName')
    const temp = document.getElementById('temp')
    const newsDiv = document.getElementById('newsDiv')
    const searchWord = searchBox.value

    const url = '/search?word=' + searchWord
    //console.log(searchWord)
    searchBox.value = ''
    contName.innerHTML = '-'
    regionName.innerHTML = '-'
    temp.innerHTML = '-'
    newsDiv.innerHTML = ''
    fetch(url).then((response) => {
        return response.json()
    }).then((res) => {
        if (res.error) {
            
            console.log(res.error)
        } else {
            contName.innerHTML = res.country
            regionName.innerHTML = res.region
            temp.innerHTML = res.temperature+' <sup>o</sup>C'
            newsDivs(res.news,newsDiv)
            console.log(res)
        }
    }).catch((e) => {
        console.log("Error occured: ", e)
    })


}


const newsDivs = (news,newsDiv) => {
    
    news.map((n)=>{
        newsDiv.innerHTML +=  '<div class="cardd card p-2 m-3"  style="flex:none; width:20%; "   >'+
                        '<img class="card-img-top" src="' + n.urlToImage+'" alt="Card image cap">'+
                        '<div class="card-body">'+
                        '<h5 class="card-title">'+n.title+'</h5>'+
                        '<p class="card-text">'+n.description+'</p>'+
                        '<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>'+
                    '</div>'+
                '</div>'

    })
}


// author: "Emma F Camp"
// content: "Climate change is rapidly changing the oceans, driving coral reefs around the world to breaking point. Widely publicised marine heatwaves arent the only threat corals are facing: the seas are increasingly acidic, have less oxygen in them, and are gradually wa… [+5128 chars]"
// description: "Finding out how these “super corals” can live in extreme environments may help us unlock the secret of coral resilience."
// publishedAt: "2019-09-08T13:09:45Z"
// source:
// id: null
// name: "Theprint.in"
// __proto__: Object
// title: "Surviving climate change, these super corals can handle acid, heat and suffocation - ThePrint"
// url: "https://theprint.in/environment/surviving-climate-change-these-super-corals-can-handle-acid-heat-and-suffocation/287505/"
// urlToImage: "https://cdn-live.theprint.in/wp-content/uploads/2019/09/corals-.jpg"