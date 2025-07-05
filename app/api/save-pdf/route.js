import { writeFile, mkdir, readFile, writeFileSync } from 'fs/promises';
import path from 'path';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const fileName = `work_${Date.now()}.pdf`;

    const buffer = Buffer.from(await file.arrayBuffer());

    const dir = path.join(process.cwd(), 'public', 'pdfs');
    await mkdir(dir, { recursive: true });

    // Save PDF file
    const filePath = path.join(dir, fileName);
    await writeFile(filePath, buffer);

    // Update index.json
    const indexPath = path.join(dir, 'index.json');
    let data = [];
    try {
      const existing = await readFile(indexPath, 'utf8');
      data = JSON.parse(existing);
    } catch (e) {}

    data.push({ name: fileName, createdAt: new Date().toISOString() });
    await writeFile(indexPath, JSON.stringify(data, null, 2));

    return new Response(JSON.stringify({ success: true, fileName }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}
