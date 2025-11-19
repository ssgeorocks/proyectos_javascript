// Array de productos

const productosHogar = [
  {
    id: 1,
    categoria: "Limpieza",
    nombre: "Detergente líquido",
    descripcion: "Detergente multiusos para ropa y superficies.",
    precio: 85,
    icono: "🧴"
  },
  {
    id: 2,
    categoria: "Limpieza",
    nombre: "Cloro desinfectante",
    descripcion: "Cloro para desinfección de baños y cocina.",
    precio: 40,
    icono: "🧼"
  },
  {
    id: 3,
    categoria: "Limpieza",
    nombre: "Jabón para trastes",
    descripcion: "Jabón líquido concentrado para vajilla.",
    precio: 35,
    icono: "🍽️"
  },
  {
    id: 4,
    categoria: "Alimentos",
    nombre: "Arroz blanco",
    descripcion: "Arroz de grano largo, ideal para comidas caseras.",
    precio: 28,
    icono: "🍚"
  },
  {
    id: 5,
    categoria: "Alimentos",
    nombre: "Frijoles negros",
    descripcion: "Frijoles seleccionados, listos para cocinar.",
    precio: 32,
    icono: "🥣"
  },
  {
    id: 6,
    categoria: "Alimentos",
    nombre: "Aceite vegetal",
    descripcion: "Aceite de cocina 1L, ideal para freír y cocinar.",
    precio: 55,
    icono: "🫗"
  }
];

// Inicializamos variables

let cartProducts = [];

// Definimos los selectores

const contendorProductos = document.getElementById("products_list")
const counterCSS = document.getElementById("contador")

// Metodos carrito checkout + logica para agregar variables a local storage

function carritoCheckout(producto){
  let item = {nombre : producto.nombre, precio: producto.precio};
  cartProducts.push(item);
  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
}

function updateCounter(){
    let numberProducts = cartProducts.length;
    counterCSS.textContent = numberProducts;
};

// Leer desde localStorage

let savedCart = JSON.parse(localStorage.getItem("cartProducts")) || [];
if (savedCart.length > 0){
    cartProducts = savedCart
    updateCounter()
};


// Intereaccion con el DOM

productosHogar.forEach( (producto) => {
    // Se crea un nuevo elemento de lista
    const newProduct = document.createElement("li")
    // Se le da formato al nuevo elemento 
    newProduct.id = `producto-${producto.id}`; 
    newProduct.innerHTML = `
    
    <span class="icono">${producto.icono}</span>
    <strong>${producto.nombre}</strong> - ${producto.descripcion}
    <em> | $${producto.precio} MXN</em>
    `;
    contendorProductos.appendChild(newProduct)
    let productItem = document.getElementById(`producto-${producto.id}`)
    productItem.addEventListener("click", ()=>{
        carritoCheckout(producto);
        updateCounter();
    });

});

// Agregamos eventos

const toggleButtons = [
    {
        id:"toggle-features",
        selector:".features ul"
    },
    {
        id:"toggle-products",
        selector:".products_section ul"        
    }
];

// Desplegamos una lista como drop down al hacer click

toggleButtons.forEach( (element)=>{
    // Buscamos el elemento en el HTML
    let toggleButton = document.getElementById(element.id);   
    // Buscamos el elemento en el CSS
    let dropdown = document.querySelector(element.selector) 
    // Definimos el evento
    toggleButton.addEventListener("click", ()=>{
        dropdown.classList.toggle("active")
    });
});




