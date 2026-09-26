import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price TEXT,
      category TEXT,
      image_url TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);

  const { rows } = await db.execute('SELECT * FROM products ORDER BY created_at DESC');

  if (rows.length === 0) {
    const defaultProducts = [
      { name: 'Pan de Masa Madre', description: 'Fermentación 48 horas, corteza crujiente', price: 'Desde 4,50€', category: 'panes', image_url: null },
      { name: 'Croissants de Mantequilla', description: 'Laminado artesanal, textura hojaldrada', price: 'Desde 2,20€', category: 'bolleria', image_url: null },
      { name: 'Roscón de Reyes', description: 'Receta tradicional con fruta escarchada', price: 'Consultar', category: 'dulces', image_url: null },
      { name: 'Mille Feuille', description: 'Capas de hojaldre con crema pastelera', price: 'Desde 3,80€', category: 'pasteles', image_url: null },
    ];

    for (const product of defaultProducts) {
      await db.execute({
        sql: 'INSERT INTO products (name, description, price, category, image_url) VALUES (?, ?, ?, ?, ?)',
        args: [product.name, product.description, product.price, product.category, product.image_url],
      });
    }

    const { rows: newRows } = await db.execute('SELECT * FROM products ORDER BY created_at DESC');
    return Response.json(newRows);
  }

  return Response.json(rows);
}

export async function POST(req: Request) {
  const body = await req.json();

  await db.execute(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price TEXT,
      category TEXT,
      image_url TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);

  await db.execute({
    sql: 'INSERT INTO products (name, description, price, category, image_url) VALUES (?, ?, ?, ?, ?)',
    args: [body.name, body.description ?? null, body.price ?? null, body.category ?? null, body.image_url ?? null],
  });

  return Response.json({ ok: true });
}
