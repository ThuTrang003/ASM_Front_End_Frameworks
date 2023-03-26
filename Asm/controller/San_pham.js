function San_pham($scope, $http) {
    $scope.listCategory = [];
    $scope.listProductByCategory = [];

    const categoryAPI = "http://localhost:3000/categories";
    $http.get(categoryAPI).then(function (response) {
        $scope.listCategory = response.data;
    })

    $scope.listProduct = [];
    const productAPI = "http://localhost:3000/products";
    
    $scope.product = {
        nameProduct: "",
        price: 0,
        category: 0,
        image: ""
    };
    $http.get(productAPI).then(function (response) {
        $scope.listProduct = response.data;
    })

    $scope.filterByCategory = function (id) {
        console.log(id)
        for (let i = 0; i < $scope.listProduct.length; i++) {
            if (id == $scope.listProduct[i].category) {
                $scope.listProductByCategory.push($scope.listProduct[i]);
            }
            
        }
    };

    $scope.loai = "";
    $scope.loc = function (x) {
        $scope.loai = x;
    };
}