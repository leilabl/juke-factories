juke.config(function ($stateProvider) {
    $stateProvider.state('artistList', {
        url: '/artist/:artistId',
        templateUrl: '/js/artist/artist.template.html',
        resolve: {
            artist: function (ArtistFactory, $stateParams) {
                return ArtistFactory.fetchById($stateParams.artistId);
            }
        },
        controller: 'ArtistCtrl'
    })
    .state('artistList.albums', {
    	url: '/albums',
    	templateUrl: '/js/artist/artist.albums.template.html',
        controller: 'ArtistCtrl'
    })
    .state('artistList.songs', {
    	url: '/songs',
    	templateUrl: '/js/artist/artist.songs.template.html',
        controller: 'ArtistCtrl'
    });
});