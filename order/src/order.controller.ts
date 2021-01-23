import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { OrderService } from './services/order.service';
import { IOrder } from './interfaces/order.interface';
import { IOrderUpdateParams } from './interfaces/order-update-params.interface';
import { IOrderSearchByUserResponse } from './interfaces/order-search-by-user-response.interface';
import { IOrderDeleteResponse } from './interfaces/order-delete-response.interface';
import { IOrderCreateResponse } from './interfaces/order-create-response.interface';
import { IOrderUpdateByIdResponse } from './interfaces/order-update-by-id-response.interface';

@Controller()
export class OrderController {
  constructor(
    private readonly orderService: OrderService
  ) {}

  @MessagePattern('order_search_by_user_id')
  public async orderSearchByUserId(userId: string): Promise<IOrderSearchByUserResponse> {
    let result: IOrderSearchByUserResponse;

    if (userId) {
      const orders = await this.orderService.getOrdersByUserId(userId);
      result = {
        status: HttpStatus.OK,
        message: 'order_search_by_user_id_success',
        orders
      };
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'order_search_by_user_id_bad_request',
        orders: null
      };
    }

    return result;
  }

  @MessagePattern('order_update_by_id')
  public async orderUpdateById(
    params: {order: IOrderUpdateParams, id: string, userId: string}
  ): Promise<IOrderUpdateByIdResponse> {
    let result: IOrderUpdateByIdResponse;
    if (params.id) {
        try {
          const order = await this.orderService.findOrderById(params.id);
          if (order) {
            if (order.user_id === params.userId) {
              const updatedOrder = Object.assign(order, params.order);
              await updatedOrder.save();
              result = {
                status: HttpStatus.OK,
                message: 'order_update_by_id_success',
                order: updatedOrder,
                errors: null
              };
            } else {
              result = {
                status: HttpStatus.FORBIDDEN,
                message: 'order_update_by_id_forbidden',
                order: null,
                errors: null
              };
            }
          } else {
            result = {
              status: HttpStatus.NOT_FOUND,
              message: 'order_update_by_id_not_found',
              order: null,
              errors: null
            };
          }
        } catch (e) {
          result = {
            status: HttpStatus.PRECONDITION_FAILED,
            message: 'order_update_by_id_precondition_failed',
            order: null,
            errors: e.errors
          };
        }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'order_update_by_id_bad_request',
        order: null,
        errors: null
      };
    }

    return result;
  }

  @MessagePattern('order_create')
  public async orderCreate(orderBody: IOrder): Promise<IOrderCreateResponse> {
    let result: IOrderCreateResponse;

    if (orderBody) {
      try {
        orderBody.notification_id = null;
        orderBody.is_solved = false;
        const order = await this.orderService.createOrder(orderBody);
        result = {
          status: HttpStatus.CREATED,
          message: 'order_create_success',
          order,
          errors: null
        };
      } catch (e) {
        result = {
          status: HttpStatus.PRECONDITION_FAILED,
          message: 'order_create_precondition_failed',
          order: null,
          errors: e.errors
        };
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'order_create_bad_request',
        order: null,
        errors: null
      };
    }

    return result;
  }

  @MessagePattern('order_delete_by_id')
  public async orderDeleteForUser(params: {userId: string, id: string}): Promise<IOrderDeleteResponse> {
    let result: IOrderDeleteResponse;

    if (params && params.userId && params.id) {
      try {
        const order = await this.orderService.findOrderById(params.id);

        if (order) {
          if (order.user_id === params.userId) {
            await this.orderService.removeOrderById(params.id);
            result = {
              status: HttpStatus.OK,
              message: 'order_delete_by_id_success',
              errors: null
            };
          } else {
            result = {
              status: HttpStatus.FORBIDDEN,
              message: 'order_delete_by_id_forbidden',
              errors: null
            };
          }
        } else {
          result = {
            status: HttpStatus.NOT_FOUND,
            message: 'order_delete_by_id_not_found',
            errors: null
          };
        }
      } catch (e) {
        result = {
          status: HttpStatus.FORBIDDEN,
          message: 'order_delete_by_id_forbidden',
          errors: null
        };
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'order_delete_by_id_bad_request',
        errors: null
      };
    }

    return result;
  }

}
