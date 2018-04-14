
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
            alert("Could Not Find the Location Entered By You Enter a New Location");
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
    let $map_search = $('#map_search');
    if(cb.checked){

        if(navigator.geolocation){

            // $map_search.val("Current Location");
            $map_search.attr("disabled", true);

            navigator.geolocation.getCurrentPosition(function (lat_lng) {
                let uluru = {lat: lat_lng.coords.latitude, lng: lat_lng.coords.longitude};
                let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+uluru.lat+","+uluru.lng+"&key=AIzaSyCFjlAyZXOangdko_28YsHtmR7vEKiO120";
                if(curr_marker) curr_marker.setMap(null);
                curr_marker = new google.maps.Marker({
                    position: uluru,
                    map: map
                });
                map.setZoom(17);
                map.panTo(curr_marker.position);
                $.get(url, function (result) {
                    if(result){
                        let value = result.results[0].formatted_address;
                        $map_search.val(value);
                    }
                })
            });
        }

    }else{
        $map_search.val("");
        $map_search.attr("disabled", false);
    }
}
