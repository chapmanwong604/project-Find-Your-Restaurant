
//---------------------resultpage.html--------------------------------
let FoodChineseNameDisplay = document.querySelector('#foodChineseName')
let RestaurantResultContainer = document.querySelector('#restaurantResultContainer')
var foodChineseName = sessionStorage.getItem('food')
let foodlabelDisplay = document.querySelector('#foodLabel')



function calcDistance(userLatitude, userLongitude, restaurantsInfo) {
    for (let restaurant of restaurantsInfo) {
        let result = getDistanceFromLatLonInKm(userLatitude, userLongitude, restaurant.latitude, restaurant.longitude)
        restaurant['distance'] = result;
        // let location = restaurant.querySelector(".location")
        // location.textContent = "距離:" + result.toFixed(2) + " km";
        // restaurant.setAttribute("data-distance", result);
    }
}


//TEMPLATE FOR RESTAURANT INFO:
//(1) Door Photo
//(2) Phone Number
//(3) OpenRice Link
//(4) GoogleMapSearch URL

const restaurantInfoTemplate = (RestaurantInfoJSONSingle, doorImage) => `
<div class="RestaurantsInfoDiv">

<div class="doorPhoto"><img src="${doorImage}"></div>

<div class="information">

    <div class="restaurantname">餐廳名稱：${RestaurantInfoJSONSingle.name}</div>

    <div class="address">地址：${RestaurantInfoJSONSingle.address}</div>

    <div class="phoneNumber">電話：${RestaurantInfoJSONSingle.phone.substring(2, 10)}</div>

    ${RestaurantInfoJSONSingle.distance ? `<div class="distance">距離：${RestaurantInfoJSONSingle.distance.toFixed(2)}km</div>` : ""}

</div>

<div class="buttontoclick">

<div class="openRiceLink">
    <a href='${RestaurantInfoJSONSingle.openrice_link}' target='_blank'>
        <img id="OpenRiceIcon" src="openrice.png"></img>
    </a>
</div>

<div class="GoogleMapSearch">
    <a href='https://www.google.com.hk/maps/search/${RestaurantInfoJSONSingle.address}' target='_blank'>
        <img id="GoogleMapIcon" src="Google_Maps_logo_icon.png"></img>
    </a>
</div>
</div>

</div>`

// FETCH GET DISPLAY THE FOOD NAME IN CHINESE
// fetch('/getFoodChineseName')
//     .then(foodName => foodName.json())
//     .then(foodNameJson => {
//         FoodChineseNameDisplay.textContent = foodName
//     })
//     .catch(error => ({error:String(error)}))

function getPositionPromise(RestaurantsInfoJSON) {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            position => {
                userLatitude = position.coords.latitude
                userLongitude = position.coords.longitude
                calcDistance(userLatitude, userLongitude, RestaurantsInfoJSON.restaurantsInfo)
                resolve()
            },
            error => {
                // Swal.fire('Your location is not available. Please make sure you have turn on location service on your device.');
                resolve()
            }
        )
    })
}

//FETCH GET DISPLAY RESTAURANT INFO FOR-LOOP 
fetch('/restaurants' + location.search)
    .then(RestaurantsInfo => RestaurantsInfo.json())
    .then(RestaurantsInfoJSON => {
        // console.log(RestaurantsInfoJSON)
        foodlabelDisplay.textContent = RestaurantsInfoJSON.tags
        FoodChineseNameDisplay.textContent = RestaurantsInfoJSON.chinese_name

        // Each restaurant in RestaurantsInfoJSON.restaurantsInfo calculate its distance
        // Get user's location
        return getPositionPromise(RestaurantsInfoJSON)
            .then(() => RestaurantsInfoJSON)

    }).then((RestaurantsInfoJSON) => {
        // Only sort if the distances to restaurants are known

        if (RestaurantsInfoJSON.restaurantsInfo[0].distance) {
            RestaurantsInfoJSON.restaurantsInfo.sort((a, b) => {
                return a.distance - b.distance;
            })
        }

        let restaurantInfoHTML = RestaurantsInfoJSON.restaurantsInfo.map(RestaurantsInfoJSONSingle => {
            if (RestaurantsInfoJSONSingle.door_photo) {
                doorImage = JSON.parse(RestaurantsInfoJSONSingle.door_photo.replaceAll("\'", "\"")).url
                // console.log(doorImage)
            } else (doorImage = "https://assets.bonappetit.com/photos/5a8d9c058ca2430893f4e3c1/16:9/w_2560%2Cc_limit/life_on_the_line_1.jpg")
            return restaurantInfoTemplate(RestaurantsInfoJSONSingle, doorImage)
        })
        return restaurantInfoHTML
    }).then((restaurantInfoHTML) => {
        let result = RestaurantResultContainer.innerHTML
        for (let RestaurantInfoHTMLSingle of restaurantInfoHTML) {
            result += RestaurantInfoHTMLSingle
        }
        RestaurantResultContainer.innerHTML = result
    }).then(() => {
        document.querySelector("#loading").style.display = "none"
        document.querySelector("#main").style.display = "block"

    })

    .catch(error => { console.log(error) })


//GET LONGTITUDE/ALTITUDE


function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}