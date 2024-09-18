# Descripcion del proyecto

Nuestro proyecto se va a tratar de la gestión del stock de los productos y las ventas dentro de un local nocturno, permitiendo al usuario administrar el inventario y la operativa dentro del mismo.

La aplicación generará reportes y estadísticas claves para el negocio y para el proceso de auditoría.

El objetivo es simplificar la operatoria dentro del local, mediante una interfaz amigable con el usuario y proporcionando un análisis en tiempo real del stock y las ventas.

---

## Entidades

- User
- Club
- Storage
- Product
- Shift
- Sale

---

## Casos de uso

### Usuarios

- El usuario se podrá registrar
- El usuario podrá iniciar sesión
- El usuario podrá cambiar la contraseña

### Local

- Cada local tendrá un listado de productos
- Cada local tendrá un listado de mesas y depositos, que guardan stock de muchos productos

### Deposito/Mesa

- Las mesas y depositos podrán guardar stock de muchos productos
- Se podrá llevar un registro del stock inicial y final de cada producto cuando empieza y termina un determinado turno
- Se podrá ver la distribución del stock en las distintas mesas o depósitos

### Productos

- Se podrán crear, editar, modificar y eliminar productos de un local

## Venta

- Cada mesa podrá generar una venta en un determinado turno.
