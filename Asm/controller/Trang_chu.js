function Trang_chu($scope, $http)
{
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
}