// Simple method that returns a random emoji from list
export function getRandomEmoji() {
  const emojiList = ['😭','😄','😌','🤓','😎','😤','🤖','😶‍🌫️','🌏','📸','💿','👋','🌊','✨'];
  return emojiList[Math.floor(Math.random() * emojiList.length)];
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

import { dirname } from 'path';
import { fileURLToPath } from 'url';
export function getActualDirectory(){
  return dirname(fileURLToPath(import.meta.url))
}

import { readdir } from 'fs/promises';
export async function readDirectory(path) {
  try {
    const files = await readdir(path);
    console.log(files);
    return files
  } catch (err) {
    console.error(err);
  }
}

