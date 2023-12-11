// prisma/seeds/seeds.js
import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

// async function seedData() {
//   try {
//     const restaurantes = [
//       {
//         nome: "Mc'Donalds",
//         imageUrl: "https://vetores.org/d/mcdonalds.svg",
//         nota: 4.7,
//         grupo: "Lanches",
//       },
//       {
//         nome: "Burger King",
//         imageUrl:
//           "https://s2.glbimg.com/V0vLGchlI0S7Xll4emaGMIJZSLU=/940x523/e.glbimg.com/og/ed/f/original/2021/01/07/bk-novo_logo.jpg",
//         nota: 4.5,
//         grupo: "Lanches",
//       },
//       {
//         nome: "Pizza Hut",
//         imageUrl:
//           "https://gkpb.com.br/wp-content/uploads/2014/11/novo-logo-pizza-hut-flat-design-destaque-geek-publicitario.jpg",
//         nota: 4.6,
//         grupo: "Pizzas",
//       },
//       {
//         nome: "Outback",
//         imageUrl:
//           "https://logowik.com/content/uploads/images/outback-steakhouse.jpg",
//         nota: 4.8,
//         grupo: "Clássico",
//       },
//       {
//         nome: "Habib's",
//         imageUrl:
//           "https://gkpb.com.br/wp-content/uploads/2021/02/novo-logo-habibs-fundo-vermelho-1024x536.jpg",
//         nota: 4.3,
//         grupo: "Árabe",
//       },
//       {
//         nome: "Jun",
//         imageUrl:
//           "https://static.ifood-static.com.br/image/upload/t_thumbnail/logosgde/bd1b445c-65af-49cd-a97a-1152de80ad86/202006261606_yKQF_i.png",
//         nota: 4.4,
//         grupo: "Japonesa",
//       },
//       {
//         nome: "Gendai",
//         imageUrl:
//           "data:image/png;base64,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",
//         nota: 4.5,
//         grupo: "Japonesa",
//       },
//       {
//         nome: "Chula Burger",
//         imageUrl:
//           "https://static.ifood-static.com.br/image/upload/t_medium/logosgde/ae0292e9-d721-49e3-814a-b204f5326efb/202206162121_nQZt_i.jpg",
//         nota: 4.9,
//         grupo: "Lanches",
//       },
//       {
//         nome: "Pizza Pan",
//         imageUrl:
//           "data:image/png;base64,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",
//         nota: 5,
//         grupo: "Pizzas",
//       },
//       {
//         nome: "Frooty Açaí",
//         imageUrl:
//           "https://media.licdn.com/dms/image/C4D0BAQG4VSVhVqrzrw/company-logo_200_200/0/1630514589096/frooty_logo?e=2147483647&v=beta&t=ou3dVTbK2FAhd2H7b1RtJbgZ7LrI_ZEu02Orom7Lw8I",
//         nota: 4.7,
//         grupo: "Sobremesa",
//       },
//       {
//         nome: "Subway",
//         imageUrl:
//           "https://gkpb.com.br/wp-content/uploads/2016/08/simbolo-subway-blog-gkpb.jpg",
//         nota: 4.2,
//         grupo: "Lanches",
//       },
//       {
//         nome: "Pizzaria La Pietá",
//         imageUrl:
//           "data:image/png;base64,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",
//         nota: 4.6,
//         grupo: "Pizzas",
//       },
//     ];

