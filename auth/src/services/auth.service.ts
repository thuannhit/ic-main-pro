import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {

    constructor(
        @Inject('USER_SERVICE') private readonly userMicroServiceClient: ClientProxy,
    ) { }

}
