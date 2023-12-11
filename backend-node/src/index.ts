import { DeliveryStatus, PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { ProductData } from "./interfaces/ProductData";
import { PaymentData } from "./interfaces/PaymentData";
import CheckoutService from "./services/CheckoutService";
import { CustomerData } from "./interfaces/CustomerData";

dotenv.config();

const stripe = require("stripe")(
  "sk_test_51OJ1hvKtyJIoCxtZZIzbnvhkkOnAnLOwIpCDWu0tGuy9qtIdATd6UfP0HeT6OgmHBGhlOpMG1l6r64A4TiMrx23P00Pkbcgd5L"
);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
const app: Express = express();
const port = process.env.PORT || 5000;
const prisma = new PrismaClient();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);

app.use(express.json());

const secretKey = process.env.SECRET_KEY_JWT;

app.get("/", (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message) return res.status(400).send({ error: "message is required" });

  res.send({ message });
});

app.get("/produtos/:nomeRestaurante?", async (req: Request, res: Response) => {
  const { nomeRestaurante } = req.params;

  if (!nomeRestaurante) {
    const produtos = await prisma.produto.findMany();
    return res.send(produtos);
  }

  const restaurante = await prisma.restaurante.findFirst({
    where: {
      nome: nomeRestaurante,
    },
  });

  if (!restaurante) {
    return res.status(404).send({ error: "Restaurante não encontrado" });
  }

  const produtos = await prisma.produto.findMany({
    where: {
      idRestaurante: restaurante.id,
    },
  });

  res.send(produtos);
});

app.post("/produtos", async (req, res) => {
  try {
    const { nome, descricao, preco, idRestaurante, imageUrl, categoria } =
      req.body;
    const newProduct = await prisma.produto.create({
      data: {
        nome,
        descricao,
        preco,
        idRestaurante,
        imageUrl,
        categoria,
      },
    });
    res.json(newProduct);
  } catch (error) {
    console.error("Erro ao criar o produto:", error);
    res.status(500).json({ error: "Erro ao criar o produto" });
  }
});

// Rota para atualizar um produto existente (PUT)
app.put("/produtos/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const { nome, descricao, imageUrl, preco, categoria } = req.body;

    const updatedProduct = await prisma.produto.update({
      where: { id: productId },
      data: {
        nome,
        descricao,
        imageUrl,
        preco,
        categoria,
      },
    });

    res.json(updatedProduct);
  } catch (error) {
    console.error("Erro ao atualizar o produto:", error);
    res.status(500).json({ error: "Erro ao atualizar o produto" });
  }
});

// Rota para excluir um produto (DELETE)
app.delete("/produtos/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    await prisma.produto.delete({
      where: { id: productId },
    });
    res.json({ message: "Produto excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir o produto:", error);
    res.status(500).json({ error: "Erro ao excluir o produto" });
  }
});

app.get("/restaurantes", async (req, res) => {
  const restaurantes = await prisma.restaurante.findMany();
  res.json(restaurantes);
});

app.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await prisma.usuario.findFirst({
      where: { userName },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Se as credenciais são válidas, crie um token JWT
      const token = jwt.sign(
        {
          userName: user.userName,
          role: user.role,
        },
        secretKey,
        { expiresIn: "1h" }
      );
      res.json({
        userName,
        role: user.role,
        token,
        success: true,
        idAdmin: user.idAdmin ? user.idAdmin : null,
      });
    } else {
      res.status(401).json({ message: "Credenciais inválidas" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

app.get("/orders/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const order = await prisma.order.findUnique({
    where: {
      id: +id,
    },
    include: { customer: true, orderItems: { include: { produto: true } } },
  });

  if (!order) return res.status(404).send({ error: "Order not found" });

  res.send(order);
});

interface CheckoutRequest extends Request {
  body: {
    cart: ProductData[];
    customer: CustomerData;
    payment: PaymentData;
    restaurantId: number;
  };
}

app.post("/checkout", async (req: CheckoutRequest, res: Response) => {
  const { cart, customer, payment, restaurantId } = req.body;

  const orderCreated = await new CheckoutService().process(
    cart,
    customer,
    payment,
    restaurantId
  );

  res.send(orderCreated);
});

app.get("/deliveries", async (req: Request, res: Response) => {
  const entregas = await prisma.delivery.findMany({
    where: { status: "PENDING" },
    include: {
      order: true,
      restaurant: true,
      customer: true,
    },
  });
  res.json(entregas);
});

app.get("/delivery/:id", async (req: Request, res: Response) => {
  const entrega = await prisma.delivery.findUnique({
    where: { id: +req.params.id },
    include: {
      order: true,
      restaurant: true,
      customer: true,
    },
  });
  res.json(entrega);
});

app.put("/startDelivery/:id", async (req: Request, res: Response) => {
  const deliveryStarted = await prisma.delivery.update({
    where: { id: +req.params.id },
    data: { status: req.query.status as DeliveryStatus },
    include: {
      order: true,
      restaurant: true,
      customer: true,
    },
  });
  res.json(deliveryStarted);
});

app.put("/finishDelivery/:id", async (req: Request, res: Response) => {
  const deliveryFinished = await prisma.delivery.update({
    where: { id: +req.params.id },
    data: { status: req.query.status as DeliveryStatus },
    include: {
      order: true,
      restaurant: true,
      customer: true,
    },
  });
  res.json(deliveryFinished);
});

app.put("/delivery/:id", async (req: Request, res: Response) => {
  const { lat, lng } = req.body;
  const entrega = await prisma.delivery.update({
    where: { id: +req.params.id },
    data: { lat, lng },
  });
  res.json(entrega);
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
