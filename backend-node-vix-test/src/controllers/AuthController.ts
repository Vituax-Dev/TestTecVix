import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { genToken } from '../utils/jwt';

const prisma = new PrismaClient();

export class AuthController {
  // POST /api/v1/auth/login
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
      }

      const user = await prisma.user.findFirst({
        where: { email, isActive: true, deletedAt: null },
      });

      if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      const token = genToken({
        idUser: user.idUser,
        email: user.email,
        role: user.role,
        idBrandMaster: user.idBrandMaster,
      });

      await prisma.user.update({
        where: { idUser: user.idUser },
        data: { lastLoginDate: new Date() },
      });

      return res.json({
        token,
        user: {
          idUser: user.idUser,
          username: user.username,
          email: user.email,
          role: user.role,
          profileImgUrl: user.profileImgUrl,
          idBrandMaster: user.idBrandMaster,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ error: 'Erro ao fazer login' });
    }
  }

  // POST /api/v1/auth/register
  async register(req: Request, res: Response) {
    try {
      const { username, email, password, role, idBrandMaster } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ 
          error: 'Username, email e senha são obrigatórios' 
        });
      }

      const existingUser = await prisma.user.findFirst({
        where: { email },
      });

      if (existingUser) {
        return res.status(409).json({ error: 'Email já cadastrado' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          role: role || 'member',
          idBrandMaster: idBrandMaster || null,
        },
      });

      const token = genToken({
        idUser: user.idUser,
        email: user.email,
        role: user.role,
        idBrandMaster: user.idBrandMaster,
      });

      return res.status(201).json({
        token,
        user: {
          idUser: user.idUser,
          username: user.username,
          email: user.email,
          role: user.role,
          profileImgUrl: user.profileImgUrl,
          idBrandMaster: user.idBrandMaster,
        },
      });
    } catch (error) {
      console.error('Register error:', error);
      return res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
  }

  // GET /api/v1/auth/me
  async me(req: Request, res: Response) {
    try {
      const userId = req.user?.idUser;

      if (!userId) {
        return res.status(401).json({ error: 'Não autenticado' });
      }

      const user = await prisma.user.findUnique({
        where: { idUser: userId },
        select: {
          idUser: true,
          username: true,
          email: true,
          role: true,
          profileImgUrl: true,
          idBrandMaster: true,
          lastLoginDate: true,
          createdAt: true,
        },
      });

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      return res.json(user);
    } catch (error) {
      console.error('Me error:', error);
      return res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  }
}
