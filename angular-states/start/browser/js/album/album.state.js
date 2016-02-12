juke.config(function ($stateProvider) {
    $stateProvider.state('albumList', {
        url: '/album/:albumId',
        templateUrl: '/js/album/album.template.html',
        controller: 'AlbumCtrl'
    });
});