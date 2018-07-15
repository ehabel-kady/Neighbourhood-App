// var locations = [
//     {name: 'Misr University for science and technology',location: {lat: 29.998875,lng: 30.965052} },
//     {name: 'Mall of Arabia',location: {lat: 30.006308,lng: 30.973463} },
//     {name: 'Koshary Eltahrir',location: {lat: 29.973598,lng: 30.945799} },
//     {name: 'Zacks',location: {lat: 29.958662,lng: 30.917630} },
//     {name: 'Alnassagoun alSharqeyoon',location: {lat: 29.954377  ,lng: 30.913789} },
//     {name: 'Fahmy Kebda',location: {lat:29.973445 ,lng: 30.944820} },
//     {name: 'chick chicken',location: {lat: 29.969233,lng: 30.940526} },
// ];
var map;
var places = [
    {name: 'Misr University for science and technology',coord: {lat: 29.998875,lng: 30.965052}},
    {name: 'Mall of Arabia', coord: {lat: 30.006308,lng: 30.973463}},
    {name: 'Koshary Eltahrir', coord: {lat: 29.973598,lng: 30.945799}},
    {name: 'Zacks', coord: {lat: 29.958662,lng: 30.917630}},
    {name: 'Fahmy Kebda', coord: {lat:29.973445 ,lng: 30.944820}},
    {name: 'chick chicken', coord: {lat: 29.969233,lng: 30.940526}}
];

function viewModel()
{
    var self = this;
    this.searchTerm = ko.observable('');
    self.positions = ko.observableArray(places);
    this.listinfowindow = new google.maps.InfoWindow();
    this.markers = [];

    this.listview = function()
    {
        self.positions([]);
        if(this.searchTerm() === "")
        {
            console.log(places[i]);
            for(var i = 0; i < places.length; i++)
            {
                self.positions.push(places[i]);
            }
        }
        else
        {
            for(var j = 0; j < places.length; j++)
            {
                if(places[j].name.toLocaleLowerCase().includes(this.searchTerm()))
                {
                    self.positions.push(places[j]);
                }
            }
        }

        for(var i = 0; i < this.markers.length; i++)
        {
            this.markers[i].mapsMarker.setMap(null)
        }
        for (var k =0; k<this.markers.length;k++){
            for (var l =0; l<this.positions().length;l++){
                if (this.positions()[l].name == this.markers[k].name){
                    this.markers[k].mapsMarker.setMap(map);
                    this.markers[k].mapsMarker.setAnimation(4);
                }
            }
        }
    };

    this.initMap = function()
    {
        this.infomarker = new google.maps.InfoWindow();
        map = new google.maps.Map(document.getElementById('map'),{
            center: {lat: 30.012031, lng: 30.987625},
            zoom: 13,
            mapTypeControl: false
        });
        function initinfowindow()
        {
            self.getInfo(this,self.infomarker);
        }
        for(var i = 0; i < places.length; i++)
        {
            this.marker = new google.maps.Marker({
                name: places[i].name,
                position: places[i].coord,
                animation: google.maps.Animation.DROP,
                map:map
            });
            this.marker.addListener('click', function(){
                this.setAnimation(4);
            });
            this.marker.addListener('click',initinfowindow);
            this.markers.push({mapsMarker: this.marker, name: places[i].name});
        }
    };
    this.initMap();

    this.goToMarker = function(selected)
    {
        for(var i =0; i < self.markers.length; i++)
        {
            console.log(self.markers[i].name)
            if(self.markers[i].name == selected.name)
            {
                this.markerFromList = self.markers[i];
            }
        }
        this.markerFromList.mapsMarker.setAnimation(4);
        var url = 'https://api.foursquare.com/v2/venues/search?query=' + this.markerFromList.name.split(" ")[0] + '&ll=' + 
        this.markerFromList.mapsMarker.position.lat() + ',' + this.markerFromList.mapsMarker.position.lng() + 
        '&oauth_token=X0KE3R0WRFQYYSEDZBVSG32VKLJVUNC3YHXR5Z3V0GSZHFAU&v=20180312';
        console.log(this.markerFromList);
        $.ajax({
            url: url,
            markerFromList: this.markerFromList,
            success: function(response)
            {
                var infoObject = response.response.venues[2];
                if(infoObject.location.address===undefined)
                {
                    infoObject.location.address="6th of October";
                }
                if (infoObject.contact.phone===undefined){
                    infoObject.contact.phone="112 (Phonebook Service)";
                }
                self.listinfowindow.setContent(
                    '<div style="text-align:center">' +
                    '<h1>' + this.markerFromList.name + '</h1>' +
                    '<p> Address: ' + infoObject.location.address + '</p>' + 
                    '<p> Phone: '  + infoObject.contact.phone + '</p>' + 
                    '<p> Country: ' + infoObject.location.country + '</p>' + 
                     '</div>'
                );
            }
        }).fail(function(){
            alert('Error encountered while fetching info.');
        });
        self.listinfowindow.open(map, this.markerFromList.mapsMarker);
    };
    this.getInfo = function(marker,infowindow)
    {
        var url = 'https://api.foursquare.com/v2/venues/search?query=' + marker.name.split(" ")[0] + '&ll=' + 
        this.marker.position.lat() + ',' + this.marker.position.lng() + 
        '&oauth_token=X0KE3R0WRFQYYSEDZBVSG32VKLJVUNC3YHXR5Z3V0GSZHFAU&v=20180312';
        $.ajax({
            url:url,
            success: function(response){
                // Chosen 3rd query object upon trial and error
                var infoObject = response.response.venues[2];
                if (infoObject.location.address===undefined){
                    infoObject.location.address="6th of October";
                }

                if (infoObject.contact.phone===undefined){
                    infoObject.contact.phone="112 (Phonebook Service)";
                }

                // console.log(infoObject);
                infowindow.setContent(
                    '<div style="text-align:center">' +
                    '<h1>' + marker.name + '</h1>' +
                    '<p> Address: ' + infoObject.location.address + '</p>' + 
                    '<p> Phone: '  + infoObject.contact.phone + '</p>' + 
                    '<p> Country: ' + infoObject.location.country + '</p>' + 
                     '</div>'
                );
            }
        }).fail(function(){
            alert('Error encountered while fetching info.');
        });

        infowindow.open(map,marker);
    };
};

function handleError(){
    alert("Error loading Google Maps object.");
}


function runapp() {
    ko.applyBindings(new viewModel());
}
