juke.config(function ($stateProvider) {
    $stateProvider.state('albumList', {
        url: '/album/:albumId',
        templateUrl: '/js/album/album.template.html',
           resolve: {
            album: function (AlbumFactory, $stateParams) {
                return AlbumFactory.fetchById($stateParams.albumId);
            }
        },
        controller: 'AlbumCtrl'
    });
});