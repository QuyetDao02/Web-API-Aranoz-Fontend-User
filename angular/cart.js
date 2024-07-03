var app = angular.module('AppBanHang', []);
app.controller("CartCtrl", function ($scope, $http) {
    $scope.listcart = [];
    $scope.TenKhachHang;
    $scope.DiaChi;
    $scope.SoDienThoai;
    $scope.Email;

    $scope.LoadCart = function () {
        $scope.listcart = JSON.parse(localStorage.getItem('cart')) || [];
        console.log($scope.listcart)
        $scope.DiaChi = "abc";
        makeScript('js/main.js')
    };
    $scope.removeItemCart = function (item) {
        const index = $scope.listcart.findIndex(i => i.maDNT === item.maDNT);
        $scope.listcart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify($scope.listcart));
    }
    $scope.updateQuantityCart = function (quantity, item) {
        if (quantity && Number(quantity) > 1) {
            const index = $scope.listcart.findIndex(i => i.maDNT === item.maDNT);
            $scope.listcart[index].quantity = Number(quantity);
            localStorage.setItem('cart', JSON.stringify($scope.listcart));

        }
    }
    $scope.save = function () {
        let list = JSON.parse(localStorage.getItem('cart') || []);
        let obj = {};
        obj.MaKH = 1;
        obj.Ghichu = "";
        obj.DiaChi = "";
        obj.chiTietDonHangBans = [];
        for (var i = 0; i < list.length; i++) {
            obj.chiTietDonHangBans.push({ maDNT: list[i].maDNT, quantity: list[i].quantity })
        }
        $http({
            method: 'POST',
            data: obj,
            url: current_url + '/api/DonHang/AddToCart',
        }).then(function (response) {
            localStorage.setItem('cart', JSON.stringify([]));
            alert('Thêm đơn hàng thành công');
            window.location.reload()
        });

    };


    $scope.GetSum = function () {
        var sum = 0;
        for (var i = 0; i <  $scope.listcart.length; i++) {
            sum +=  $scope.listcart[i].giaban *  $scope.listcart[i].quantity;
        }
        $scope.tongtien = sum;
    };

    $scope.GetSum();
    $scope.LoadCart();
}); 