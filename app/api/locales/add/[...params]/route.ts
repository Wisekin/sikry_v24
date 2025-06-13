import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(
  request: Request,
  { params: { params } }: { params: { params: [string, string] } }
) {
  try {
    const [lng, ns] = params;
    const body = await request.json();
    
    // Validate the request
    if (!lng || !ns || !body) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Define the path to the translation file
    const filePath = path.join(
      process.cwd(),
      'public',
      'locales',
      lng,
      `${ns}.json`
    );

    let translations = {};
    
    try {
      // Try to read the existing translations
      const fileContent = await fs.readFile(filePath, 'utf8');
      translations = JSON.parse(fileContent);
    } catch (error: any) {
      // File doesn't exist yet, which is fine
      if (error.code !== 'ENOENT') {
        console.error('Error reading translation file:', error);
        return NextResponse.json(
          { error: 'Error reading translation file' },
          { status: 500 }
        );
      }
    }

    // Merge the new translations with existing ones
    const updatedTranslations = { ...translations, ...body };

    // Ensure the directory exists
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    
    // Write the updated translations back to the file
    await fs.writeFile(
      filePath,
      JSON.stringify(updatedTranslations, null, 2),
      'utf8'
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error in translation API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
