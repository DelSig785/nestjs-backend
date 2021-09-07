import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { UsersService } from "./users.service";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async signup(email: string, password: string) {
        // ANCHOR See if email is in use
        const users = await this.usersService.find(email);
        if (users.length) {
            throw new BadRequestException('Email is in use');
        }
        // ANCHOR Hash the users password
        // ANCHOR Generate a salt
        const salt = randomBytes(8).toString('hex');
    
        // ANCHOR Hash the salt result and salt together
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        // ANCHOR Join the hashed result and the salt together
        const result = salt + '.' + hash.toString('hex');

        // ANCHOR Create a new user and save it
        const user = await this.usersService.create(email, result);

        return user;
    }

    async signin(email: string, password: string) {
        // ANCHOR Find user email and check
        const [user] = await this.usersService.find(email);
        if (!user) {
            throw new NotFoundException('User not found')
        }
        // ANCHOR Split the salt and hash pas by dot
        const [salt, storeHash] = user.password.split('.');

        const hash = await scrypt(password, salt, 32) as Buffer;
        
        // ANCHOR Comparise the hash and stored hash
        if (storeHash !== hash.toString('hex')) {
            throw new BadRequestException('Bad request');
        }
        return user;
    }
}