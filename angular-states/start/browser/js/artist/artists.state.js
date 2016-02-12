juke.config(function ($stateProvider) {
    $stateProvider.state('artistsList', {
        url: '/artists',
        templateUrl: '/js/artist/artists_list.template.html',
        resolve: {
        	artists: function (ArtistFactory) {
        		return ArtistFactory.fetchAll();
        	}
        },
        controller: 'ArtistsCtrl'
    });
});