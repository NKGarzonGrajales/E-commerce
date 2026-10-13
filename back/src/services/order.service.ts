import { AppDataSource } from "../config/dataSource";
import { CreateOrderDto } from "../dtos/createOrderDto";
import { Order, OrderStatus } from "../entities/Order";
import { OrderItem } from "../entities/OrderItem";
import { Product } from "../entities/Product";
import { User } from "../entities/User";

export const createOrderService = async (
  createOrderDto: CreateOrderDto,
  userId: number
): Promise<Order> => {
  return await AppDataSource.transaction(async (manager) => {
    const user = await manager.findOneBy(User, { id: userId });

    if (!user) {
      throw new Error("User not found");
    }

    const orderItems: OrderItem[] = [];

    for (const id of createOrderDto.products) {
      const product = await manager
        .getRepository(Product)
        .createQueryBuilder("product")
        .setLock("pessimistic_write")
        .where("product.id = :id", { id })
        .getOne();

      if (!product) {
        throw new Error("Product not found");
      }

      if (product.stock < 1) {
        throw new Error(`Insufficient stock for product ${id}`);
      }

      product.stock -= 1;
      await manager.save(product);

      const item = manager.create(OrderItem, {
        product,
        quantity: 1,
        unitPrice: product.price,
      });

      orderItems.push(item);
    }

    const order = manager.create(Order, {
      status: OrderStatus.PENDING,
      date: new Date(),
      user,
      items: orderItems,
    });

    return await manager.save(Order, order);
  });
};