

document.getElementById("userProfileName").innerText=JSON.parse(localStorage.getItem("userDetails")).name;
function navigate(location) {
    closeAllNavigate();
    switch (location) {
        case "DASHBOARD":
            $(".main-dashboard").show();
            changeHeaderName("DASHBOARD");
            break;
        case "BOOKING":
            $(".main-booking").show();
            changeHeaderName("Bookings");
            break;
        case "TRAVEL_CATEGORY":
            $(".main-travel-category").show();
          //  travelCategoryController.loadAllCategory();
            changeHeaderName("Travel Category");
            break;
        case "TRAVEL_AREA":
            $(".main-travel-area").show();
         //   travelAreaController.loadAllTravel();
            changeHeaderName("Travel Area");
            break;
        case "HOTEL":
            $(".main-hotel").show();
            changeHeaderName("HOTEL");
        //    hotelController.loadAllFields();
            break;
        case "VEHICLE_CATEGORY":
            $(".main-vehicle-category").show();
            changeHeaderName("Vehicle Category");
        //    vehicleCategoryController.loadAllVehicleCategory();
            break;
        case "VEHICLE_BRAND":
            $(".main-vehicle-brand").show();
            changeHeaderName("Vehicle Brand");
        //    vehicleController.loadAllVehicleBrand();
            break;
        case "GUIDE":
            $(".main-guide").show();
            changeHeaderName("Manage Guide");
         //   guideController.loadAllGuide();
            break;
        case "DALY_REPORT":
            $(".main-report-daly").show();
            changeHeaderName("Report Daly");
            break;
        case "WEEKLY_REPORT":
            $(".main-report-weekly").show();
            changeHeaderName("Report Weekly");
            break;
        case "MONTHLY_REPORT":
            $(".main-report-monthly").show();
            changeHeaderName("Report Monthly");
            break;
        case "USER":
            $(".main-user").show();
            changeHeaderName("Manage User");
           // userController.loadAllUser();
            break;
    }
}

function closeAllNavigate() {
    $(".main-dash>main").hide();
}

function changeHeaderName(name) {
    document.getElementById("main-header").innerText = name;
}

$(".btn-aside-toggle").click(function () {
    $(".main-root>aside").hide();
    $(".main-wrapper").css("width", "100%");
    $(".btn-toggle-header").show();

});

$(".btn-toggle-header").click(function () {
    $(".main-root>aside").show();
    $(".main-wrapper").css("width", "85%");
    $(".btn-toggle-header").hide();
});

var acc = document.getElementsByClassName("accordion");


for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active2");
        var panel = this.nextElementSibling;
        if (panel.style.display==="block") {
            panel.style.display='none';

        } else {
            panel.style.display='block';
        }
    });
}
$(".panel>button").click(function (){
    $(".panel>button").css("background-color","white");
    $(this).css("background-color","rgb(112, 160, 206)");
});
