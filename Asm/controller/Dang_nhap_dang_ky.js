function dang_nhap($scope, $http, $location) {
    $scope.listUser = [];
    $scope.user = {
        userName: "",
        email: "",
        phone: "",
        password: ""
    }
    $scope.email = "";
    $scope.passWord = "";

    const userUrl = "http://localhost:3000/user";
    $http.get(userUrl).then(function (response) {
        $scope.listUser = response.data;
    })

    $scope.logon = function (event) {
        event.preventDefault();
        // check email mà mật khẩu không khớp
        for (var i = 0; i < $scope.listUser.length; i++) {
            if ($scope.email == $scope.listUser[i].email && $scope.passWord == $scope.listUser[i].password) {
                $location.path("Trang_chu");
                alert("Đăng nhập thành công");
                return;
            } 
        }
        alert("Email hoặc password không hợp lệ");
    }


}