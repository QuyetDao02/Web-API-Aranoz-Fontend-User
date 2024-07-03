var app = angular.module('AppBanHang', []);
app.controller("HomeCtrl", function ($scope, $http) {
    $scope.listSanPhamNew;
    $scope.listLoaiSanPham;
    $scope.listSanPham;
    $scope.listspbanchay;



    $scope.LoadNewProduct = function () {		 
        $http({
            method: 'GET', 
            url:current_url+'/api/ViewProduct/New-Product?sl=6',
        }).then(function (response) {
            $scope.listSanPhamNew = response.data;           			         
    		makeScript('js/main.js')
        });
    }; 
    $scope.LoadNewProduct()

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

    $scope.LoaiSanPham = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/LoaiDoNoiThat/get-all-category',
        }).then(function (response) {
            $scope.listLoaiSanPham = response.data;
            console.log($scope.listLoaiSanPham)
            makeScript('js/main.js')
        });
    };

    $scope.LoadSanPham = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/ViewProduct/Get-all-product',
        }).then(function (response) {
            $scope.listSanPham = response.data;
            console.log($scope.listSanPham);
            makeScript('js/main.js')
        });
    };

    $scope.LoadSellingProduct = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/ViewProduct/selling-product?sl=5',
        }).then(function (response) {
            $scope.listspbanchay = response.data;
            console.log($scope.listspbanchay)
            makeScript('js/main.js')
        });
    };
    // $scope.LoadSellingProduct()
});

