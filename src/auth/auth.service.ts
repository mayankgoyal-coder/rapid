import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        try {
            const { username, mobile, email, password } = authCredentialsDto;

            //hashing password

            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            //  console.log(hashedPassword);
            // console.log(salt);
               let user = this.usersRepository.create({
                username,
                mobile,
                email,
                password: hashedPassword
            })
            user = await this.usersRepository.save(user)
            return user
        } catch (error) {
            // console.log(error.code)
            if (error.code === "23505") {
                throw new ConflictException('Duplicacy error')
            } else {
                throw new InternalServerErrorException
            }
        }
    }

    async signIn(
        authCredentialsDto: AuthCredentialsDto,
    ): Promise<{accessToken:string}> {
        const { username, password } = authCredentialsDto;
        const user = await this.usersRepository.findOne({ where: { username } });

        if (user && (await bcrypt.compare(password, user.password))) {
              const payload: JwtPayload = { username };
              const accessToken: string = await this.jwtService.sign(payload);
              return  {accessToken};
        } else {
            throw new UnauthorizedException('Please check your login credentials');
        }
    }
}
