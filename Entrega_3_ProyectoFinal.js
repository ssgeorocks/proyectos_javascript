
// Inicializamos variables

let cartProducts = [];
let productosHogar = [];

// Definimos los selectores

const contendorProductos = document.getElementById("products_list")
const counterCart = document.getElementById("contador")
const carritoIcono = document.getElementById("carrito")
const carritoMenu = document.getElementById("carrito-menu")
const botonVaciar = document.getElementById("carrito-vaciar")
const botonContinuarCompra = document.getElementById("carrito-confirmar")
const cartPanel = document.getElementById("cart-panel")
const cartPanelBackdrop = document.getElementById("cart-panel-backdrop")
const cartPanelClose = document.getElementById("cart-panel-close")
const cartPanelContent = document.getElementById("cart-panel-content")
const cartPanelTotal = document.getElementById("cart-total")
const cartFinalConfirm = document.getElementById("cart-final-confirm")
const checkoutPanel = document.getElementById("checkout-panel")
const checkoutPanelClose = document.getElementById("checkout-panel-close")
const checkoutForm = document.getElementById('checkout-form');
const checkoutConfirm = document.getElementById('checkout-confirm');
const checkoutName = document.getElementById('checkout-name');
const checkoutAddress = document.getElementById('checkout-address');
const checkoutCity = document.getElementById('checkout-city');
const checkoutZip = document.getElementById('checkout-zip');


// ---------------------- Metodos ---------------------------------------

// Metodo carrito checkout + logica para agregar variables a local storage

function carritoCheckout(producto){
  let nuevoId = generarProductoId(); 
  let item = {
    carritoId : nuevoId,
    nombre : producto.nombre, 
    precio: producto.precio};
  cartProducts.push(item);
  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
}

// Metodo para generar IDs ordenados para elementos agregados al carrito

function generarProductoId(){
  let ids = cartProducts.map(elemento => Number(elemento.carritoId) || 0);
  let maxId;
  if (ids.length === 0){
    maxId = 0;
  } else{
    maxId = Math.max(...ids)
  }
  return maxId + 1
};

// Metodo para eliminar productos del carrito de acuerdo al Id

function eliminarProductosCarrito(carritoId){
  cartProducts = cartProducts.filter(elemento => elemento.carritoId !== Number(carritoId));
  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  updateCounter();
  renderizarPanelLateral();
};


// Metodo para actualizar articulos en icono de carrito 

function updateCounter(){
    let numberProducts = cartProducts.length;
    counterCart.textContent = numberProducts;
};

// Metodo para vaciar prodcutos del carrito

function vaciarCarrito(){
  cartProducts = [];
  localStorage.removeItem("cartProducts");
  cartPanelContent.innerHTML = '<p>El carrito de compras está vacio.</p>';
  cartPanelTotal.textContent = '$0 MXN';
}

// Metodo para revisar que el formulario este completado

function validarFormulario(){
  let formulario = [checkoutName, checkoutAddress, checkoutCity, checkoutZip]
  let validacion = true
  formulario.forEach(elemento =>{
    if(elemento === null || elemento.value.trim().length === 0){
      validacion = false
    }
  });
  return validacion;
};


function checarFormulario(){
  if (validarFormulario()){
    checkoutConfirm.classList.remove('disabled');
    checkoutConfirm.disabled = false;
    checkoutConfirm.removeAttribute('aria-disabled');
  }else{
    checkoutConfirm.classList.add('disabled');
    checkoutConfirm.disabled = true;
    checkoutConfirm.setAttribute('aria-disabled', 'true'); 
  }
};

// Medtodo para renderizar prodcutos en el DOM

function renderizarProductos(lista){

  lista.forEach( (producto) => {
      // Se crea un nuevo elemento de lista
      let newProduct = document.createElement("li")
      // Se le da formato al nuevo elemento 
      newProduct.classList.add('product-card');
      newProduct.id = `producto-${producto.id}`; 
      const imagen = producto.imagen
      ? `<img class="product-thumb" src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">`
      : `<div class="product-thumb placeholder">${producto.icono ?? '🛒'}</div>`;

      newProduct.innerHTML = `
          ${imagen}
          <div class="product-info">
            <strong class="product-name">${producto.nombre}</strong> 
            <p class="product-desc">${producto.descripcion}</p>
            <em class="product-price">$${producto.precio} MXN</em>
          </div>
      `;
      contendorProductos.appendChild(newProduct)
      let productItem = document.getElementById(`producto-${producto.id}`)
      productItem.addEventListener("click", ()=>{

        productItem.classList.add('clicked');
        setTimeout(()=>{
          newProduct.classList.remove('clicked');
        }, 300);

        carritoCheckout(producto);
        updateCounter();
      });
  });
};

// Metodo para renderizar productos en la barra lateral 

