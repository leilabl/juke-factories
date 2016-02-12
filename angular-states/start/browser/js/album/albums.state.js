juke.config(function ($stateProvider) {
    $stateProvider.state('albumsList', {
        url: '/albums',
        templateUrl: '/js/album/albums_list.template.html',
        controller: 'AlbumsCtrl'
    });
});