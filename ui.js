/* Arayüz İşlemlerini bu sayfa da yap */

const categorList = document.querySelector(".categories");
const productList = document.querySelector(`.products`);
const basketList = document.querySelector(`.list`);

export function renderCategories(categories) {
   //Kategorile dizisindeki herbir obje için ekrana kartı basma

   categories.slice(0, 5).forEach((category) => {
      // 1- bir div oluşturma
      const categoryDiv = document.createElement("div");
      // 2- dive class ekleme
      categoryDiv.classList.add("category");
      // 3- divin içeriğini belirleme
      categoryDiv.innerHTML = `
        <img src= ${category.image} alt="">
        <span> ${category.name}</span>
        `;
      //4- elemanı HTML deki categories divine ekleme
      categorList.appendChild(categoryDiv);
   });
}

// 1 - <div></div>;
// 2 - <div className='category'></div>;
// 3 - <div className='category'>
//     <img src="img/box1.jpg" alt="">
//     <span>Clothes</span>
//     </div>;
// 4 - Oluşturduğumuz bu categoryDiv ini (node adı veriliyor) HTML e gönderme

export function renderProducts(products) {
   products
      .slice(0, 40)
      //dizideki he bir obje için çalışır
      .forEach((product) => {
         //div oluşturma
         const productCard = document.createElement("div");
         // gerekli class atamasını yapma
         productCard.className = "product";
         // kartın içeriğini belirleme
         productCard.innerHTML = `
      <img src=${product.images[0]} />
      <p>${product.title}</p>
      <p>${product.category.name}</p>
      <div class="product-info">
         <p>${product.price} $</p>
         <button id="add-btn" data-id= ${product.id}>Sepete Ekle</button>
      </div>
      `;
         // elemanı Html e gönderme
         productList.appendChild(productCard);
      });
}

// ürünü ekrana basma fonksiyonu 

export function renderBasketItem(product) {

   const basketItem = document.createElement("div");
   basketItem.classList.add('list-item');
   basketItem.innerHTML = `
   <div class="list-item">
   <img src=${product.images} alt="">
   <h2>${product.title}</h2>
   <h2>${product.price} $</h2>
   <p> ${product.amount}</p>
   <button id="del-button" data-id=${product.id}>Sil</button>
</div>
   `;
   basketList.appendChild(basketItem);
}
