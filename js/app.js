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
var eleminated = [];
function ViewModel()
{
    var self=this
    this.positions = ko.observableArray(locations)
    this.markers = [];
    this.searchTerm = ko.observable('');
    // this.largeInfowindow = new google.maps.InfoWindow();
    this.filtration = function()
    {
        this.showlisting();
        this.positions([]);
        eleminated=[];
        var searchfilter = this.searchTerm().toLowerCase();
        for(var i =0; i<locations.length;i++)
        {
            if(locations[i].title.toLowerCase().indexOf(searchfilter) != -1)
            {
                this.positions.push(locations[i]);
            }
            else{
                eleminated.push(locations[i]);
            }
        }
        for(var i = 0; i < this.markers.length;i++)
        {
            for(var j = 0; j < eleminated.length;j++)
            {
                if(self.markers[i].title == eleminated[i].title)
                {
                    this.markers[i].setMap(null);
                }
            }
        }
    };
    this.populateInfoWindow=function(marker,infowindow){
        if(infowindow.marker != marker){
            infowindow.marker = marker;
            infowindow.setContent('<div>'+marker.title+'</div>');
            infowindow.open(map,marker);
            infowindow.addListener('closeclick', function() {
                infowindow.marker = null;
            });
        }
    };
    this.viewlist=function()
    {
        for(var i = 0; i<self.markers.length;i++)
        {
            if(self.markers[i].title == event.title)
            {
                this.marker = self.markers[i];
                break;
            }
        }
        self.populateInfoWindow(this.marker,self.largeInfowindow);
        this.marker.setAnimation(google.maps.Animation.DROP);
        setTimeout((function(){
            this.marker.setAnimation(null);
        }).bind(this),700);
    };
    this.showlisting = function()
    {
        this.bounds = new google.maps.LatLngBounds();
        for(var i = 0; i < this.markers.length;i++)
        {
            this.markers[i].setMap(map);
            this.bounds.extend(this.markers[i].position);
        }
        map.fitBounds(this.bounds);
    };
    this.hidelisting = function()
    {
        for(var i = 0; i < this.markers.length;i++)
        {
            for(var j=0; j<eleminated.length;j++)
            {
                this.markers[i].setMap(null);
            }
        }
    };

    this.initmap=function()
    {
        this.largeInfoWindow = new google.maps.InfoWindow();
        map=new google.maps.Map(document.getElementById('map'),{
            center: {lat: 30.012031,lng: 30.987625},
            zoom: 13,
            mapTypeControl: false
        });
        // setmarkers();
        function clickTopopulate() {
            self.populateInfoWindow(this, self.largeInfoWindow);
          }
        for(var i = 0; i < locations.length;i++)
        {
            var position = locations[i].location;
            var title = locations[i].title;
            this.marker = new google.maps.Marker({
                map: map,
                position:position,
                title:title,
                animation: google.maps.Animation.DROP,
                id: i
            });
            this.markers.push(this.marker);
            this.marker.addListener('click', function() {
                this.setAnimation(4);
            });
            // add an infowindow populator function
            this.marker.addListener('click', clickTopopulate);
        }
        this.showlisting();
    };
    this.initmap();

    this.toggle = function()
    {
        var wrap = documen
    }
};
function runapp()
{
    ko.applyBindings(new ViewModel());
}
