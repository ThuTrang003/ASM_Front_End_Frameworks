function changeImage(e) {

    var main_prodcut_image = document.getElementById('main_product_image');
    main_prodcut_image.src = e.src;

}


window.SinhVienDetailController = function ($scope, $http, $routeParams) {
    var id = $routeParams.id;
    const productAPI = "http://localhost:3000/products";
    $http.get(productAPI + "/" + id).then(function (response) {
        $scope.products = response.data;
    });

    const cardApi = "http://localhost:3000/card";
    $http.get(cardApi).then(function (response) {
        $scope.listGioHang = response.data;
    })

    $scope.gioHang = {
        nameProduct: "",
        price: "",
        image: "",
        quantity: 1
    };

    $scope.addGioHang = function (event) {
        event.preventDefault();
        let regex_so_luong = /^[1-9]+[0-9]*$/;
        if (!regex_so_luong.test($scope.gioHang.quantity)) {
            alert("Số lượng phải nguyên dương");
            return;
        }      
        const apiThem = cardApi;
        const p = $scope.products;
        $scope.gioHang.nameProduct = p.nameProduct;
        $scope.gioHang.price = p.price;
        $scope.gioHang.image = p.image;
        $http.post(apiThem, $scope.gioHang).then(function (response) {  
            $scope.listGioHang.push($scope.gioHang);            
            alert("Thêm giỏ hàng thành công")
        })
    }
    
};
