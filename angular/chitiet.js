var app = angular.module('AppBanHang', []);
app.controller("ChitietCtrl", function ($scope, $http) {
    $scope.sanpham;  
    $scope.listLoaiSanPham;
    $scope.listSanPham
    $scope.sanphamtheoma

    $scope.loadLoaiSanPham = function () {		 
        $http({
            method: 'GET', 
            url:current_url+'/api/LoaiDoNoiThat/get-all-category',
        }).then(function (response) {	   
            $scope.listLoaiSanPham = response.data;  
            console.log($scope.listLoaiSanPham)       
			makeScript('js/main.js')
        });       
    }; 
    $scope.LoadSanPhambyID = function () { 
		var key = 'id';
		var value = window.location.search.substring(window.location.search.indexOf(key)+key.length+1);		 
        $http({
            method: 'GET', 
            url: current_url + '/api/ViewProduct/Get-Product-Id/'+value,
        }).then(function (response) { 
            $scope.sanpham = response.data;
            console.log($scope.sanpham)
			makeScript('js/main.js')
        });
    };  
    $scope.LoadSanPham = function () {		 
        $http({
            method: 'GET', 
            url:current_url+'/api/ViewProduct/Get-all-product',
        }).then(function (response) {	   
            $scope.listSanPham = response.data;
            console.log($scope.listSanPham);  
			makeScript('js/main.js')
        });       
    };  
    $scope.LoadSanPhamTheoMa = function () { 
		var key = 'id';
		var value = window.location.search.substring(window.location.search.indexOf(key)+key.length+1);		 
        $http({
            method: 'GET', 
            url: current_url + '/api/ViewProduct/Get-product-categoryid?id='+value,
        }).then(function (response) { 
            $scope.sanphamtheoma = response.data;
            console.log($scope.sanphamtheoma)
			makeScript('js/main.js')
        });
    };  
    $scope.addToCart = function (item) {
        var list = null;
        item.quantity = 1;       
        var list;
        if (localStorage.getItem('cart') == null) {
            list = [item];
        } else {
            list = JSON.parse(localStorage.getItem('cart')) || [];
            let ok = true;
            for (let x of list) {
                if (x.maDNT == item.maDNT) {
                    x.quantity += 1;
                    ok = false;
                    break;
                }
            }
            if (ok) {
                list.push(item);
            }
        }
        localStorage.setItem('cart', JSON.stringify(list));
        alert("Đã thêm giỏ hàng thành công!");
    }
      
});