import { toPng } from 'html-to-image';

export async function generateJobImage(elementId: string, jobTitle: string): Promise<void> {
  const element = document.getElementById(elementId);
  
  if (!element) {
    throw new Error('Canvas element not found');
  }

  try {
    const dataUrl = await toPng(element, {
      quality: 1,
      pixelRatio: 2,
      width: 1080,
      height: 1080,
      cacheBust: true,
    });

    const link = document.createElement('a');
    const date = new Date().toISOString().split('T')[0];
    const sanitizedTitle = jobTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    
    link.download = `quest-medical-hiring-${sanitizedTitle || 'vacancy'}-${date}.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Error generating image:', error);
    throw new Error('Failed to generate image. Please try again.');
  }
}
