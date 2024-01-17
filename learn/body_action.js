// Định nghĩa một đối tượng chứa các giá trị CSS phụ cho các hành động
var extraCSS = { "sort": "65px", "create": "92px" };

// Định nghĩa đối tượng chứa thông tin về các hành động và các thao tác tương ứng
var actionsIds = {
  "create": { "p": "Create(A)", "parents": ["create-sorted", "create-nearly-sorted", "create-many-duplicates"] },
  "sort": { "p": "Sort", "onClick": "sortGeneric()" }
};

// Một đối tượng để theo dõi trạng thái mở/đóng của các hành động
var isOpens = {};

// Số lượng hành động
var len = 2;

// Mảng chứa các key của đối tượng actionsIds
var keys = ["create", "sort"];

// Khởi tạo trạng thái đóng cho tất cả các hành động
for (i = 0; i < len; i++) {
  var actionDetails = keys[i];
  isOpens[actionDetails] = false;
}

// Hàm mở hành động
function openAction(id) {
  hideThirdTiers(id);
  $("." + id).css("bottom", extraCSS[id]);
  if (!isOpens[id]) {
    $('.' + id).fadeIn('fast');
    isOpens[id] = true;
  }
}

// Hàm đóng hành động
function closeAction(id) {
  hideThirdTiers(id);
  if (isOpens[id]) {
    $('.' + id).fadeOut('fast');
    $('#' + id + '-err').html("");
    isOpens[id] = false;
  }
}

// Hàm ẩn toàn bộ bảng điều khiển hành động
function hideEntireActionsPanel() {
  closeAction('create');
  closeAction('sort');
  hideActionsPanel();
}

// Hàm ẩn tất cả các lớp hành động cấp ba
function hideThirdTiers(tier1Action) {
  if ("parents" in actionsIds[tier1Action]) {
    for (const secondTierAction of actionsIds[tier1Action]["parents"]) {
      $('#' + secondTierAction + '-third-tier').fadeOut('fast');
    }
  }
}

// Hàm ẩn tất cả các lớp hành động cấp ba cho tất cả các hành động
function hideAllThirdTiers() {
  for (const tier1Action in actionsIds) {
    hideThirdTiers(tier1Action);
  }
}

// Hàm chuyển đổi giữa các thêm/xóa các phần tử con
function toggleChildExtras(tier1, selectedParentTier2) {
  hideThirdTiers(tier1);
  var style = extraCSS[tier1];
  $("." + tier1).css("bottom", (parseInt(style.substring(0, style.length - 2)) - 27));
  $('#' + selectedParentTier2 + '-third-tier').fadeIn('fast');
}

// Hàm khôi phục chiều cao ban đầu của hành động
function setActionHeightOriginal(tier1Action) {
  $("." + tier1Action).css("bottom", extraCSS[tier1Action]);
}

// Xử lý sự kiện khi người dùng nhấp vào nút 'create'
$('#' + 'create').click(function () {
  openAction('create');
  closeAction('sort');
});

// Xử lý sự kiện khi người dùng nhấp vào nút 'sort'
$('#' + 'sort').click(function () {
  openAction('sort');
  closeAction('create');
});

// Chặn sự kiện lan truyền từ các trường nhập liệu trong menu hành động
$("[id*='-input']").on("keypress keydown keyup", (event) => {
  event.stopPropagation();
});
