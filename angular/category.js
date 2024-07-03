var app = angular.module('AppBanHang', []);
app.controller("LoaispCtrl", function ($scope, $http) {
    $scope.loaisanpham;
    $scope.listLoaiSanPham

    $scope.LoadSanPhamTheoMa = function () { 
		var key = 'id';
		var value = window.location.search.substring(window.location.search.indexOf(key)+key.length+1);		 
        $http({
            method: 'GET', 
            url: current_url + '/api/ViewProduct/Get-product-categoryid?id='+value,
        }).then(function (response) { 
            $scope.loaisanpham = response.data;
            console.log($scope.loaisanpham)
			makeScript('js/main.js')
        });
    };  
    $scope.loadDanhMuc = function () {		 
        $http({
            method: 'GET', 
            url:current_url+'/api/LoaiDoNoiThat/get-all-category',
        }).then(function (response) {	   
            $scope.listLoaiSanPham = response.data;  
            console.log($scope.listLoaiSanPham)       
			makeScript('js/main.js')
        });       
    }; 
		
});