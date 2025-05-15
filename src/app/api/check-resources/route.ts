import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const required = {
      patterns: checkExists('public/patterns/herbal-pattern.png'),
      images: {
        treatments: checkDirectoryImages('public/images/treatments'),
        logo: checkExists('public/logo.png')
      },
      translations: {
        en: checkExists('src/lib/treatments/en.json'),
        hi: checkExists('src/lib/treatments/hi.json'),
        gu: checkExists('src/lib/treatments/gu.json')
      }
    };

    return NextResponse.json({
      status: 'success',
      resources: required
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

function checkExists(relativePath: string): boolean {
  const fullPath = path.join(process.cwd(), relativePath);
  return fs.existsSync(fullPath);
}

function checkDirectoryImages(relativePath: string): string[] {
  const fullPath = path.join(process.cwd(), relativePath);
  if (!fs.existsSync(fullPath)) {
    return [];
  }
  
  return fs.readdirSync(fullPath).filter(file => 
    file.endsWith('.jpg') || file.endsWith('.png')
  );
} 