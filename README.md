# 🍺 **La Taberna De JJ**
🏫 [Universidad Catolica Boliviana San Pablo](https://scz.ucb.edu.bo/)
- Cesar Sebastian Zambrana Ventura
- Adrian Santiago Rada Paredes
- Alain Antonhy Flores Tapia

---

## 👨🏻‍🏫 Introduccion
- Proyecto final del curso [ISW-111] Fundamentos en Ingeniería de Software. Este proyecto ha sido desarrollado bajo la guía y supervisión del docente **Paulo César Loayza Carrasco**, El trabajo fue llevado por el grupo **"Los Discípulos de JJ"**, quienes hemos aplicado los conceptos aprendidos a lo largo del curso para desarrollar este proyecto.
  
https://github.com/user-attachments/assets/a4ce19bc-79a4-49b6-a096-366f3246bb64

---
**🧑🏻‍💻 Características Principales:**

- **Control de Edad:** Antes de mostrar el contenido, verifica que el usuario sea mayor de 18 años. Esta verificación se guarda en el navegador para futuras visitas.
- **Mapa de Ubicaciones:** Tiene un mapa interactivo para buscar tiendas en Santa Cruz. En el futuro, permitirá filtrar tiendas por zona (Norte/Sur) o por tu ubicación actual.
- **Buscador de Bebidas:** Puedes buscar bebidas por nombre o marca. También puedes filtrar por tipo (Vodka, Cerveza, Vino, Whisky y otros) y ordenar por nombre o precio. Cada bebida muestra su información en una tarjeta.
- **Información de Tiendas:** Muestra una lista de tiendas con todos sus datos: nombre, dirección, horarios, fotos y opiniones. Cada tienda tiene su propia página donde puedes ver qué productos tiene y sus precios.
- **Diseño Moderno:** La aplicación funciona bien en celulares y computadoras, con un diseño atractivo y fácil de usar.
<br><br>
---
**👨🏻‍🔧 ¿Cómo está hecha la aplicación?**
<br><br>
Usamos tecnologías modernas para crear la aplicación:

- Next.js como base principal (versión 15.2.3, utilizando Turbopack para optimizar el entorno de desarrollo).
- TypeScript para hacer un desarrollo tipado, robusto y más fácil de mantener
- Shadcn UI, que utiliza Radix UI como base para los componentes, Lucide React Icons para la iconografía y Tailwind CSS para la estilización y diseño responsivo. Se implementa `tailwind-merge` y `tailwindcss-animate` para optimizar la gestión de clases y animaciones
- Sistema para guardar y manejar información de forma eficiente, Se emplea React Query (`@tanstack/react-query`)
- Mapas interactivos para mostrar las ubicaciones. usamos Leaflet junto con React-Leaflet
- Firebase para manejar usuarios y guardar datos
  
![image](https://github.com/user-attachments/assets/6a710274-2734-4f31-ab43-d9246ea196ec)

<br><br>
