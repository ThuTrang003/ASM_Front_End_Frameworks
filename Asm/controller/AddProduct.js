function addProduct($scope, $http) {
    $scope.err_price = "";
    $scope.listCategory = [
        { id: 1, name: "Trái cây" },
        { id: 2, name: "Rau củ" },
        { id: 3, name: "Thịt" },
        { id: 4, name: "Đồ ăn nhanh" }
    ];

    const categoryAPI = "http://localhost:3000/categories";

    $http.get(categoryAPI).then(function (response) {
        $scope.listCategory = response.data;
    })

    $scope.updateIndex = -1;
    $scope.product = {
        nameProduct: "",
        price: 0,
        category: 0,
        image: ""
    };

    $scope.listProduct = [];
    const productAPI = "http://localhost:3000/products";

    $http.get(productAPI).then(function (response) {
        $scope.listProduct = response.data;
    })

    function them() {
        const apiThem = productAPI;
        $http.post(apiThem, $scope.product).then(function (response) {

            $scope.listProduct.push($scope.product);
            $scope.product = {
                nameProduct: "",
                price: 0,
                category: 0,
                image: ""
            };
            alert("Thêm mới thành công")
        })
    }

    function sua() {
        if ($scope.updateIndex == -1) {
            alert("Mời bạn chọn product cần update");
            return;
        }
        const apiSua = productAPI + "/" + $scope.listProduct[$scope.updateIndex].id;
        $http.put(apiSua, $scope.product).then(function (response) {
            $scope.listProduct[$scope.updateIndex] = Object.assign({}, $scope.product);
            $scope.product = {
                nameProduct: "",
                price: 0,
                category: 0,
                image: ""
            };
            $scope.updateIndex = -1;
            alert("Cập nhật thành công");
        })

    }

    $scope.clear = function (event) {
        event.preventDefault();
        $scope.product = {
            nameProduct: "",
            price: 0,
            category: 0,
            image: ""
        };
        $scope.updateIndex = -1;
    }

    $scope.add = function (event) {
        event.preventDefault();
        if ($scope.product.price <= 0) {
            $scope.err_price = "Giá tiền không thể bé hơn 0";
            return;
        } else if ($scope.product.price.length == 0 || $scope.product.nameProduct.length == 0|| 
            $scope.product.image.length == 0 || $scope.product.category.length == 0) {
            // $scope.err_price = "Vui lòng nhập đầy đủ thông tin";
            alert("Vui lòng nhập đầy đủ thông tin")
            return;   
        }
        them();
    }

    $scope.update = function (event) {
        event.preventDefault();
        if ($scope.product.price <= 0) {
            $scope.err_price = "Giá tiền không thể bé hơn 0";
            return;
        } else if ($scope.product.price.length == 0 || $scope.product.nameProduct.length == 0|| 
            $scope.product.image.length == 0 || $scope.product.category.length == 0) {
            // $scope.err_price = "Vui lòng nhập đầy đủ thông tin";
            alert("Vui lòng nhập đầy đủ thông tin")
            return;   
        }
        sua();
    }

    $scope.btnDeleteOnClick = function (event, index) {
        event.preventDefault();
        const apiXoa = productAPI + "/" + $scope.listProduct[index].id;
        $http.delete(apiXoa).then(function (response) {
            $scope.listProduct.splice(index, 1);
        })
        alert("Xóa sản phẩm thành công");
    }

    $scope.btnUpdateOnClick = function (event, index) {
        event.preventDefault();
        const p = $scope.listProduct[index];
        $scope.product.nameProduct = p.nameProduct;
        $scope.product.price = p.price;
        $scope.product.image = p.image;
        $scope.product.category = p.category;
        $scope.updateIndex = index;
    }
}