//     const produtos = [
//       {
//         idRestaurante: 1,
//         nome: "Big Mac",
//         descricao:
//           "Um clássico hambúrguer com dois hambúrgueres, alface, queijo, molho especial e picles em um pão com gergelim.",
//         preco: 17.59,
//         categoria: "lanche",
//         imageUrl:
//           "https://s7d1.scene7.com/is/image/mcdonalds/Header_BigMac_832x472:1-3-product-tile-desktop?wid=763&hei=472&dpr=off",
//       },
//       {
//         idRestaurante: 1,
//         nome: "McChicken",
//         descricao:
//           "Um hambúrguer de frango crocante com alface e maionese em um pão de hambúrguer.",
//         preco: 12.79,
//         categoria: "lanche",
//         imageUrl:
//           "https://s7d1.scene7.com/is/image/mcdonalds/Header_McChicken_832x472:1-3-product-tile-desktop?wid=763&hei=472&dpr=off",
//       },
//       {
//         idRestaurante: 1,
//         nome: "Quarterão com Queijo",
//         descricao:
//           "Um hambúrguer generoso com queijo, cebola, picles, mostarda e ketchup em um pão com gergelim.",
//         preco: 14.31,
//         categoria: "lanche",
//         imageUrl:
//           "https://celulapop.com.br/wp-content/uploads/2019/04/102791883-quarter-pounder.jpg",
//       },
//       {
//         idRestaurante: 1,
//         nome: "McOferta Big Mac",
//         descricao:
//           "Combo com o clássico Big Mac, batatas fritas e um refrigerante.",
//         preco: 27.19,
//         categoria: "combo",
//         imageUrl:
//           "https://salvadornorteonline.com.br/salvadornorteonline/2020/09/McOferta-Big-Mac-1.jpg",
//       },
//       {
//         idRestaurante: 1,
//         nome: "McOferta McChicken",
//         descricao: "Combo com o McChicken, batatas fritas e um refrigerante.",
//         preco: 19.67,
//         categoria: "combo",
//         imageUrl:
//           "https://cache-mcd-ecommerce.appmcdonalds.com/images/BR/9601069%20DLV.png",
//       },
//       {
//         idRestaurante: 1,
//         nome: "McOferta Quarterão",
//         descricao:
//           "Combo com o Quarterão com Queijo, batatas fritas e um refrigerante.",
//         preco: 17.51,
//         categoria: "combo",
//         imageUrl:
//           "https://static.ifood-static.com.br/image/upload/t_high/pratos/05b4c459-1652-4027-a9d1-ebf409c2f9cf/202302091727_8Q0K_i.jpg",
//       },
//       {
//         idRestaurante: 1,
//         nome: "Sundae de Chocolate",
//         descricao:
//           "Uma sobremesa deliciosa com sorvete de baunilha e calda de chocolate.",
//         preco: 7.99,
//         categoria: "sobremesa",
//         imageUrl:
//           "https://static.ifood-static.com.br/image/upload/t_high/pratos/0f487ca4-59e2-4faf-a3ad-424a723f7c11/202005312218_YhsU_2.jpg",
//       },
//       {
//         idRestaurante: 1,
//         nome: "Coca-Cola",
//         descricao: "Refrigerante gelado de Coca-Cola.",
//         preco: 4.78,
//         categoria: "bebida",
//         imageUrl:
//           "https://assets.vtex.app/unsafe/1020x930/center/middle/https%3A%2F%2Fcarrefourbrfood.vtexassets.com%2Farquivos%2Fids%2F119765719%2Fcoca-cola-lata-350-ml-1.jpg%3Fv%3D638224488171270000",
//       },
//       {
//         idRestaurante: 1,
//         nome: "Fanta Laranja",
//         descricao: "Refrigerante refrescante sabor laranja.",
//         preco: 4.78,
//         categoria: "bebida",
//         imageUrl:
//           "https://www.drogariaminasbrasil.com.br/media/product/dc1/refrigerante-fanta-laranja-lata-350ml-6eb.jpg",
//       },
//       {
//         idRestaurante: 2,
//         nome: "Whopper",
//         descricao:
//           "Um hambúrguer clássico com carne grelhada, alface, tomate, queijo, cebola, picles e maionese em um pão de hambúrguer com gergelim.",
//         preco: 17.59,
//         categoria: "lanche",
//         imageUrl:
//           "https://classic.exame.com/wp-content/uploads/2021/06/Burger-King-Whopper.jpg?quality=70&strip=info&w=1200",
//       },
//       {
//         idRestaurante: 2,
//         nome: "Cheddar",
//         descricao:
//           "Um hambúrguer de carne, com queijo, maionese e cebola em um pão de hambúrguer.",
//         preco: 12.79,
//         categoria: "lanche",
//         imageUrl:
//           "https://classic.exame.com/wp-content/uploads/2022/07/BVM_BK_BTB_SAFE_R1-1.jpg?quality=70&strip=info",
//       },
//       {
//         idRestaurante: 2,
//         nome: "Double Cheeseburger",
//         descricao:
//           "Um hambúrguer duplo com queijo, picles, cebola, mostarda e ketchup em um pão com gergelim.",
//         preco: 14.31,
//         categoria: "lanche",
//         imageUrl:
//           "https://mcdonalds.com.mt/wp-content/uploads/2018/05/0005_WEBSITE-CHEESEBURGER.jpg",
//       },
//       {
//         idRestaurante: 2,
//         nome: "King Box Whopper",
//         descricao:
//           "Combo com o clássico Whopper, batatas fritas e um refrigerante.",
//         preco: 27.19,
//         categoria: "combo",
//         imageUrl:
//           "https://static.ifood-static.com.br/image/upload/t_high/pratos/6e73dce2-a17f-4aef-9035-1409cea198fe/202302020105_6VN7_i.jpg",
//       },
//       {
//         idRestaurante: 2,
//         nome: "Sundae de Morango",
//         descricao:
//           "Uma sobremesa deliciosa com sorvete de baunilha e calda de morango.",
//         preco: 7.99,
//         categoria: "sobremesa",
//         imageUrl:
//           "https://img.freepik.com/fotos-premium/sorvete-de-sundae-de-morango-com-calda-de-morango-no-copo-no-fundo-branco-sorvete_70216-896.jpg?w=2000",
//       },
//       {
//         idRestaurante: 2,
//         nome: "Pepsi",
//         descricao: "Refrigerante gelado de Pepsi.",
//         preco: 4.78,
//         categoria: "bebida",
//         imageUrl:
//           "https://thumbs.dreamstime.com/b/pepsi-pode-no-fundo-branco-131299337.jpg",
//       },
//       {
//         idRestaurante: 2,
//         nome: "Fanta uva",
//         descricao: "Refrigerante refrescante sabor uva.",
//         preco: 4.78,
//         categoria: "bebida",
//         imageUrl:
//           "https://images.tcdn.com.br/img/img_prod/1043719/refrig_350ml_fanta_uva_3961_1_4e091deff00746d9e10fb0ca97b5c907.jpg",
//       },
//       // Adicione aqui os produtos dos outros restaurantes, como Pizza Hut, Outback, Habib's, Jun, Gendai, Chula Burger, Frooty Açaí, Subway, e Lá Pietá.
//     ];

