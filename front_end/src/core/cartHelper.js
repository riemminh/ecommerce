export const addToCart = item => {
  let cart = [];

  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }

  cart.push({ ...item, count: 1 });
  // thu nhat array.from la tao ra mot thuc the array duoc sao chep can (shallow-copy)
  // tu cac doi tuong giong mang( sẽ có thuộc tính mô tả chiều dài length  và các phần tử được đánh chỉ mục)
  // va cac đối tượng khả duyệt (là các đối tượng mà các phần tử của nó có thể được duyệt ví dụ như Map và  Set).
  cart = Array.from(new Set(cart.map(p => p._id))).map(id =>
    cart.find(p => p._id === id)
  );
  //   console.log(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const getItemCart = () => {
  let items = [];
  if (localStorage.getItem("cart")) {
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return items;
  }
};

export const removeItemCart = idItem => {
  let cart = getItemCart();
  cart.map((item, index) => {
    if (item._id === idItem) {
      cart.splice(index, 1);
    }
  });

  localStorage.setItem("cart", JSON.stringify(cart));
};

export const updateCountItemCart = (count, productId) => {
  let cart = getItemCart();
  cart.map((item, index) => {
    if (item._id === productId) {
      item.count = count;
    }
  });
  localStorage.setItem("cart", JSON.stringify(cart));
};


