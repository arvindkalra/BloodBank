
let map;
let curr_marker;

$('#map_search').keypress(function (e) {
    if(e.which == 13){
        $('#loader').addClass('is-active');
        setInterval(searchLocation($('#map_search')), 2000);
    }
});

function searchLocation($map_search) {
    let location = $map_search.val();
    let req_param = location.split(' ').join('+');
    $.get('https://maps.googleapis.com/maps/api/geocode/json?address='+req_param+'&key=AIzaSyBMp0uJ_VjsHraJFBQuu9_YLmhSuLjHV-g', function (result) {
        if(result.results.length === 0){
            alert("Could Not Find the Location Entered By You... Either Enter a New Location or Try By Clicking at the Location on the Map..");
            $('#loader').removeClass('is-active');
            return;
        }
        let lat_lng = result.results[0].geometry.location;
        // console.log(lat_lng);
        if(curr_marker) {curr_marker.setMap(null)};
        curr_marker = new google.maps.Marker({
            position: lat_lng,
            map: map
        });
        map.setZoom(17);
        map.panTo(curr_marker.position);
        $('#loader').removeClass('is-active');
    });
}

function initMap() {

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(function (lat_lng) {
            let uluru = {lat: lat_lng.coords.latitude, lng: lat_lng.coords.longitude};
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 17,
                center: uluru
            });
            if(curr_marker) curr_marker.setMap(null);
            curr_marker = new google.maps.Marker({
                position: uluru,
                map: map
            });
        });
    }
}

function handleMapClick(cb) {
    if(cb.checked){

    }else{
        
    }
}
