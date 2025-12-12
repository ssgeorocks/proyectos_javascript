# HogarFácil — Tienda virtual

## Descripción
Tienda virtual con carrito de compras y flujo de checkout en paneles laterales.

## Flujo de trabajo
1. El usuario abre `index2.html`.
2. Interactúa con la interfaz y selecciona productos para agregarlos al carrito.
3. El carrito (parte superior derecha) muestra un contador de productos.
4. Al hacer click en el carrito se despliega un menu con:
   - Vaciar carrito
   - Proceder al pago
5. Al proceder al pago:
   - Se abre una barra lateral con el resumen de productos y el total.
   - Al seleccionar Continuar al pago, se abre otra barra lateral de Datos de envio.
6. El usuario llena nombre, direccion, ciudad y código postal.
7. Si los datos son válidos, puede confirmar la compra.
8. Se muestra un mensaje de confirmación y se vacía el carrito.

## Estructura principal
- `index2.html`: estructura de la página.
- `css/style_entrega.css`: estilos de interfaz, cards, carrito y paneles laterales.
- `Entrega_2.js`: 
  - Carga de productos (`source/data.json`)
  - Generacion dinamica de productos en el DOM (cards con imagen)
  - Carrito: agregar, eliminar, vaciar, contador
  - Panel lateral: resumen y total, botones de eliminar
  - Checkout: formulario, validación y confirmacion
- `source/data.json`: datos de productos (incluye imagen).
