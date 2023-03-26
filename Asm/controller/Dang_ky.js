function Dang_ky($scope, $http) {
    $scope.listUsers = [];
    $scope.user = {
        userName: "",
        email: "",
        phone: "",
        password: ""
    }
    const userUrl = "http://localhost:3000/user";
    $http.get(userUrl).then(function (response) {
        $scope.listUsers = response.data;
    })
    $scope.err_pass = "";
    $scope.dangKy = function (event) {
        event.preventDefault();
        if ($scope.user.userName.length == 0 || $scope.user.email.length == 0 ||
            $scope.user.phone.length == 0 || $scope.user.password.length == 0) {
            alert("Thông tin không được để trống");
            return;
        } else if ($scope.user.password.length < 4) {
            $scope.err_pass = "Mật khẩu phải có ít nhất 4 ký tự";
            return;
        } else if ($scope.user.password.length > 8) {
            $scope.err_pass = "Mật khẩu có nhiều nhất là 8 ký tự";
            return;
        }  

        for (let i = 0; i < $scope.listUsers.length; i++) {
            if ($scope.user.email === $scope.listUsers[i].email) {
                alert("Email đã tồn tại mời nhập lại");
                return;
            } 
            // else if ($scope.user.password == $scope.listUsers[i].password) {
            //     alert("Mật khẩu đã tồn tại mời nhập lại");
            //     return;
            // }
        }
        them();
        $scope.err_pass = "";
    }

    function them() {
        const apiThem = userUrl;

        $http.post(apiThem, $scope.user).then(function (response) {            
            $scope.listUsers.push($scope.user);
            $scope.user = {
                userName: "",
                email: "",
                phone: "",
                password: ""
            }
            alert("Đăng ký thành công");
        })

    }

}