function renderizarPanelLateral(){
  cartPanelContent.innerHTML = '';
  if(cartProducts.length === 0){
    cartPanelContent.innerHTML = '<p>El carrito de compras está vacio.</p>';
    cartPanelTotal.textContent = '$0 MXN';
    cartFinalConfirm.classList.add('disabled')
    cartFinalConfirm.setAttribute('aria-disabled', 'true');
  } else if(cartProducts.length > 0){
    cartProducts.forEach((producto) =>{
      let newRow = document.createElement("div")
      newRow.className = 'cart-item'
      newRow.innerHTML=`
        <span class="name">${producto.nombre}</span>
        <span class="price">$${Number(producto.precio)} MXN</span>
        <button class="cart-item-remove" aria-label="Eliminar">Eliminar</button>
      `;
      newRow.querySelector(".cart-item-remove").addEventListener('click', (elemento)=>{
        elemento.stopPropagation();
        eliminarProductosCarrito(producto.carritoId);
      });
      cartPanelContent.appendChild(newRow);
    });
    let totalPrecio = cartProducts.reduce((acumulado, producto)=> acumulado + Number(producto.precio), 0);
    cartPanelTotal.textContent = `$${totalPrecio} MXN`
    cartFinalConfirm.classList.remove('disabled');
    cartFinalConfirm.removeAttribute('aria-disabled');
  };
};

// Metodo abrirl panel lateral

function abrirPanelLateral(){
  renderizarPanelLateral();
  cartPanel.classList.add('open')
  cartPanelBackdrop.classList.add('open')
}

// Metodo cerrar panel lateral

function cerrarPanelLateral(){
  cartPanel.classList.remove('open')
  cartPanelBackdrop.classList.remove('open')
}

// Metodo cerrar todos los paneles laterales

function cerrarPanelesLaterales(){
  cartPanel.classList.remove('open')
  checkoutPanel.classList.remove('open');
  cartPanelBackdrop.classList.remove('open')
}

// Metodo cargar productos asincronicamente

async function cargarProductos() {
  try {
    const response = await fetch('./source/data.json');
    productosHogar = await response.json();
    renderizarProductos(productosHogar)
  } catch(error){
    console.error('No se pudieron cargar los productos', error);
  } 
};


// --------------------------- Programa Pirncipal ------------------------------

// Leer desde localStorage

let savedCart = JSON.parse(localStorage.getItem("cartProducts")) || [];
if (savedCart.length > 0){
    cartProducts = savedCart
    updateCounter()
};


cargarProductos()


// --------------------------  Agregamos eventos -------------------------------

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

// Desplegamos el menu del carrito al hacer click 

carritoIcono.addEventListener("click", (element)=>{
  element.stopPropagation();
  //carritoMenu.style.display = carritoMenu.style.display === "block" ? "none" : "block";
  carritoMenu.classList.toggle("open");
});

// Cerrar menus desplegamos en el documento
document.addEventListener("click", ()=>{
  //carritoMenu.style.display = "none";
  carritoMenu.classList.remove("open");
});

// Vaciamos el carrito al hacer click
botonVaciar.addEventListener("click", (element)=>{
  element.stopPropagation();
  vaciarCarrito();
  updateCounter();
  //carritoMenu.style.display = "none";
  carritoMenu.classList.remove("open");
});

// Confirmamos la compra al hacer click
botonContinuarCompra.addEventListener("click", (elemento)=>{
  elemento.stopPropagation();
  //let numberProducts = cartProducts.length;
  carritoMenu.classList.remove("open");
  abrirPanelLateral();
});

// Cerramos la barra lateral al hacer click
cartPanelClose.addEventListener("click", (elemento)=>{
  elemento.stopPropagation();
  cerrarPanelLateral();
});

cartPanelBackdrop.addEventListener("click", cerrarPanelesLaterales);


// Cerramos la barra checkout al hacer click
checkoutPanelClose.addEventListener("click", (elemento)=>{
  elemento.stopPropagation();
  cerrarPanelesLaterales();
});

// Abrimos la barra checkout al hacer click
cartFinalConfirm.addEventListener("click", (elemento)=>{
  elemento.stopPropagation();
  cartPanel.classList.remove('open');
  checkoutPanel.classList.add('open');
  checarFormulario();
});

// Checamos el estado del formulario al completarlo
[checkoutName, checkoutAddress, checkoutCity, checkoutZip].forEach(elemento =>{
  if (elemento){
    elemento.addEventListener('input', checarFormulario);
    elemento.addEventListener('change', checarFormulario);
  };
});

// Hacemos checkout al hacer click
checkoutConfirm.addEventListener("click", async (elemento) =>{
  elemento.preventDefault();
  let totalPrecio = cartProducts.reduce((acumulado, producto)=> acumulado + Number(producto.precio), 0);
  await Swal.fire({
    icon: 'success',
    title: 'Compra confirmada',
    html: `
      <p><strong>${checkoutName.value}</strong></p>
      <p>Envío a: ${checkoutAddress.value}, ${checkoutCity.value}, CP ${checkoutZip.value}</p>
      <p>Total: <strong>$${totalPrecio} MXN</strong></p>
    `,
    confirmButtonColor: '#2563eb',
    confirmButtonText: 'OK'
  });
  vaciarCarrito();
  updateCounter();
  cerrarPanelesLaterales();
});
