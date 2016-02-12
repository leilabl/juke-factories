juke.config(function ($stateProvider) {
    $stateProvider.state('artistList', {
        url: '/artist/:artistId',
        templateUrl: '/js/artist/artist.template.html',
        controller: 'ArtistCtrl'
    });
});