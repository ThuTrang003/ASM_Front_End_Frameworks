function addCategory($scope, $http) {
    $scope.listCategory = [];
    $scope.category = {
        name: ""
    };
    $scope.err_name = "";
    const categoryAPI = "http://localhost:3000/categories";

    $http.get(categoryAPI).then(function (response) {
        $scope.listCategory = response.data;
    })

    $scope.listProduct = [];
    const productAPI = "http://localhost:3000/products";

    $http.get(productAPI).then(function (response) {
        $scope.listProduct = response.data;
    })

    $scope.updateIndex = -1;

    function checkCategoryInProduct(idCategory) {
        for (let i = 0; i < $scope.listProduct.length; i++) {
            if ($scope.listProduct[i].category == idCategory) {
                return false;
            }
            
        }
        return true;
    }

    function them() {
        const apiThem = categoryAPI;
        if ($scope.category.name.length == 0) {
            $scope.err_name = "Vui lòng nhập tên danh mục";
            return;
        }
        $http.post(apiThem, $scope.category).then(function (response) {            
            $scope.listCategory.push($scope.category);
            $scope.category = {
                name: ""
            };
            $scope.err_name = "";
            alert("Thêm category thành công");
        })
        
    }

    function sua() {
        if ($scope.category.name.length == 0) {
            $scope.err_name = "Vui lòng nhập tên danh mục";
            return;
        }
        if ($scope.updateIndex == -1) {
            alert("Mời bạn chọn category cần update");
            return;
        }
        const apiCapNhat = categoryAPI + "/" + $scope.listCategory[$scope.updateIndex].id;
        $http.put(apiCapNhat, $scope.category).then(function(response) {
            $scope.listCategory[$scope.updateIndex] = Object.assign({}, $scope.category);
            $scope.category = {
                name: ""
            };
            alert("Cập nhật category thành công");
            $scope.updateIndex = -1;
            $scope.err_name = "";
        })
    }

    $scope.clear = function (event) {
        event.preventDefault();
        $scope.category = {
            name: ""
        };
        $scope.updateIndex = -1;
    }

    $scope.add = function (event) {
        event.preventDefault();
        them();
    }

    $scope.update = function (event) {
        event.preventDefault();
        sua();
    }

    $scope.btnDeleteOnClick = function (event, index) {
        event.preventDefault();
        var check = checkCategoryInProduct($scope.listCategory[index].id);
        if (!check) {
            alert("Category bạn muốn xóa đã tồn tại trong danh sách sản phẩm");
            return;
        }
        const apiXoa = categoryAPI + "/" + $scope.listCategory[index].id;
        $http.delete(apiXoa).then(function(response) {
            
            $scope.listCategory.splice(index, 1);
            alert("Xóa category thành công");

        })
    }

    $scope.detailOnClick = function (event, index) {
        event.preventDefault();
        const c = $scope.listCategory[index];
        $scope.category.name = c.name;
        $scope.updateIndex = index;
        $scope.err_name = "";
    }
}
