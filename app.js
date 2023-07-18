// Diğer sayfan gelenler
import { renderCategories, renderProducts, renderBasketItem } from "./ui.js";

// HTML'in yükleme anını izleme
document.addEventListener("DOMContentLoaded", () => {
   fetchCategories();
   fetchProducts();
});

const baseUrl = "https://api.escuelajs.co/api/v1";

/* Kategori bilgilerini çek
 * 1- Apiye istek at
 * 2- Gelen veriyi işle
 * 3- Gelen verileri ekrana basıcak fonksiyonu çalıştır
 */

function fetchCategories() {
   fetch(`${baseUrl}/categories`)
      //eğerki veri gelirse çalışır
      .then((response) => response.json())
      // veri json formatına dönünce çalışır
      .then((data) => renderCategories(data))
      // hata oluşursa çalışır
      .catch((error) => console.log(error));
}

let globalData = [];

// Ürünler verisini çek
async function fetchProducts() {
   try {
      // veri çekme isteği at
      const res = await fetch(`${baseUrl}/products`);
      // gelen veriyi işle
      const data = await res.json();
      // veriyi bütün desya tarafından erişilebilir yapma
      globalData = data;
      // bu veriyi ekrana bas
      renderProducts(data);
   } catch (err) {
      // TODO eğer hata olursa hatayı yönet
      console.log(err);
   }
}

// /* Sepet İşlemleri */
let basket = [];
let total = 0;
const modal = document.querySelector(`.modal-wrapper`);
const sepetBtn = document.querySelector("#sepet-btn");
const closeBtn = document.querySelector("#close-btn");
const basketList = document.querySelector(".list");
const modalInfo = document.querySelector(".total-span");

// Sepet butonuna basılma olayını izleme
sepetBtn.addEventListener("click", () => {
   // Modalı ortaya çıkarıldı...
   modal.classList.add("active");
   // modalın içerisine sepetteki ürünleri listeleme
   addList();
});

// Çarpı butonuna basılma olayını izleme
closeBtn.addEventListener(`click`, () => {
   // Modalı ortadan kaldırıldı...
   modal.classList.remove(`active`);
   // sepetin içindeki html temizle
   basketList.innerHTML = "";
   total = 0;
   modalInfo.textContent = 0;
});

// Modal dışında bir yere tıklanma olayını izleme
document.addEventListener("click", (e) => {
   var clickedEl = e.target;
   if (clickedEl.classList.contains("modal-wrapper")) {
      modal.classList.remove("active");
      //sepetin içindeki html temizle
      basketList.innerHTML = "";
      total = 0;
      modalInfo.textContent = '0';
   }
});

// ????????????????????????????????????????

document.body.addEventListener("click", findItem);
// Html tarafında tıklanılan elemanı tespit etme
function findItem(e) {
   // tıklanılan eleman
   const ele = e.target;

   // tıklanılan elemanın id si sepete ekle butonu mu kontrol
   if (ele.id === "add-btn") {
      // id sine sahip olduğumuz elemanı dizi içerisinde bulma...
      const selected = globalData.find(
         (product) => product.id == ele.dataset.id
      );
      if (!selected.amount) {
         selected.amount = 1;
      }
      addToBasket(selected);
   }
   // tıklanılan eleman sepette sil ise
   if (ele.id === "del-button") {
      // butonun kapsayıcıno html'den kaldırma
      ele.parentElement.remove();

      // elemanı dizi içerisinde bulma
      const selected = globalData.find((i) => i.id == ele.dataset.id);

      deleteItem(selected);
   }
}

// elemanı sepete gönderecek fonksiyon
function addToBasket(product) {
   console.log(product, basket);
   // sepette bu elemanlar var mı kontrol etme
   const foundItem = basket.find((item) => item.id === product.id);
   console.log(foundItem);
   if (foundItem) {
      // eğer ürün sepette varsa bulunan ürünün miktarını artırma
      foundItem.amount++;
   } else {
      // eğer ürün sepette yoksa git sepete ekleme
      basket.push(product);
   }
}

// ürünleri sepete aktarma fonksiyonu
function addList() {
   basket.forEach((product) => {
      // ürünü ekrana bas
      renderBasketItem(product);
      // toplam fiyatı güncelle
      total += product.price * product.amount;
   });
   // modaldaki toplam fiyatı güncelleme
   console.log(total);
   modalInfo.textContent = total;
}

// ürünü diziden kaldırma
function deleteItem(deletingItem) {
   // id'si silinecek elemanın id'sine eşit olmayanları alma
   const flitredData = basket.filter((item) => item.id !== deletingItem.id);
   // sepet dizisini güncelleme
   basket = flitredData;
   // toplam fiyatı güncelleme
   total -= deletingItem.price * deletingItem.amount;
   modalInfo.textContent = total;
}
