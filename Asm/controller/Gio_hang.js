function myGioHang($scope, $http) {
    $scope.listGioHang= [];

    const gioHangAPI = "http://localhost:3000/card";

    $http.get(gioHangAPI).then(function (response) {
        $scope.listGioHang = response.data;
    })

    $scope.btnDeleteOnClick = function (event, index) {
        event.preventDefault();
        const apiXoa = gioHangAPI + "/" + $scope.listGioHang[index].id;
        $http.delete(apiXoa).then(function (response) {

            $scope.listGioHang.splice(index, 1);
        })
    }

    $scope.tong = 0;
    for (let i = 0; i < $scope.listGioHang.length; i++) {
        $scope.tong += ($scope.listGioHang[i].price * $scope.listGioHang[i].quantity);
    }
    
    $scope.tinhTong = function (event) {
        event.preventDefault();
        $scope.tong = 0;
        for (let i = 0; i < $scope.listGioHang.length; i++) {
            $scope.tong += ($scope.listGioHang[i].price * $scope.listGioHang[i].quantity);
        }
    }
}