//     const users = [
//       {
//         userName: "user",
//         email: "user@gmail.com",
//         password: "user123",
//         role: "usuario",
//       },
//       {
//         userName: "motoboy",
//         email: "motoboy@gmail.com",
//         password: "motoboy123",
//         role: "entregador",
//       },
//       {
//         userName: "mcdonalds",
//         email: "mcdonalds@gmail.com",
//         password: "mcdonalds123",
//         role: "admin",
//         idAdmin: 1,
//       },
//       {
//         userName: "burgerking",
//         email: "burgerking@gmail.com",
//         password: "burgerking123",
//         role: "admin",
//         idAdmin: 2,
//       },
//     ];

//     // await prisma.restaurante.createMany({
//     //   data: restaurantes,
//     // });

//     // for (const produtoCategory of produtos) {
//     //   await prisma.produto.updateMany({
//     //     data: produtoCategory.categoria,
//     //   });
//     // }

//     await prisma.usuario.createMany({
//       data: users,
//     });

//     console.log("Dados de seeds inseridos com sucesso!");
//   } catch (error) {
//     console.error("Erro ao inserir dados de seeds:", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// seedData();

async function hashPasswords() {
  const users = await prisma.usuario.findMany();

  for (const user of users) {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(user.password, salt);

    await prisma.usuario.update({
      where: { id: user.id },
      data: { password, salt },
    });
  }
}

hashPasswords()
  .catch((error) => {
    console.error("Erro ao atualizar senhas:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
