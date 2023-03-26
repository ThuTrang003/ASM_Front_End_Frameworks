function Doi_mat_khau($scope, $http) {
    $scope.listUser = [];
    $scope.email = "";
    $scope.oldpassWord = "";
    $scope.newPassWord = "";
    $scope.rePassWord = "";
    
    const userUrl = "http://localhost:3000/user";
    $http.get(userUrl).then(function (response) {
        $scope.listUser = response.data;
    })

    $scope.updatUser = function (event) {
        event.preventDefault();
        const idUser = getUser($scope.email);
        if (idUser == null) {
            alert("Email không tồn tại");
            return;
        }
        
        if ($scope.newPassWord != $scope.rePassWord) {
            // pass word new = pass word nhập lại
            alert("Mật khẩu nhập lại không khớp với mật khẩu mới");
            return;
        } else if ($scope.user.password != $scope.oldpassWord) {
            // pass cũ và email không cùng tài khoản
            alert("Email và password cũ không khớp");
            return;
        } 

        const apiSua = userUrl + "/" + idUser;
        $scope.user.password = $scope.newPassWord;
        $http.put(apiSua, $scope.user).then(function (response) {
            $scope.listUser[$scope.index] = Object.assign({}, $scope.user);
            alert("Đổi mật khẩu thành công");
        });
    }
    
    $scope.index = -1;
    // lấy id user theo email
    function getUser(emailUser) {
        for (let i = 0; i < $scope.listUser.length; i++) {
            $scope.index++;
            if (emailUser == $scope.listUser[i].email) {
                $scope.user = $scope.listUser[i];
                return $scope.listUser[i].id;
            }
        }
    }


}