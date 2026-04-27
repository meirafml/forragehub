import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Rota de status
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Conexão Forragem Serverless API is running' });
});

// ==========================================
// DEMANDAS (Pecuaristas)
// ==========================================

// Criar nova demanda
app.post('/api/demandas', async (req, res) => {
  try {
    const demanda = await prisma.demanda.create({
      data: req.body
    });
    res.status(201).json(demanda);
  } catch (error) {
    console.error("Erro ao criar demanda:", error);
    res.status(500).json({ error: 'Erro ao criar demanda' });
  }
});

// Listar demandas (Oportunidades)
app.get('/api/demandas', async (req, res) => {
  try {
    const demandas = await prisma.demanda.findMany({
      where: { status: 'ABERTA' },
      orderBy: { createdAt: 'desc' }
    });
    res.json(demandas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar demandas' });
  }
});

// ==========================================
// PRESTADORES
// ==========================================

// Criar prestador
app.post('/api/prestadores', async (req, res) => {
  try {
    const { maquinas, ...prestadorData } = req.body;
    
    const prestador = await prisma.prestador.create({
      data: {
        ...prestadorData,
        maquinas: {
          create: maquinas || []
        }
      },
      include: {
        maquinas: true
      }
    });
    res.status(201).json(prestador);
  } catch (error) {
    console.error("Erro ao criar prestador:", error);
    res.status(500).json({ error: 'Erro ao criar prestador' });
  }
});

// ==========================================
// LEADS (Pré-cadastro)
// ==========================================
app.post('/api/leads', async (req, res) => {
  try {
    const lead = await prisma.lead.create({
      data: req.body
    });
    res.status(201).json(lead);
  } catch (error) {
    console.error("Erro ao criar lead:", error);
    res.status(500).json({ error: 'Erro ao criar lead' });
  }
});

export default app;
