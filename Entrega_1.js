//ARRAY DE PRODUCTOS 

let productos = [
  { nombre: "Pan", precio: 20, stock: 10 },
  { nombre: "Leche", precio: 35, stock: 15 },
  { nombre: "Jabon", precio: 25, stock: 8 },
  { nombre: "Arroz", precio: 50, stock: 20 },
  { nombre: "Detergente", precio: 60, stock: 5 }
];

//FUNCIONES

//Saludar al usuario
function saludarUsuario() {
  alert("Bienvenido a HogarFacil! Tu tienda online de productos básicos del hogar.");
}


//Mostrar los productos disponibles
function mostrarProductos() {

  let lista = "Productos disponibles el dia de hoy:\n \n";
  for (let i = 0; i < productos.length; i++) {
    let p = productos[i];
    lista += `    ${i + 1}. ${p.nombre} - $${p.precio} - Disponible: ${p.stock}\n`;
  }
  alert(lista);
}

//Preguntar al usuario cuántos productos desea agregar
function seleccionarCantidad(producto) {

  let cantidad = parseInt(prompt(`¿Cuantos ${producto.nombre} deseas agregar al carrito? (Stock disponible: ${producto.stock})`));
  
  //Validacion
  if (isNaN(cantidad) || cantidad <= 0) {
    alert("Cantidad invalida. Se agregará 1 unidad por defecto.");
    cantidad = 1;
  } else if (cantidad > producto.stock) {
    alert(`Solo hay ${producto.stock} unidades disponibles. Se agregara esa cantidad.`);
    cantidad = producto.stock;
  }
  return cantidad;
}

//Checkout
function carritoCheckout(producto){
  cantidad = seleccionarCantidad(producto);
  let item = {nombre : producto.nombre, precio: producto.precio, cantidad: cantidad};
  alert(`${cantidad} ${producto.nombre.toLocaleLowerCase()} agregados al carrito.`);
  return item;
}

//Resumen compra
function mostrarCompra(carrito){

  let totalArticulos = 0;
  let totalPrecio = 0

  for (let i = 0; i < carrito.length; i++){
    let articulo = carrito[i];
    let subtotal = articulo.cantidad * articulo.precio
    
    totalArticulos += articulo.cantidad
    totalPrecio += subtotal
  }

  alert(`Usted ha comprado ${totalArticulos} articulos.\nSu cantidad a pagar es de $${totalPrecio}.`);
}


//Despedir al usuario
function despedirUsuario() {
  alert("Gracias, vuelva pronto!");
}

//PROGRAMA

saludarUsuario();

const quiereComprar = confirm("Desea hacer una compra: ");

if (quiereComprar) {
    let carrito = [];
    let seguirComprando = true;

    while (seguirComprando){
      
      mostrarProductos();

      let mensaje = `¿Que desea agregar a su lista? \n
      1. ${productos[0].nombre}
      2. ${productos[1].nombre}
      3. ${productos[2].nombre}
      4. ${productos[3].nombre}
      5. ${productos[4].nombre} \n`;

      let opcionValida = false
      let cantidad 
      
      while (!opcionValida){
        let eleccion = prompt(mensaje)
        
        if (eleccion.toLowerCase() == productos[0].nombre.toLowerCase()){
          carrito.push(carritoCheckout(productos[0]));
          opcionValida = true
        }
        else if (eleccion.toLowerCase() == productos[1].nombre.toLowerCase()){
          carrito.push(carritoCheckout(productos[1]));
          opcionValida = true;
        }
        else if (eleccion.toLowerCase() == productos[2].nombre.toLowerCase()){
          carrito.push(carritoCheckout(productos[2]));
          opcionValida = true;
        }
        else if (eleccion.toLowerCase() == productos[3].nombre.toLowerCase()){
          carrito.push(carritoCheckout(productos[3]));
          opcionValida = true;
        }
        else if (eleccion.toLowerCase() == productos[4].nombre.toLowerCase()){
          carrito.push(carritoCheckout(productos[4]));
          opcionValida = true;
        }
        else{
          alert("Su opcion no es valida. Vuelva a intentarlo.")
        }
      }

      seguirComprando = confirm("Desea agregar otro producto?")
    }

    mostrarCompra(carrito)
}

despedirUsuario()



