var map;
var locations =
[
{title: 'Misr University for science and technology',location: {lat: 29.998875,lng: 30.965052} },
{title: 'Mall of Arabia',location: {lat: 30.006308,lng: 30.973463} },
{title: 'Koshary Eltahrir',location: {lat: 29.973598,lng: 30.945799} },
{title: 'Zacks',location: {lat: 29.958662,lng: 30.917630} },
{title: 'Alnassagoun alSharqeyoon',location: {lat: 29.954377  ,lng: 30.913789} },
{title: 'Fahmy Kebda',location: {lat:29.973445 ,lng: 30.944820} },
{title: 'chick chicken',location: {lat: 29.969233,lng: 30.940526} },
];

function ViewModel()
{
    var self=this
    var positions = ko.observableArray(locations)
    var markers=[];
    var largeInfowindow = new google.maps.InfoWindow();
    this.populateInfoWindow=function(marker,infowindow){
        if(infowindow.marker != marker){
            infowindow.marker = marker;
            infowindow.setContent('<div>'+marker.title+'</div>');
            infowindow.open(map,marker);
            infowindow.addListener('closeclick', function() {
                infowindow.marker = null;
            });
        }
    }
    this.bounceEffect = function () {
        self.populateInfoWindow(this, self.largeInfoWindow);
        this.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout((function () {
            this.setAnimation(null);
        }).bind(this), 600);
    };
    this.initmap=function()
    {
        map=new google.maps.Map(document.getElementById('map'),{
            center: {lat: 30.012031,lng: 30.987625},
            zoom: 13,
            mapTypeControl: false
        });
        // setmarkers();
        for(var i = 0; i < positions().length;i++)
        {
            var position = positions()[i].location;
            var title = positions()[i].title;
            var marker = new google.maps.Marker({
                map: map,
                position:position,
                title:title,
                animation: google.maps.Animation.DROP,
                id: i
            });
            this.markers.push(this.marker);
            this.marker.addListener('click',function(){
                self.populateInfoWindow(this,largeInfowindow);
            });
        }
        var bounds = new google.maps.LatLngBounds();
        for(var i = 0; i < markers.length;i++)
        {
            markers[i].setMap(map);
            bounds.extend(markers[i].location);
        }
        map.fitBounds(bounds);
    };
    this.initmap();
};
function runapp()
{
    ko.applyBindings(new ViewModel());
}
// var markers = [];
// function initMap()
// {
//     new google.maps.Map(document.getElementById('map'),{
//         center: {lat: 30.012031,lng: 30.987625},
//         zoom: 13,
//         mapTypeControl: false
//     });
//     var largeInfowindow= new google.maps.InfoWindow();

//     for(var i = 0; i<locations.length;i++)
//     {
//         var position=locations[i].location;
//         var title=locations[i].title;
//         var marker=new google.maps.Marker({
//             position: position,
//             title: title,
//             animation: google.maps.Animation.DROP,
//             id: i
//         });
//         markers.push(marker);
//         marker.addListener('click', function() {
//             populateInfoWindow(this, largeInfowindow);
//         });
//     }
//     var bounds = new google.maps.LatLngBounds();
//     // Extend the boundaries of the map for each marker and display the marker
//     for (var i = 0; i < markers.length; i++) {
//       markers[i].setMap(map);
//       bounds.extend(markers[i].position);
//     }
//     // map.fitBounds(bounds);
// };
// function populateInfoWindow(marker, infowindow)
// {
//     if(infowindow.marker != marker){
//         infowindow.marker = marker;
//         infowindow.setContent('<div>'+marker.title+'</div>');
//         infowindow.open(map,marker);
//         infowindow.addListener('closeclick', function() {
//             infowindow.marker = null;
//         });
//     }
// };