import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { authUser } from '../auth/authUser';
import { authRole } from '../auth/authRole';

const router = Router();
const authController = new AuthController();

// Rotas públicas
router.post('/login', (req, res) => authController.login(req, res));
router.post('/register', (req, res) => authController.register(req, res));

// Rotas protegidas
router.get('/me', authUser, (req, res) => authController.me(req, res));

// Rotas de teste de permissões
router.get('/admin-only', authUser, authRole('admin'), (req, res) => {
  res.json({ message: 'Acesso exclusivo para ADMIN', user: req.user });
});

router.get('/manager-or-admin', authUser, authRole('admin', 'manager'), (req, res) => {
  res.json({ message: 'Acesso para ADMIN e MANAGER', user: req.user });
});

router.get('/all-roles', authUser, authRole('admin', 'manager', 'member'), (req, res) => {
  res.json({ message: 'Acesso para todos os usuários autenticados', user: req.user });
});

export default router;
